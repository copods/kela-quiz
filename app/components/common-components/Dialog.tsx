import { Fragment } from "react"

import { Dialog, Transition } from "@headlessui/react"
import { Icon } from "@iconify/react"

import type {
  DialogNewWrapperProps,
  DialogWrapperProps,
} from "~/interface/Interface"

export const DialogHeader = ({
  heading,
  onClose,
}: {
  heading?: string
  onClose?: (e: boolean) => void
  role?: string
  ariaLabel?: string
  tabIndex?: number
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-5 py-4">
        {/* dialog wrapper heading */}
        {heading ? (
          <h2
            className="text-lg font-semibold text-gray-700"
            data-cy="dialog-header"
            title={heading}
            role={heading}
            tabIndex={0}
          >
            {heading}
          </h2>
        ) : null}
        {/* dialog wrapper close icon for close the dialog */}
        {onClose ? (
          <Icon
            tabIndex={0}
            id="dialog-close-icon"
            className="cursor-pointer text-2xl text-gray-600"
            icon={"carbon:close"}
            onKeyUp={(e) => {
              if (e.key === "Enter") onClose(false)
            }}
            onClick={() => onClose(false)}
          />
        ) : null}
      </div>
      <hr className="h-px w-full border-0 bg-gray-200" />
    </>
  )
}

export const DialogContent = ({ children }: { children: JSX.Element }) => {
  return <div className="p-5">{children}</div>
}

export const DialogFooter = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <hr className="h-px w-full border-0 bg-gray-200" />
      <div className="px-5 py-4">{children}</div>
    </>
  )
}

export const DialogWrapperNew = ({
  open,
  setOpen,
  children,
}: DialogNewWrapperProps) => {
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
          className="fixed inset-0 z-10 flex min-h-full items-end justify-center overflow-y-auto text-center sm:items-center sm:p-0"
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
            <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

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
