import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Form, useTransition } from '@remix-run/react'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../form/Button'
import InputField from '../form/InputField'
import PasswordInputFields from '../form/PasswordInputField'

const ResetPassword = ({
  openPopUp,
  actionStatus,
  setActionStatus,
  setOpenPopUp,
  validationError,
  passNotMatched,
  maximumPasswordLimit,
}: {
  openPopUp: boolean
  setOpenPopUp: (e: boolean) => void
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  validationError?: string
  passNotMatched?: string
  maximumPasswordLimit?: string
}) => {
  const transition = useTransition()
  const { t } = useTranslation()
  useEffect(() => {
    if (actionStatus) {
      setOpenPopUp(false)
      setActionStatus(false)
    }
  }, [actionStatus, setActionStatus])
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const inputFieldsProps = [
    {
      label: 'Password',
      placeholder: 'Enter Old Password',
      type: 'password',
      name: 'Old Password',
      required: true,
      value: password,
      error: validationError,
      errorId: 'Password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event?.target.value)
      },
    },
  ]
  const PasswordInputFieldProps = [
    {
      label: 'New Password',
      placeholder: 'Enter New Password',
      name: 'New Password',
      required: true,
      value: newPassword,
      error: maximumPasswordLimit,
      errorId: 'New-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(event?.target.value)
      },
    },
    {
      label: 'Confirm New Password',
      placeholder: 'Confirm New Password',
      name: 'Confirm New Password',
      required: true,
      value: confirmPassword,
      error: passNotMatched,
      errorId: 'Confirm-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event?.target.value)
      },
    },
  ]

  return (
    <div>
      <Transition.Root show={openPopUp} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenPopUp(false)}
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
                <div className="flex flex-col ">
                  <div className="flex items-center justify-between pt-1">
                    <h2
                      className="text-2xl font-bold text-gray-700"
                      tabIndex={0}
                      title={t('settings.resetPas')}
                      role={t('settings.resetPas')}
                      aria-label={t('settings.resetPas')}
                    >
                      {t('settings.resetPas')}
                    </h2>
                    <Icon
                      tabIndex={0}
                      className="cursor-pointer text-2xl text-gray-600"
                      icon={'carbon:close'}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') setOpenPopUp(false)
                      }}
                      onClick={() => setOpenPopUp(false)}
                    />
                  </div>
                  <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />

                  <Form method="post">
                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col gap-6">
                        {inputFieldsProps.map((props) => {
                          return <InputField {...props} key={props.name} />
                        })}
                        {PasswordInputFieldProps.map((props) => {
                          return (
                            <PasswordInputFields {...props} key={props.name} />
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          tabIndex={0}
                          title={
                            transition.state === 'submitting'
                              ? t('settings.passResetting')
                              : t('settings.passReset')
                          }
                          buttonText={
                            transition.state === 'submitting'
                              ? t('settings.passResetting')
                              : t('settings.passReset')
                          }
                          type="submit"
                          varient="primary-solid"
                          className="h-11 w-full text-base"
                          isDisabled={
                            !(newPassword && confirmPassword && password)
                          }
                          datacy="submit"
                        />
                      </div>
                    </div>
                  </Form>
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
export default ResetPassword
