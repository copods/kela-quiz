import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Form } from '@remix-run/react'
import { commonConstants, deletePopUp } from '~/constants/common.constants'
import Button from './form/Button'
import { clearInterval } from 'timers'
export default function DeletePopUp({
  setOpen,
  open,
  onDelete,
  subAlert,
  setDeleted,
  status,
  deleteItemType,
  deleteItem,
}: {
  open: boolean
  setOpen?: (e: boolean) => void | undefined
  onDelete: () => void
  subAlert?: string
  setDeleted?: (e: boolean) => void
  status?: string | undefined
  deleteItemType: string
  deleteItem: string
}) {
  const handleDelete = () => {
    onDelete()
    if (setOpen !== undefined) setOpen(false)
  }
  useEffect(() => {
    if (open === true) {
      let interval = setInterval(() => {
        if (document.getElementById('confirm-delete')) {
          document.getElementById('confirm-delete')?.focus()
          clearInterval(interval)
        }
      }, 100)
    }
  }, [open])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (setOpen !== undefined) setOpen(false)
        }}
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div
                  id="delete-dialog"
                  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                >
                  <div className="sm:flex sm:items-center ">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Icon
                        icon="ic:outline-delete-outline"
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <p className="text-sm text-gray-500">
                        {deletePopUp.alert} {deleteItemType} '{deleteItem}'
                        {subAlert}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Form method="post">
                    <Button
                      tabIndex={0}
                      id="confirm-delete"
                      varient="secondary-solid"
                      type="button"
                      name="delete"
                      className="px-5"
                      title={commonConstants.delete}
                      buttonText={commonConstants.delete}
                      onClick={() => {
                        handleDelete()
                        if (setDeleted !== undefined) {
                          setDeleted(true)
                        }
                      }}
                    />
                  </Form>
                  <Button
                    tabIndex={0}
                    type="button"
                    id="cancel-delete-pop-up"
                    varient="primary-outlined"
                    className="px-5"
                    onClick={() => {
                      if (setOpen !== undefined) setOpen(false)
                    }}
                    title={commonConstants.cancel}
                    buttonText={commonConstants.cancel}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
