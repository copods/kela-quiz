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
import type { Section } from '@prisma/client'

export type ActionData = {
  errors?: {
    title?: string
    body?: string
  }
}

export type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId: string
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
    : 'NA'
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
      { errors: { title: 'Name is required' } },
      { status: 400 }
    )
  }
  if (typeof description !== 'string' || description.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Description is required' } },
      { status: 400 }
    )
  }
  const section = await createSection({ name, description, createdById })
  return redirect(`/sections/${section.id}${new URL(request.url).search}`)
}

export default function SectionPage() {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher()
  const action = useActionData as ActionData

  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [open, setOpen] = useState(false)

  if (action.errors?.title) {
    toast.error('Something went wrong..!')
  }

  let navigate = useNavigate()
  if (data.status != 'Success') {
    toast.error('Something went wrong..!')
  }

  const submit = useSubmit()

  const [order, setOrder] = useState('asc')
  const sortByDetails = [
    {
      name: 'Name',
      id: 'name',
    },
    {
      name: 'Created Date',
      id: 'createdAt',
    },
  ]
  useEffect(() => {
    if (data.sections.length && data.selectedSectionId === 'NA') {
      navigate(`/sections/${data.sections[0].id}`, { replace: true })
    }
  }, [data, navigate])

  const [sortBy, setSortBy] = useState(sortByDetails[1].id)
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

  const [selectedSection, setSelectedSection] = useState(
    data.selectedSectionId != 'NA'
      ? data.selectedSectionId
      : data.sections[0]?.id
      ? data.sections[0].id
      : 'NA'
  )
  return (
    <AdminLayout>
      <div className="flex h-full flex-col gap-12 overflow-hidden">
        {/* header */}
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Sections</h2>
          <button
            tabIndex={0}
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

        <AddSection showErrorMessage={action} open={open} setOpen={setOpen} />
      </div>
    </AdminLayout>
  )
}
