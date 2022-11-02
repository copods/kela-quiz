import { Form, useActionData, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { trimValue } from '~/utils'
import DialogWrapperComponent from '../Dialog'
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

  const dialogWrapperProps = [
    // dialog wrapper props

    {
      id: 'resetPassword-pop-up-model',
      role: t('settings.resetPas'),
      ariaLabel: t('settings.resetPas'),
      tabIndex: 0,
    },
  ]
  return (
    <div>
      {dialogWrapperProps.map((props) => {
        return (
          <DialogWrapperComponent
            open={openResetPassModel}
            heading={t('settings.resetPas')}
            setOpen={setOpenResetPassModel}
            addDialog={true}
            {...props}
            key={props.id}
          >
            <Form method="post">
              <div className="flex flex-col gap-8">
                <div className="input-container-wrapper flex flex-col gap-6">
                  {PasswordInputFieldProps.map((props) => {
                    return <PasswordInputFields {...props} key={props.name} />
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
                    isDisabled={!(newPassword && confirmPassword && password)}
                    datacy="submit"
                  />
                </div>
              </div>
            </Form>
          </DialogWrapperComponent>
        )
      })}
    </div>
  )
}
export default ResetPassword
