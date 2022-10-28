import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
import { Form } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { trimValue } from '~/utils'

const CreatePassword = ({
  checkErrorStatus,
}: {
  checkErrorStatus: boolean
}) => {
  const [enterPassword, setEnterPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const { t } = useTranslation()
  const inputFieldProps = [
    {
      label: t('commonConstants.enterPassword'),
      placeholder: t('commonConstants.enterPassword'),
      type: 'text',
      name: 'enterPassword',
      required: true,
      value: enterPassword,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEnterPassword(trimValue(event?.target.value))
      },
    },

    {
      label: t('commonConstants.reEnterPassword'),
      placeholder: t('commonConstants.reEnterPassword'),
      type: 'text',
      name: 'reEnterPassword',
      required: true,
      value: reEnterPassword,
      error: checkErrorStatus ? t('statusCheck.enteredReenteredPassword') : '',
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setReEnterPassword(trimValue(event?.target.value))
      },
    },
  ]

  return (
    <div className="flex flex-1 items-center justify-center overflow-auto bg-gray-50">
      <div className="flex w-full max-w-454 flex-col gap-12 rounded-md border border-gray-50 bg-white p-12 drop-shadow-xl">
        <div className="text-center text-2xl font-bold">
          {t('commonConstants.createPassword')}
        </div>
        <Form method="post" className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            {inputFieldProps.map((props) => {
              return <InputField {...props} key={props.name} />
            })}
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
