import {
  useActionData,
  useNavigate,
  useSubmit,
  useTransition,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '~/components/form/Button'
import Logo from '~/components/Logo'
import { trimValue } from '~/utils'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import InputField from '../form/InputField'
import PasswordInputFields from '../form/PasswordInputField'
import { toast } from 'react-toastify'

const SignUp = ({ error }: { error?: string }) => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const signUpActionData = useActionData()
  useEffect(() => {
    if (signUpActionData) {
      if (signUpActionData.resp?.status === 200) {
        toast.success(t(signUpActionData.resp?.title))
        navigate(routes.signIn)
      }
    }
  }, [signUpActionData, navigate, t])
  const transition = useTransition()
  const submit = useSubmit()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [workspace, setWorkspace] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      workspace: workspace,
      Password: Password,
      confirmPassword: confirmPassword,
      signUp: JSON.stringify({
        action: 'add',
      }),
    }
    submit(data, {
      method: 'post',
    })
  }
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
      error: signUpActionData?.errors?.firstNameRequired,
      errorId: 'firstName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(trimValue(event.target.value.replace(/[^\w\s]/gi, '')))
      },
    },
    {
      label: t('members.lastName'),
      placeholder: t('members.lastName'),
      type: 'text',
      name: 'lastName',
      required: true,
      value: lastName,
      error: signUpActionData?.errors?.lastNameRequired,
      errorId: 'lastName-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(trimValue(event.target.value.replace(/[^\w\s]/gi, '')))
      },
    },
    {
      label: t('commonConstants.email'),
      placeholder: t('commonConstants.email'),
      type: 'text',
      name: 'email',
      required: true,
      value: email,
      error:
        signUpActionData?.errors?.emailRequired ||
        signUpActionData?.errors?.enterVaildMailAddress,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
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
      error: signUpActionData?.errors?.workspaceNameRequired,
      errorId: 'workspace-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setWorkspace(trimValue(event.target.value))
      },
    },
    {
      label: t('settings.password'),
      placeholder: t('settings.password'),
      name: 'Password',
      required: true,
      type: 'password',
      value: Password,
      error: signUpActionData?.errors?.minPasswordLimit,
      errorId: 'New-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(trimValue(event?.target.value))
      },
    },
    {
      label: t('settings.reEnterPass'),
      placeholder: t('settings.reEnterPass'),
      name: 'confirmPassword',
      required: true,
      type: 'password',
      value: confirmPassword,
      error: signUpActionData?.errors?.passNotMatched,
      errorId: 'Confirm-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(trimValue(event?.target.value))
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
            title={t('logIn.signUp')}
            role={t('logIn.signUp')}
            aria-label={t('logIn.signUp')}
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
            {inputFieldsProps.slice(2, 4).map((props) => {
              return <InputField {...props} key={props.name} />
            })}
          </div>
          <div className="input-container-wrapper flex flex-col gap-6">
            {inputFieldsProps.slice(4).map((props) => {
              return <PasswordInputFields {...props} key={props.name} />
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
