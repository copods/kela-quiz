import { Form } from '@remix-run/react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import type { ActionData } from '~/routes/sections'

const AddSection = ({
  open,
  setOpen,
  action,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  action: ActionData
}) => {
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
                <div className="flex items-center justify-between pt-1">
                  <h2 className="text-2xl font-bold text-gray-700">
                    Add Section
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
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder="Enter Section Name"
                  />
                  {/* {action.errors?.title ? (
                    <span>{action.errors?.title}</span>
                  ) : null} */}
                </div>
                <div className="pb-6">
                  <textarea
                    name="description"
                    rows={4}
                    cols={50}
                    className="h-24 w-full rounded-lg border border-gray-200 py-2 px-3 text-base"
                    placeholder="Enter Section Description"
                  />
                  {action.errors?.body ? (
                    <span>{action.errors?.body}</span>
                  ) : null}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-md px-4 text-sm text-gray-500"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-9 rounded-md bg-primary px-4 text-sm text-[#F0FDF4] disabled:opacity-80 "
                    onClick={() => {
                      // if (!action.errors?.title && !action.errors?.body) {
                      //   console.log(action.errors)
                      setOpen(false)
                      // }
                    }}
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
  )
}
export default AddSection
