import React, { useEffect, useState } from 'react'
import { Form, useLoaderData, useNavigate } from '@remix-run/react'
import Logo from '~/components/Logo'
import type { LoginProps } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'
import { routes } from '~/constants/route.constants'
import InputField from '../common-components/InputField'
import Button from '../common-components/Button'
import Checkbox from '../form/CheckBox'
function Login({ actionData, redirectTo }: LoginProps) {
  const { t } = useTranslation()

  const loginLoaderData = useLoaderData()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loginFieldError, setLoginFieldError] = useState({
    email: actionData?.errors?.email,
    password: actionData?.errors?.password,
  })
  useEffect(() => {
    setLoginFieldError({
      email: actionData?.errors?.email,
      password: actionData?.errors?.password,
    })
  }, [actionData])
  const inputFieldsProps = [
    {
      label: t('commonConstants.email'),
      placeholder: t('forgotPasswordConstants.enterEmailPlaceholder'),
      type: 'text',
      name: 'email',
      required: true,
      isRequired: true,
      value: email,
      error: loginFieldError.email,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event?.target.value)
        if (event?.target.value === '') {
          setLoginFieldError({ ...loginFieldError, email: '' })
        }
      },
    },
    {
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
      name: 'password',
      required: true,
      isRequired: true,
      value: password,
      error: loginFieldError.password,
      errorId: 'password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event?.target.value)
        if (event?.target.value === '') {
          setLoginFieldError({ ...loginFieldError, password: '' })
        }
      },
    },
  ]

  const checkboxProps = {
    isChecked: rememberMe,
    handleChange: function (event: React.ChangeEvent<HTMLInputElement>) {
      setRememberMe(event.target.checked)
    },
  }
  const navigate = useNavigate()
  const signUp = () => {
    navigate(routes.signUp)
  }
  const forgetPassword = () => {
    navigate(routes.forgotPassword)
  }
  return (
    <div className="z-10 flex	min-h-480 w-full max-w-554 flex-col items-center justify-center rounded-lg bg-white px-24 drop-shadow-xl">
      <div className="z-20 -mt-12 mb-6">
        <Logo height="64" width="64" />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('logIn.signInMessage')}
        </h1>
        <div className="flex justify-center">
          <hr className="mt-7 mb-5 h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>
        <Form
          method="post"
          action={
            loginLoaderData.inviteId === null
              ? '/sign-in'
              : `/sign-in?cameFrom=join&id=${loginLoaderData.inviteId}`
          }
        >
          <div className="flex flex-col gap-6">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="flex justify-between pt-4 pb-7">
            <div className="flex">
              <Checkbox {...checkboxProps} name="remember" id="remember" />
              <label
                htmlFor="remember"
                className="ml-2  block cursor-pointer pt-0.5 text-xs text-gray-800"
              >
                {t('logIn.rememberMe')}
              </label>
            </div>
            <span
              id="forgot-password"
              tabIndex={0}
              onClick={() => {
                forgetPassword()
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') forgetPassword()
              }}
              role="link"
              className="cursor-pointer text-sm text-primary"
            >
              {t('forgotPasswordConstants.header')}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <input
              type="hidden"
              name="inviteId"
              value={loginLoaderData.inviteId}
            />
            <Button
              tabIndex={0}
              type="submit"
              title={t('logIn.signIn')}
              buttonText={t('logIn.signIn')}
              variant="primary-solid"
              className="h-11 w-full"
              value={'login'}
            />
          </div>
        </Form>
      </div>
      <div className="flex pt-6">
        <div className="text-base font-medium text-gray-500">
          {t('logIn.dontHaveAnAccountYet')}{' '}
          <span
            id="sign-up"
            className="cursor-pointer text-primary"
            tabIndex={0}
            onClick={() => {
              signUp()
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') signUp()
            }}
            role="link"
          >
            {t('logIn.signUp')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
