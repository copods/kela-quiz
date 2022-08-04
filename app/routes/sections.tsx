import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import {
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { createSection, getAllSections } from '~/models/sections.server'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import AdminLayout from '~/components/layouts/AdminLayout'
import AddSection from '~/components/sections/AddSection'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { Section } from '~/interface/Interface'

export type ActionData = {
  errors?: {
    title?: string
    body?: string
    status: number
  }
  resp?: {
    title?: string
    status: number
    data?: Section
  }
}

export type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId?: string
  filters: string
  status: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url).searchParams.entries()
  const obj = Object.fromEntries(url).filter
  var sections: Array<Section> = []
  var status: string = ''
  await getAllSections(obj)
    .then((res) => {
      sections = res
      status = 'Success'
    })
    .catch((err) => {
      status = err
    })
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const selectedSectionId = params.sectionId
    ? params.sectionId?.toString()
    : undefined
  const filters = new URL(request.url).search
  return json<LoaderData>({ sections, selectedSectionId, filters, status })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const name = formData.get('name')
  const description = formData.get('description')

  if (typeof name !== 'string' || name.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Name is required', status: 400 } },
      { status: 400 }
    )
  }
  if (typeof description !== 'string' || description.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Description is required', status: 400 } },
      { status: 400 }
    )
  }

  const section = await createSection({ name, description, createdById })
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: 'Member Added Successfully..!',
            status: 200,
            data: res,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = 'Something went wrong..!'
      if (err.code === 'P2002') {
        title = 'Duplicate Title'
      }
      return json<ActionData>(
        { errors: { title, status: 400 } },
        { status: 400 }
      )
    })
  return section
}

export default function SectionPage() {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher()
  const action = useActionData() as ActionData
  let navigate = useNavigate()
  const submit = useSubmit()
  const sortByDetails = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Created Date',
      value: 'createdAt',
    },
  ]

  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState('asc')
  const [sortBy, setSortBy] = useState(sortByDetails[1].value)
  const [selectedSection, setSelectedSection] = useState(
    data.selectedSectionId || data.sections[0].id || 'NA'
  )
  const toastId = 'toastId'

  if (data.status != 'Success') {
    toast.error('Something went wrong..!')
  }

  useEffect(() => {
    if (data.sections.length && !data.selectedSectionId) {
      navigate(`/sections/${selectedSection}${data?.filters}`, {
        replace: true,
      })
    }
  }, [data.sections, data.selectedSectionId, navigate])

  useEffect(() => {
    if (data.sections.length > 0) {
      const formData = new FormData()
      var filter = {
        orderBy: {
          [sortBy]: order,
        },
      }
      fetcher.submit({ filter: JSON.stringify(filter) }, { method: 'get' })
      formData.append('filter', JSON.stringify(filter))
      submit(formData, {
        method: 'get',
        action: `/sections/${selectedSection}`,
      })
    }
  }, [order, sortBy])

  useEffect(() => {
    if (action) {
      if (action.resp?.status === 200) {
        setOpen(false)
        toast.success('Section added successfully..!')
        navigate(`/sections/${action?.resp?.data?.id}`, { replace: false })
      } else if (action.errors?.status === 400) {
        toast.error(action.errors?.title, {
          toastId,
        })
      }
    }
  }, [action])

  return (
    <AdminLayout>
      <div className="flex h-full flex-col gap-12 overflow-hidden">
        {/* header */}
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Sections</h2>
          <button
            className="h-9 rounded-lg bg-primary px-5 text-xs text-[#F0FDF4]"
            id="add-section"
            onClick={() => setOpen(!open)}
          >
            + Add Section
          </button>
        </header>

        <div
          className={`flex flex-1 overflow-hidden ${
            sectionDetailFull ? '' : 'gap-12'
          }`}
        >
          {/* section list */}
          <div className={`${sectionDetailFull ? 'hidden' : ''}`}>
            <Sections
              sections={data.sections}
              selectedSection={selectedSection}
              filters={data.filters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
              setSelectedSection={setSelectedSection}
              sortByDetails={sortByDetails}
            />
          </div>

          {/* section details */}
          <div className={`z-10 flex flex-1 items-center `}>
            <span
              className="z-20 -mr-5"
              tabIndex={0}
              onClick={() => setSectionDetailFull(!sectionDetailFull)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') setSectionDetailFull(!sectionDetailFull)
              }}
            >
              {sectionDetailFull ? (
                <Icon
                  icon={'akar-icons:circle-chevron-right-fill'}
                  className="cursor-pointer text-4xl text-primary"
                />
              ) : (
                <Icon
                  icon={'akar-icons:circle-chevron-left-fill'}
                  className="cursor-pointer text-4xl text-primary"
                />
              )}
            </span>
            <Outlet />
          </div>
        </div>
        <AddSection
          open={open}
          setOpen={setOpen}
          showErrorMessage={action?.errors?.status === 400}
        />
      </div>
    </AdminLayout>
  )
}
