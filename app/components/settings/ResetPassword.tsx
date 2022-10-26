import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { trimValue } from '~/utils'
import Button from '../form/Button'
import PasswordInputFields from '../form/PasswordInputField'

const ResetPassword = ({
  openResetPassModel,
  setOpenResetPassModel,
}: {
  openResetPassModel: boolean
  setOpenResetPassModel: (e: boolean) => void
}) => {
  const { t } = useTranslation()
  const generalSettings = useActionData()
  useEffect(() => {
    if (generalSettings) {
      if (generalSettings === 'DONE') {
        setOpenResetPassModel(false) //reset password popUp wil be closed automatically if action is success
        toast.success(t('settings.passResetSuccessfully'))
      } else if (generalSettings.errors?.status === 400) {
        setOpenResetPassModel(true) //reset password popUp remain open if action is failed
      }
    }
  }, [generalSettings, setOpenResetPassModel, t])
  const transition = useTransition()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const PasswordInputFieldProps = [
    // Input field props
    {
      label: t('settings.enterOldPassword'),
      placeholder: t('settings.enterOldPassword'),
      name: 'oldPassword',
      required: true,
      type: 'password',
      value: password,
      error: generalSettings?.errors?.valid,
      errorId: 'Password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(trimValue(event?.target.value))
      },
    },
    {
      label: t('settings.enterNewPass'),
      placeholder: t('settings.enterNewPass'),
      name: 'newPassword',
      required: true,
      type: 'password',
      value: newPassword,
      error:
        generalSettings?.errors?.maximumPasswordLimit ||
        generalSettings?.errors?.passShouldNotBeSame,
      errorId: 'New-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(trimValue(event?.target.value))
      },
    },
    {
      label: t('settings.reEnterPass'),
      placeholder: t('settings.reEnterPass'),
      name: 'confirmNewPassword',
      required: true,
      type: 'password',
      value: confirmPassword,
      error: generalSettings?.errors?.passNotMatched,
      errorId: 'Confirm-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(trimValue(event?.target.value))
      },
    },
  ]
  useEffect(() => {
    setPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }, [openResetPassModel])
  return (
    <div>
      <Transition.Root show={openResetPassModel} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenResetPassModel(false)}
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
            id="resetPassword-pop-up-model"
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
                      id="reset-password-popup-close-icon"
                      className="cursor-pointer text-2xl text-gray-600"
                      icon={'carbon:close'}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') setOpenResetPassModel(false)
                      }}
                      onClick={() => setOpenResetPassModel(false)}
                    />
                  </div>
                  <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />

                  <Form method="post">
                    <div className="flex flex-col gap-8">
                      <div className="input-container-wrapper flex flex-col gap-6">
                        {PasswordInputFieldProps.map((props) => {
                          return (
                            <PasswordInputFields {...props} key={props.name} />
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          tabIndex={0}
                          name="resetPassword"
                          value="resetPassword"
                          title={
                            transition.state === 'submitting'
                              ? t('settings.passResetting')
                              : t('settings.resetPas')
                          }
                          buttonText={
                            transition.state === 'submitting'
                              ? t('settings.passResetting')
                              : t('settings.resetPas')
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
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
export default ResetPassword
