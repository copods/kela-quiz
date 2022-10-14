import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
// import Logo from '../Logo'
import { Form } from '@remix-run/react'
// import { routes } from '~/constants/route.constants'
// import { useTranslation } from 'react-i18next'

const CreatePassword = () => {
  const [enterPassword, setEnterPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  // const { t } = useTranslation()
  // let navigate = useNavigate()
  const inputFieldsPropsforEnterPassword = [
    {
      label: '',
      placeholder: 'Enter Password',
      type: 'text',
      name: 'enterPassword',
      required: true,
      value: enterPassword,
      // error: checkErrorStatus ? t('statusCheck.resendPasswordError') : '',
      errorId: 'email-error',
      onChange: function (event: any) {
        setEnterPassword(event?.target.value)
      },
    },
  ]
  const inputFieldsPropsforReEnterPassword = [
    {
      label: '',
      placeholder: 'Re-Enter Password',
      type: 'text',
      name: 'reEnterPassword',
      required: true,
      value: reEnterPassword,
      // error: checkErrorStatus ? t('statusCheck.resendPasswordError') : '',
      errorId: 'email-error',
      onChange: function (event: any) {
        setReEnterPassword(event?.target.value)
      },
    },
  ]

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-454 flex-col gap-12 rounded-md border border-gray-50 bg-white px-12 pb-12  text-center drop-shadow-xl">
        <div className="pt-12 text-2xl font-bold">Create Password</div>
        <Form method="post" className="flex flex-col gap-12">
          <div className="flex flex-col ">
            <span className="flex justify-start  text-base text-gray-800">
              Enter Password
            </span>
            <div>
              {inputFieldsPropsforEnterPassword.map((props) => {
                return <InputField {...props} key={props.name} />
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="flex justify-start text-base text-gray-800">
              Re- Enter Password
            </span>
            <div>
              {inputFieldsPropsforReEnterPassword.map((props) => {
                return <InputField {...props} key={props.name} />
              })}
            </div>
          </div>

          <Button
            tabIndex={0}
            id="reset-password"
            varient="primary-solid"
            type="submit"
            className="h-11 "
            title="proceed"
            buttonText="Proceed"
          />
        </Form>
      </div>
    </div>
  )
}

export default CreatePassword
