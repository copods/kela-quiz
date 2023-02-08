import { Dialog, Transition } from "@headlessui/react"
import { Icon } from "@iconify/react"

import { Fragment } from "react"
import type { DialogWrapperProps } from "~/interface/Interface"

const DialogWrapper = ({
  open,
  setOpen,
  children,
  heading,
  header,
  ...props
}: DialogWrapperProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
        <div
          className="fixed inset-0 z-10 flex min-h-full items-end justify-center overflow-y-auto p-4 text-center sm:items-center sm:p-0"
          id="dialog-wrapper"
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
            <Dialog.Panel className="relative transform rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {header && (
                <div>
                  <div className="flex items-center justify-between pt-1">
                    {/* dialog wrapper heading */}
                    <h2
                      className="text-2xl font-bold text-gray-700"
                      data-cy="dialog-header"
                      title={heading}
                      {...props}
                    >
                      {heading}
                    </h2>
                    {/* dialog wrapper close icon for close the dialog */}
                    <Icon
                      tabIndex={0}
                      id="dialog-close-icon"
                      className="cursor-pointer text-2xl text-gray-600"
                      icon={"carbon:close"}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") setOpen(false)
                      }}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />
                </div>
              )}

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default DialogWrapper
