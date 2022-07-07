import { Form } from "@remix-run/react";
import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from "@iconify/react"

const AddSection = ({ open, setOpen }: { open: boolean, setOpen: (e: boolean) => void }) => {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                  <Icon className="text-2xl text-gray-600 cursor-pointer" icon={'carbon:close'} onClick={() => setOpen(false)} />
                </div>
                <hr className="mt-4 mb-6 border-0 h-px bg-gray-300 w-full" />
                <div className="pb-6">
                  <input type="text" name="name" className="w-full h-11 rounded-lg border border-gray-200 text-base px-3" placeholder="Enter Section Name" />
                </div>
                <div className="pb-6">
                  <input type="text" name="description" className="w-full h-11 rounded-lg border border-gray-200 text-base px-3" placeholder="Enter Section Description" />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="px-4 h-9 rounded-md text-sm text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-md text-sm text-[#F0FDF4] bg-primary"
                    onClick={() => setOpen(false)}
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