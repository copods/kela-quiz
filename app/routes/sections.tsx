import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from "@remix-run/react";
import { createSection, getAllSections } from "~/models/sections.server";
import { useState } from "react";
import { Icon } from "@iconify/react"
import { getUserId, requireUserId } from "~/session.server";
import Sections from "~/components/sections/Sections";
import AdminLayout from "~/components/layouts/AdminLayout";
import SectionsPage from "~/components/sections/SectionsPage";

type ActionData = {
  errors?: {
    title?: string
    body?: string
  }
}

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  // users: Awaited<ReturnType<typeof getAllUsers>>
  selectedSectionId: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const sections = await getAllSections()
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const selectedSectionId = params.sectionId ? params.sectionId?.toString() : 'NA'
  // return redirect(`/sections/${sections[0].id}`)
  return json<LoaderData>({ sections, selectedSectionId })
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)

  const formData = await request.formData()
  const name = formData.get('name')

  if (typeof name !== 'string' || name.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Title is required' } },
      { status: 400 }
    )
  }

  const section = await createSection({ name, userId })

  return redirect(`/sections/${section.id}`)
  // return null
}


export default function Section() {
  const data = useLoaderData() as LoaderData
  // redirect(`/sections/${data.sections[0].id}`)

  const [sectionDetailFull, setSectionDetailFull] = useState(false)


  const getparentClassName = () => {
    var className = "flex overflow-hidden flex-1 "
    if (!sectionDetailFull) {
      className += 'gap-12 '
    }
    return className
  }
  const getSectionDetailClassName = () => {
    var className = "flex-1 flex items-center z-10 "
    if (sectionDetailFull) {
      className += 'min-w-full'
    }
    return className
  }


  return (
    <AdminLayout>
      <SectionsPage>
        <div className={getparentClassName()}>
          {/* section list */}
          <Sections data={data} />

          {/* section details */}
          <div className={getSectionDetailClassName()}>
            <span className="z-20 -mr-5">
              {
                sectionDetailFull
                  ?
                  <Icon icon={'akar-icons:circle-chevron-right-fill'} className="cursor-pointer text-primary text-4xl" onClick={() => setSectionDetailFull(!sectionDetailFull)} />
                  :
                  <Icon icon={'akar-icons:circle-chevron-left-fill'} className="cursor-pointer text-primary text-4xl" onClick={() => setSectionDetailFull(!sectionDetailFull)} />
              }
            </span>
            <Outlet />
          </div>
        </div>
      </SectionsPage>
    </AdminLayout>
  )
}