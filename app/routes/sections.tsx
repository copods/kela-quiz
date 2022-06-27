import { ActionFunction, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { json } from '@remix-run/node'
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { createSection, getAllSections } from "~/models/sections.server";
import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from "@iconify/react"
import { getUserId, requireUserId } from "~/session.server";
import Sections from "~/components/sections/Sections";
import AdminLayout from "~/components/layouts/AdminLayout";

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

  await createSection({ name, userId })

  // return redirect(`/admin/sections/${section.id}`)
  return null
}


export default function Section() {
  const data = useLoaderData() as LoaderData
  // redirect(`/admin/sections/${data.sections[0].id}`)

  const [addSectionModal, setAddSectionModalValue] = useState(false)
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
      <div className="flex flex-col gap-12 h-full overflow-hidden">
        {/* header */}
        <header className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black">Sections</h2>
          <button className="px-5 h-9 text-[#F0FDF4] bg-copods rounded-lg text-xs" onClick={() => setAddSectionModalValue(!addSectionModal)}>+ Add Section</button>
        </header>

        <div className={getparentClassName()}>
          {/* section list */}
          <Sections data={data} />

          {/* section details */}
          <div className={getSectionDetailClassName()}>
            <span className="z-20 -mr-5">
              {
                sectionDetailFull
                  ?
                  <Icon icon={'akar-icons:circle-chevron-right-fill'} className="cursor-pointer text-copods text-4xl" onClick={() => setSectionDetailFull(!sectionDetailFull)} />
                  :
                  <Icon icon={'akar-icons:circle-chevron-left-fill'} className="cursor-pointer text-copods text-4xl" onClick={() => setSectionDetailFull(!sectionDetailFull)} />
              }
            </span>
            <Outlet />
          </div>
        </div>

        <Transition.Root show={addSectionModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setAddSectionModalValue}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <Form method="post" className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-2xl text-left p-6 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="flex justify-between items-center pt-1">
                      <h2 className="text-2xl font-bold text-gray-700">Add Section</h2>
                      <Icon className="text-2xl text-gray-600 cursor-pointer" icon={'carbon:close'} onClick={() => setAddSectionModalValue(false)} />
                    </div>
                    <hr className="mt-4 mb-6 border-0 h-px bg-gray-300 w-full" />
                    <div className="pb-6">
                      <input type="text" name="name" className="w-full h-11 rounded-lg border border-gray-200 text-base px-3" placeholder="Enter Section Name" />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        className="px-4 h-9 rounded-md text-sm text-gray-500"
                        onClick={() => setAddSectionModalValue(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 h-9 rounded-md text-sm text-[#F0FDF4] bg-copods"
                        onClick={() => setAddSectionModalValue(false)}
                      >
                        Add
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </Form>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </AdminLayout>
  )
}