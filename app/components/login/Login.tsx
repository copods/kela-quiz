import React, { useState } from 'react'
import { Form, useNavigate } from '@remix-run/react'
import Button from '~/components/form/Button'
import InputField from '~/components/form/InputField'
import Logo from '~/components/Logo'
import type { LoginProps } from '~/interface/Interface'
import { forgotPasswordConstants, logIn } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
function Login({ actionData, redirectTo }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputFieldsProps = [
    {
      label: 'Email',
      placeholder: 'Enter Email',
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      error: actionData?.errors?.email,
      errorId: 'email-error',
      onChange: function (event: any) {
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
      onChange: function (event: any) {
        setPassword(event?.target.value)
      },
    },
  ]
  const navigate = useNavigate()
  const forgetPassword = () => {
    navigate(routes.forgotPassword)
  }
  return (
    <div className="z-10 flex	min-h-480 w-full max-w-554 flex-col items-center justify-center rounded-2xl bg-white px-24 drop-shadow-xl">
      <div className="z-20 -mt-24 mb-6">
        <Logo height="64" width="64" />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          {logIn.signInMessage}
        </h1>
        <div className="flex justify-center">
          <hr className="mt-7 mb-5 h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>
        <Form method="post">
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
              {forgotPasswordConstants.header}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button
              tabIndex={0}
              title={logIn.signIn}
              buttonText={logIn.signIn}
              type="submit"
              varient="primary-solid"
              className="w-full"
              datacy="submit"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
