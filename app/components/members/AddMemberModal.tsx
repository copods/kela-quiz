import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import type { Role } from '~/interface/Interface'
import { useSubmit, useTransition } from '@remix-run/react'
import { Fragment, useState, useEffect } from 'react'
import Button from '../form/Button'
import { trimValue } from '~/utils'
import DropdownField from '../form/Dropdown'
import InputField from '~/components/form/InputField'
import { useTranslation } from 'react-i18next'

export default function AddMemberModal({
  roles,
  open,
  setOpen,
}: {
  roles: Role[]
  open: boolean
  setOpen: (e: boolean) => void
}) {
  const { t } = useTranslation()

  const transition = useTransition()
  const submit = useSubmit()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(roles[0].id)
  const [workspace, defaultWorkspace] = useState('')

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      roleId: role,
      workspace: workspace,
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

  const inputFieldsProps = [
    {
      label: t('members.firstName'),
      placeholder: t('members.firstName'),
      type: 'text',
      name: 'firstName',
      required: true,
      value: firstName,
      errorId: 'firstName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(trimValue(event.target.value))
      },
    },
    {
      label: t('members.lastName'),
      placeholder: t('members.lastName'),
      type: 'text',
      name: 'lastName',
      required: true,
      value: lastName,
      errorId: 'lastName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.email'),
      placeholder: t('commonConstants.email'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.defaultWorkspaceName'),
      placeholder: t('commonConstants.defaultWorkspaceName'),
      type: 'text',
      name: 'workspace',
      required: true,
      value: workspace,
      errorId: 'workspace-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        defaultWorkspace(trimValue(event.target.value))
      },
    },
  ]
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
              <Dialog.Panel className="relative transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-center justify-between pt-1">
                  <h2
                    className="text-2xl font-bold text-gray-700"
                    tabIndex={0}
                    title={t('members.addMember')}
                    role={t('members.addMember')}
                    aria-label={t('members.addMember')}
                  >
                    {t('members.addMember')}
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

                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    {inputFieldsProps.slice(0, 2).map((props) => {
                      return <InputField {...props} key={props.name} />
                    })}
                  </div>
                  <div className="flex flex-col gap-6">
                    {inputFieldsProps.slice(2).map((props) => {
                      return <InputField {...props} key={props.name} />
                    })}
                  </div>
                  <div className="flex flex-col gap-1.5" id="add-member-modal">
                    <div>
                      <label htmlFor="" className="text-gray-800">
                        {t('members.role')}
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
                      title={t('commonConstants.cancel')}
                      buttonText={t('commonConstants.cancel')}
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
                          ? t('commonConstants.adding')
                          : t('commonConstants.add')
                      }
                      buttonText={
                        transition.state === 'submitting'
                          ? t('commonConstants.adding')
                          : t('commonConstants.add')
                      }
                      varient="primary-solid"
                      onClick={() => submitMemberForm()}
                    />
                  </div>
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
