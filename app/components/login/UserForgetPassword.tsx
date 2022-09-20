import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
import Logo from '../Logo'
import { Form } from '@remix-run/react'
import Divider from '../divider'
import { forgotPasswordConstants } from '~/constants/common.constants'

const UserForgetPassword = () => {
  const [email, setEmail] = useState('')
  const inputFieldsProps = [
    {
      label: '',
      placeholder: 'Enter Email',
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      errorId: 'name-error',
      onChange: function (event: any) {
        setEmail(event?.target.value)
      },
    },
  ]
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex max-w-554 flex-col gap-6 rounded-md border border-gray-50 bg-white px-24 pb-6 text-center drop-shadow-sm">
        <div className="-mt-9 flex justify-center">
          <Logo height="64" width="64" />
        </div>
        <div className="text-3xl font-bold text-gray-900">
          {forgotPasswordConstants.header}
        </div>
        <Divider height="1px" />
        <div className="text-xs text-gray-500">
          {forgotPasswordConstants.enterEmail}
        </div>
        <Form method="post" className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="flex justify-start text-base text-gray-800">
              {forgotPasswordConstants.email}
            </span>
            <div>
              {inputFieldsProps.map((props) => {
                return <InputField {...props} key={props.name} />
              })}
            </div>
          </div>
          <Button
            tabIndex={0}
            id="reset-password"
            varient="primary-solid"
            type="submit"
            className="h-11 w-358"
            title={forgotPasswordConstants.resetPassword}
            buttonText={forgotPasswordConstants.resetPassword}
          />
        </Form>
      </div>
    </div>
  )
}

export default UserForgetPassword
