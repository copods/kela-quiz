import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
import { Form } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const CreatePassword = ({
  checkErrorStatus,
}: {
  checkErrorStatus: boolean
}) => {
  const [enterPassword, setEnterPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const { t } = useTranslation()
  const inputFieldsPropsforEnterPassword = [
    {
      label: '',
      placeholder: t('commonConstants.enterPassword'),
      type: 'text',
      name: 'enterPassword',
      required: true,
      value: enterPassword,
      errorId: 'email-error',
      onChange: function (event: any) {
        setEnterPassword(event?.target.value)
      },
    },
  ]
  const inputFieldsPropsforReEnterPassword = [
    {
      label: '',
      placeholder: t('commonConstants.reEnterPassword'),
      type: 'text',
      name: 'reEnterPassword',
      required: true,
      value: reEnterPassword,
      error: checkErrorStatus ? t('statusCheck.enteredReenteredPassword') : '',
      errorId: 'email-error',
      onChange: function (event: any) {
        setReEnterPassword(event?.target.value)
      },
    },
  ]

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-454 flex-col gap-12 rounded-md border border-gray-50 bg-white px-12 pb-12  text-center drop-shadow-xl">
        <div className="pt-12 text-2xl font-bold">
          {t('commonConstants.createPassword')}
        </div>
        <Form method="post" className="flex flex-col gap-12">
          <div className="flex flex-col ">
            <span className="flex justify-start  text-base text-gray-800">
              {t('commonConstants.enterPassword')}
            </span>
            <div>
              {inputFieldsPropsforEnterPassword.map((props) => {
                return <InputField {...props} key={props.name} />
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="flex justify-start text-base text-gray-800">
              {t('commonConstants.reEnterPassword')}
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
