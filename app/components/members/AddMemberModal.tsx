import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import type { Role } from '~/interface/Interface'
import { useSubmit, useTransition } from '@remix-run/react'
import { Fragment, useState, useEffect } from 'react'
import { commonConstants, members } from '~/constants/common.constants'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import DropdownField from '../form/Dropdown'
// import { validate } from '~/utils'
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
  const submit = useSubmit()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roles[0].id)

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: role,
      addMember: JSON.stringify({
        action: 'add',
      }),
    }
    submit(data, {
      method: 'post',
    })
  }

  useEffect(() => {
    setFirstName('')
    setLastName('')
  }, [open])
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
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
          <div
            className="fixed inset-0 z-10 flex min-h-full items-end justify-center overflow-y-auto p-4 text-center sm:items-center sm:p-0"
            id="add-pop-up-model"
          >
            {/* <Form method="post"> */}
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
                  <h2
                    className="text-2xl font-bold text-gray-700"
                    tabIndex={0}
                    title={members.addMember}
                    role={members.addMember}
                    aria-label={members.addMember}
                  >
                    {members.addMember}
                  </h2>
                  <Icon
                    tabIndex={0}
                    className="cursor-pointer text-2xl text-gray-600"
                    icon={'carbon:close'}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') setOpen(false)
                    }}
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
                      className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                      placeholder={members.firstName}
                      onChange={(e) => setFirstName(trimValue(e.target.value))}
                      value={firstName}
                      maxLength={40}
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
                      placeholder={members.lastName}
                      onChange={(e) => setLastName(trimValue(e.target.value))}
                      value={lastName}
                      maxLength={40}
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
                    type="text"
                    name="email"
                    className="my-1.5 h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={members.email}
                    onChange={(e) => setEmail(trimValue(e.target.value))}
                  />
                </div>
                <div className="pb-6">
                  <div>
                    <label htmlFor="" className="text-gray-800">
                      {members.role}
                    </label>
                  </div>
                  <DropdownField
                    data={roles}
                    name="roleId"
                    displayKey={'name'}
                    valueKey={'id'}
                    value={role}
                    setValue={setRole}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    tabIndex={0}
                    id="cancel-add-button"
                    className="h-9 px-4"
                    onClick={() => setOpen(false)}
                    varient="primary-outlined"
                    title={commonConstants.cancel}
                    buttonText={commonConstants.cancel}
                  />
                  <Button
                    tabIndex={0}
                    id="add-button"
                    name="addMember"
                    value={'add'}
                    className="h-9 px-4"
                    isDisabled={transition.state === 'submitting'}
                    title={
                      transition.state === 'submitting'
                        ? commonConstants.adding
                        : commonConstants.add
                    }
                    buttonText={
                      transition.state === 'submitting'
                        ? commonConstants.adding
                        : commonConstants.add
                    }
                    varient="primary-solid"
                    onClick={() => submitMemberForm()}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            {/* </Form> */}
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
