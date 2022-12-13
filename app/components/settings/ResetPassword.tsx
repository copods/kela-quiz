import { Form, useActionData, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { trimValue } from '~/utils'
import DialogWrapper from '../Dialog'
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
  const [error, setError] = useState({
    passMinLengthError: '',
    passNotMatchError: '',
    passIsInvalid: generalSettings?.errors?.valid,
    passShouldNotBeSame: generalSettings?.errors?.passShouldNotBeSame,
  })

  const comparePasswords = (password: string, confirmPassword: string) => {
    if (password.length <= 0 || confirmPassword.length <= 0) {
      if (password.length !== 0 && password.length < 8) {
        setError({
          ...error,
          passMinLengthError: t('settings.minPasswordLimit'),
        })
        return
      } else {
        setError({ ...error, passMinLengthError: '' })
        return
      }
    }
    if (password === confirmPassword) {
      setError({ ...error, passNotMatchError: '' })
    } else if (password !== confirmPassword && password.length >= 8) {
      setError({
        ...error,
        passMinLengthError: '',
        passNotMatchError: t('settings.passNotMatch'),
      })
    } else {
      setError({
        ...error,
        passNotMatchError: t('settings.passNotMatch'),
      })
    }
  }
  const PasswordInputFieldProps = [
    // Input field props
    {
      label: t('settings.enterOldPassword'),
      placeholder: t('settings.enterOldPassword'),
      name: 'oldPassword',
      required: true,
      type: 'password',
      value: password,
      error: error.passIsInvalid,
      errorId: 'password-error',
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
      error: error?.passMinLengthError || error?.passShouldNotBeSame,
      errorId: 'new-password-error',
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
      error: error?.passNotMatchError,
      errorId: 'confirm-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(trimValue(event?.target.value))
      },
    },
  ]
  useEffect(() => {
    setPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setError({
      passShouldNotBeSame: '',
      passIsInvalid: '',
      passMinLengthError: '',
      passNotMatchError: '',
    })
  }, [openResetPassModel])
  useEffect(() => {
    setError({
      ...error,
      passIsInvalid: generalSettings?.errors?.valid,
      passShouldNotBeSame: generalSettings?.errors?.passShouldNotBeSame,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalSettings])
  return (
    <DialogWrapper
      open={openResetPassModel}
      heading={t('settings.resetPas')}
      setOpen={setOpenResetPassModel}
      header={true}
      role={t('settings.resetPas')}
      ariaLabel={t('settings.resetPas')}
      tabIndex={0}
    >
      <Form method="post">
        <div className="flex flex-col gap-8">
          <div className="input-container-wrapper flex flex-col gap-6">
            {PasswordInputFieldProps.map((props) => {
              return (
                <PasswordInputFields
                  onblur={() => comparePasswords(newPassword, confirmPassword)}
                  {...props}
                  key={props.name}
                />
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
              isDisabled={!(newPassword && confirmPassword && password)}
              datacy="submit"
            />
          </div>
        </div>
      </Form>
    </DialogWrapper>
  )
}
export default ResetPassword
