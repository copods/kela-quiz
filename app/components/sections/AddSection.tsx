import { Form, useTransition } from '@remix-run/react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import type { ActionData } from '~/routes/sections'
import { sectionsFolder } from '~/constants/common.constants'
const AddSection = ({
  open,
  setOpen,
  showErrorMessage,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  showErrorMessage: ActionData
}) => {
  const transition = useTransition()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        id="modal-dialogue"
      >
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <Form
            method="post"
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="addSectionDilog flex items-center justify-between pt-1">
                  <h2 className="text-2xl font-bold text-gray-700">
                    {sectionsFolder.addSection}
                  </h2>
                  <Icon
                    className="cursor-pointer text-2xl text-gray-600"
                    icon={'carbon:close'}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />
                <div className="pb-6">
                  <input
                    type="text"
                    name="name"
                    id="sectionName"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder="Enter Section Name"
                  />
                </div>
                <div className="pb-6">
                  <textarea
                    name="description"
                    id="sectionDescription"
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-3 py-4 text-base"
                    placeholder="Enter Section Description"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-md px-4 text-sm text-gray-500"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    {sectionsFolder.cancelAddingSection}
                  </button>
                  <button
                    type="submit"
                    id="submitButton"
                    className={`h-9 rounded-md bg-primary px-4 text-sm text-[#F0FDF4] disabled:opacity-80  ${
                      transition.state === 'submitting' ? 'disabled' : ''
                    }`}
                    onClick={() => {
                      setOpen(false)
                    }}
                    disabled={transition.state === 'submitting'}
                  >
                    {transition.state === 'submitting' ? 'Adding...' : 'Add'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Form>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default AddSection
