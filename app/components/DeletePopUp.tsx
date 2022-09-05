import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Form } from '@remix-run/react'
import { commonConstants, deletePopUp } from '~/constants/common.constants'
import { statusCheck } from '~/constants/common.constants'
import Button from './form/Button'
export default function DeletePopUp({
  setOpen,
  open,
  onDelete,
  status,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  onDelete: () => void
  status?: string | undefined
}) {

  const handleDelete = () => {
    onDelete()
    if (status === statusCheck.success) {
      setOpen(false)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
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
                        {deletePopUp.alert}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 gap-2 sm:flex sm:flex-row-reverse sm:px-6">
                  <Form method="post">
                    <Button 
                      tabIndex={0}
                      id='confirm-delete'
                      varient='secondary-solid'
                      type='button' 
                      name='delete' 
                      className='px-5'
                      buttonText={commonConstants.delete} 
                      onClick={handleDelete} />
                  </Form>
                  <Button 
                    tabIndex={0}
                    type='button' 
                    id="cancel-delete-pop-up"
                    varient='primary-outlined'
                    className='px-5'
                    onClick={() => setOpen(false)}
                    buttonText={commonConstants.cancel} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
