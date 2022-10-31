import { useState } from 'react'
import Button from '../form/Button'
import InputField from '../form/InputField'
import { Form, useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { trimValue } from '~/utils'

const CreatePassword = ({
  checkErrorStatus,
}: {
  checkErrorStatus: boolean
}) => {
  const createPassData = useLoaderData()

  const [enterPassword, setEnterPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')
  const { t } = useTranslation()
  const inputFieldProps = [
    {
      label: t('settings.password'),
      placeholder: t('settings.password'),
      type: 'text',
      name: 'Password',
      required: true,
      value: enterPassword,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEnterPassword(trimValue(event?.target.value))
      },
    },

    {
      label: t('commonConstants.confirmPassword'),
      placeholder: t('commonConstants.confirmPassword'),
      type: 'text',
      name: 'confirmPassword',
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
      {createPassData.passAlreadyDone ? (
        <span className="text-3xl">{t('statusCheck.passAlreadyCreated')}</span>
      ) : createPassData.userNotFound ? (
        <span className="userNotFound text-3xl">
          {t('statusCheck.userNotFound')}
        </span>
      ) : (
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
              buttonText={t('commonConstants.submit')}
            />
          </Form>
        </div>
      )}
    </div>
  )
}

export default CreatePassword
