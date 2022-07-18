import React, { useState } from 'react'
import { Form } from '@remix-run/react'
import Button from '~/components/form/Button'
import InputField from '~/components/form/InputField'
import Logo from '~/components/Logo'
import type { LoginProps } from '~/interface/Interface'

function Login({ actionData, redirectTo }: LoginProps) {
  const [email, setEmail] = useState('careers@copods.co')
  const [password, setPassword] = useState('kQuiz@copods')

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

  return (
    <div className="z-10 flex	min-h-[480px] w-full max-w-[554px] flex-col items-center justify-center rounded-2xl bg-white px-24 drop-shadow-xl">
      <div className="z-20 -mt-24 mb-6">
        <Logo height="64" width="64" />
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900">
          Sign in to your account
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
          <div className="mt-6">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button buttonText="Sign in" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
