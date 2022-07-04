import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import { createSection, getAllSections } from '~/models/sections.server'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import AdminLayout from '~/components/layouts/AdminLayout'
import AddSection from '~/components/sections/AddSection'
import { useNavigate } from 'react-router-dom'

type ActionData = {
  errors?: {
    title?: string
    body?: string
  }
}

export type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId: string,
  filters: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url).searchParams.entries()
  const obj = Object.fromEntries(url).filter
  const sections = await getAllSections(obj)
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const selectedSectionId = params.sectionId
    ? params.sectionId?.toString()
    : 'NA'
  console.log(request)
  const filters = new URL(request.url).search
  return json<LoaderData>({ sections, selectedSectionId, filters })
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
  return redirect(`/sections/${section.id}`)
  // return null
}

export default function Section() {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher();

  let navigate = useNavigate()
  useEffect(() => {
    if (data.selectedSectionId === 'NA') {
      navigate(`/sections/${data.sections[0].id}`, { replace: true })
    }
  }, [data, navigate])



  const submit = useSubmit()

  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [addSectionModal, setAddSectionModalValue] = useState(false)
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

  const [sortBy, setSortBy] = useState(sortByDetails[1])

  useEffect(() => {
    const formData = new FormData()
    var filter = {
      orderBy: {
        [sortBy.id]: order,
      },
    }
    fetcher.submit({ filter: JSON.stringify(filter) }, { method: "get" });
    formData.append('filter', JSON.stringify(filter))
    submit(formData, { method: 'get', action: `/sections/${data.sections[0].id}` })
  }, [order, sortBy])

  return (
    <AdminLayout>
      <div className="flex h-full flex-col gap-12 overflow-hidden">
        {/* header */}
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Sections</h2>
          <button
            className="h-9 rounded-lg bg-primary px-5 text-xs text-[#F0FDF4]"
            id="add-section"
            onClick={() => setAddSectionModalValue(!addSectionModal)}
          >
            + Add Section
          </button>
        </header>

        <div
          className={`flex flex-1 overflow-hidden ${sectionDetailFull ? '' : 'gap-12'
            }`}
        >
          {/* section list */}
          <Sections
            sections={data.sections}
            selectedSectionId={
              data.selectedSectionId != 'NA'
                ? data.selectedSectionId
                : data.sections[0].id
            }
            filters={data.filters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            sortByDetails={sortByDetails}
          />

          {/* section details */}
          <div
            className={`z-10 flex flex-1 items-center ${sectionDetailFull ? 'min-w-full' : ''
              }`}
          >
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
          addSectionModalOpen={addSectionModal}
          setAddSectionModalOpen={setAddSectionModalValue}
        />
      </div>
    </AdminLayout>
  )
}
