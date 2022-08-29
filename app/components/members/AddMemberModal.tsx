import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import type { Role } from '~/interface/Interface'
import { Form, useTransition } from '@remix-run/react'
import { Fragment } from 'react'
import { commonConstants, members } from '~/constants/common.constants'
import Button from '../form/Button'
export default function AddMemberModal({
  roles,
  open,
  setOpen,
}: {
  roles: Role[]
  open: boolean
  setOpen: (e: boolean) => void
}) {
  const transition = useTransition()
  return (
    <div>
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

          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            id="AddPopUpModel"
          >
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
                      {members.addMember}
                    </h2>
                    <Icon
                      tabIndex={0}
                      className="cursor-pointer text-2xl text-gray-600"
                      icon={'carbon:close'}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />
                  <div className="flex justify-between gap-4 pb-6">
                    <div>
                      <label htmlFor="" className="text-gray-800">
                        {members.firstName}
                      </label>
                      <input
                        tabIndex={0}
                        id="firstName"
                        type="text"
                        name="firstName"
                        className=" my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-gray-800">
                        {members.lastName}
                      </label>
                      <input
                        tabIndex={0}
                        id="lastName"
                        type="text"
                        name="lastName"
                        className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="pb-6 ">
                    <label htmlFor="" className="text-gray-800">
                      {members.email}
                    </label>
                    <input
                      tabIndex={0}
                      id="email"
                      type="email"
                      name="email"
                      className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                      placeholder="email@address.com"
                    />
                  </div>
                  <div className="pb-6">
                    <div>
                      <label htmlFor="" className="text-gray-800">
                        {members.role}
                      </label>
                    </div>
                    <div className="my-1.5 rounded-lg border border-gray-200 px-4">
                      <select
                        tabIndex={0}
                        name="roleId"
                        className="test-base h-11 w-full focus:outline-none"
                      >
                        {roles.map((role) => {
                          return (
                            <option tabIndex={0} key={role.id} value={role?.id}>
                              {role?.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      tabIndex={0}
                      id='cancel-add-button'
                      type='button'
                      className='h-9 px-4'
                      onClick={() => setOpen(false)}
                      varient='primary-outlined'
                      buttonText={commonConstants.cancel} />
                    <Button  
                      tabIndex={0}
                      id='add-button'
                      type='submit'
                      name='addMember'
                      value={JSON.stringify({ action: 'add' })}
                      className='h-9 px-4'
                      isDisabled={transition.state === 'submitting'}
                      buttonText={transition.state === 'submitting' ? 'Adding...' : 'Add'}
                      varient='primary-solid' />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Form>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
