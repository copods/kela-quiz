import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { createSection, getAllSections } from '~/models/sections.server'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import AdminLayout from '~/components/layouts/AdminLayout'
import AddSection from '~/components/sections/AddSection'

type ActionData = {
  errors?: {
    title?: string
    body?: string
  }
}

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const sections = await getAllSections({})
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const selectedSectionId = params.sectionId
    ? params.sectionId?.toString()
    : 'NA'
  return json<LoaderData>({ sections, selectedSectionId })
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

  await createSection({ name, description, createdById })

  return null
}

export default function Section() {
  const data = useLoaderData() as unknown as LoaderData

  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [open, setOpen] = useState(false)

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
          <Sections data={data} />

          {/* section details */}
          <div
            className={`z-10 flex flex-1 items-center ${
              sectionDetailFull ? 'min-w-full' : ''
            }`}
          >
            <span className="z-20 -mr-5">
              {sectionDetailFull ? (
                <Icon
                  icon={'akar-icons:circle-chevron-right-fill'}
                  className="cursor-pointer text-4xl text-primary"
                  onClick={() => setSectionDetailFull(!sectionDetailFull)}
                />
              ) : (
                <Icon
                  icon={'akar-icons:circle-chevron-left-fill'}
                  className="cursor-pointer text-4xl text-primary"
                  onClick={() => setSectionDetailFull(!sectionDetailFull)}
                />
              )}
            </span>
            <Outlet />
          </div>
        </div>

        <AddSection open={open} setOpen={setOpen} />
      </div>
    </AdminLayout>
  )
}
