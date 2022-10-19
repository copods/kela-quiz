import { useNavigate, useSubmit, useTransition } from '@remix-run/react'
import { useState } from 'react'
import Button from '~/components/form/Button'
import Logo from '~/components/Logo'
import { trimValue } from '~/utils'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import InputField from '../form/InputField'

const SignUp = () => {
  const transition = useTransition()
  const submit = useSubmit()

  const { t } = useTranslation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [workspace, defaultWorkspace] = useState('')

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      workspace: workspace,
      addMember: JSON.stringify({
        action: 'add',
      }),
    }
    submit(data, {
      method: 'post',
    })
  }
  const navigate = useNavigate()
  const signIn = () => {
    navigate(routes.signIn)
  }
  const inputFieldsProps = [
    {
      label: t('members.firstName'),
      placeholder: t('members.firstName'),
      type: 'text',
      name: 'firstName',
      required: true,
      value: firstName,
      errorId: 'firstName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(trimValue(event.target.value))
      },
    },
    {
      label: t('members.lastName'),
      placeholder: t('members.lastName'),
      type: 'text',
      name: 'lastName',
      required: true,
      value: lastName,
      errorId: 'lastName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.email'),
      placeholder: t('commonConstants.email'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      errorId: 'email-error',
      onChange: function (event: any) {
        setEmail(trimValue(event.target.value))
      },
    },
    {
      label: t('commonConstants.defaultWorkspaceName'),
      placeholder: t('commonConstants.defaultWorkspaceName'),
      type: 'text',
      name: 'workspace',
      required: true,
      value: workspace,
      errorId: 'workspace-error',
      onChange: function (event: any) {
        defaultWorkspace(trimValue(event.target.value))
      },
    },
  ]
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-6 rounded-2xl bg-white px-20 py-12 pb-8 text-left drop-shadow-2xl transition-all sm:w-full sm:max-w-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="-mt-20 flex justify-center">
            <Logo height="64" width="64" />
          </div>
          <h2
            className="text-center text-3xl font-bold text-gray-900"
            tabIndex={0}
            title={t('members.addMember')}
            role={t('members.addMember')}
            aria-label={t('members.addMember')}
          >
            {t('logIn.signUp')}
          </h2>
          <hr className="h-px w-6/12 border-none bg-gray-500 text-center" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            {inputFieldsProps.slice(0, 2).map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="flex flex-col gap-6">
            {inputFieldsProps.slice(2).map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Button
            tabIndex={0}
            id="add-button"
            name="addMember"
            value={'add'}
            className="h-11 w-full px-4"
            isDisabled={transition.state === 'submitting'}
            title={
              transition.state === 'submitting'
                ? t('logIn.signingUp')
                : t('logIn.signUp')
            }
            buttonText={
              transition.state === 'submitting'
                ? t('logIn.signingUp')
                : t('logIn.signUp')
            }
            varient="primary-solid"
            onClick={() => submitMemberForm()}
          />
          <div className="text-base font-medium text-gray-500">
            {t('logIn.AlreadyHaveAnAccount')}{' '}
            <span
              className="cursor-pointer text-primary"
              tabIndex={0}
              onClick={() => {
                signIn()
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') signIn()
              }}
              role="link"
            >
              {t('logIn.signIn')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp
