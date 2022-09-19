import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
import Logo from '../Logo'
// import { Form } from '@remix-run/react'

const UserForgetPassword = () => {
  const [email, setEmail] = useState('')
  const inputFieldsProps = [
    {
      label: '',
      placeholder: '',
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
      <div className="max-h-352 flex max-w-554 flex-col gap-6 rounded-md border border-gray-50 bg-white px-24 pb-6 text-center drop-shadow-sm">
        <div className="-mt-9 flex justify-center">
          <Logo height="64" width="64" />
        </div>
        <div className="text-3xl font-bold text-[#2A3342]">
          Forgot password?
        </div>
        <div>
          <hr className="px-4" style={{ height: '1px', color: 'black' }} />
        </div>

        <div className="text-xs text-gray-500">
          {' '}
          Enter your email to retrieve your password.
        </div>

        <div className="flex flex-col ">
          <span className="flex justify-start text-base text-gray-800">
            Email
          </span>
          <div>
            {inputFieldsProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
        </div>
        <div className="">
          <Button
            tabIndex={0}
            id="Reset-Paswword"
            varient="primary-solid"
            type="submit"
            name="Reset-Pasword"
            value="Reset-Pasword"
            className="w-358"
            title="Reset Pasword"
            buttonText="Reset Pasword"
          />
        </div>
      </div>
    </div>
  )
}

export default UserForgetPassword
