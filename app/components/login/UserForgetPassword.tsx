import { useEffect, useState } from 'react'
import Button from '../common-components/Button'
import InputField from '../common-components/InputField'
import Logo from '../Logo'
import { Form, useNavigate } from '@remix-run/react'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

const UserForgetPassword = ({
  checkErrorStatus,
  setCheckErrorStatus,
}: {
  setCheckErrorStatus: (e: boolean) => void
  checkErrorStatus: boolean
}) => {
  const [emailFieldError, setEmailFieldError] = useState('')
  const [email, setEmail] = useState('')
  const { t } = useTranslation()
  useEffect(() => {
    if (checkErrorStatus) {
      setEmailFieldError(t('statusCheck.resendPasswordError'))
    }
  }, [t, checkErrorStatus])
  let navigate = useNavigate()
  const inputFieldsProps = [
    {
      label: t('commonConstants.email'),
      placeholder: t('forgotPasswordConstants.enterEmailPlaceholder'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      error: emailFieldError,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event?.target.value)
        if (event.target.value === '') {
          setEmailFieldError('')
          setCheckErrorStatus(false)
        }
      },
    },
  ]
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div
        id="forget-password-card"
        className="flex w-full max-w-554 flex-col gap-6 rounded-md border border-gray-50 bg-white px-24 pb-12 drop-shadow-xl"
      >
        <div className="-mt-9 flex justify-center">
          <Logo height="64" width="64" />
        </div>
        <div
          id="forget-pass-header"
          className="text-center text-3xl font-bold text-gray-900"
        >
          {t('forgotPasswordConstants.header')}
        </div>
        <div className="flex items-center justify-center">
          <hr className="h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>

        <div id="enter-mail-info" className="text-center text-xs text-gray-500">
          {t('forgotPasswordConstants.enterEmail')}
        </div>
        <Form method="post" className="flex flex-col gap-6">
          {inputFieldsProps.map((props) => {
            return <InputField {...props} key={props.name} />
          })}

          <div className="-mt-3 flex justify-end">
            <span
              id="back-to-login"
              tabIndex={0}
              onClick={() => {
                navigate(routes.signIn)
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') navigate(routes.signIn)
              }}
              role="link"
              className="cursor-pointer text-sm text-primary"
            >
              {t('forgotPasswordConstants.backToLogin')}
            </span>
          </div>
          <Button
            tabIndex={0}
            id="reset-password"
            varient="primary-solid"
            type="submit"
            className="h-11 w-358"
            title={t('forgotPasswordConstants.resetPassword')}
            buttonText={t('forgotPasswordConstants.resetPassword')}
          />
        </Form>
      </div>
    </div>
  )
}

export default UserForgetPassword
