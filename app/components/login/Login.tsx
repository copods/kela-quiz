import React, { useState } from 'react'
import { useLoaderData, useNavigate, useSubmit } from '@remix-run/react'
import Button from '~/components/form/Button'
import InputField from '~/components/form/InputField'
import Logo from '~/components/Logo'
import type { LoginProps } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'
import { routes } from '~/constants/route.constants'
function Login({ actionData, redirectTo }: LoginProps) {
  const { t } = useTranslation()

  const loginLoaderData = useLoaderData()
  const submit = useSubmit()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputFieldsProps = [
    {
      label: t('commonConstants.email'),
      placeholder: t('forgotPasswordConstants.enterEmailPlaceholder'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      error: actionData?.errors?.email,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event?.target.value)
      },
    },
    {
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
      name: 'password',
      required: true,
      value: password,
      error: actionData?.errors?.password,
      errorId: 'password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event?.target.value)
      },
    },
  ]
  const navigate = useNavigate()
  const signUp = () => {
    navigate(routes.signUp)
  }
  const submitSignInForm = () => {
    let data = {
      email: email,
      password: password,
      inviteId: loginLoaderData.inviteId,
      signIn: JSON.stringify({
        action: 'login',
      }),
    }
    submit(data, {
      method: 'post',
      action:
        loginLoaderData.inviteId === null
          ? '/sign-in'
          : `/sign-in?cameFrom=join&id=${loginLoaderData.inviteId}`,
    })
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
        <div>
          <div className="flex flex-col gap-6">
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          {/* TODO: may be needed in future
           <div className="mt-4 flex items-center justify-between">
            <div className="flex">
              <Checkbox {...checkboxProps} />
              <label
                htmlFor="remember"
                className="ml-2 block text-xs text-gray-800"
              >
                Remember Me
              </label>
            </div>
            <div className="cursor-pointer text-center text-xs text-indigo-600">
              Forget your password?
            </div>
          </div> */}
          <div className="flex justify-end pt-4 pb-7">
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
            <Button
              tabIndex={0}
              title={t('logIn.signIn')}
              buttonText={t('logIn.signIn')}
              varient="primary-solid"
              className="h-11 w-full"
              value={'login'}
              onClick={() => submitSignInForm()}
            />
          </div>
        </div>
      </div>
      <div className="flex pt-6">
        <div className="text-base font-medium text-gray-500">
          {t('logIn.DontHaveAnAccountYet')}{' '}
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
