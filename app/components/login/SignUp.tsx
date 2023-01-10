import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
  useTransition,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import Button from '~/components/common-components/Button'
import Logo from '~/components/Logo'
import {
  checkPasswordStrength,
  getPasswordStrengthColor,
  trimValue,
} from '~/utils'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import InputField from '../common-components/InputField'
import PasswordInputFields from '../common-components/PasswordInputField'
import { toast } from 'react-toastify'

const SignUp = ({ error }: { error?: string }) => {
  const navigate = useNavigate()
  const signUpLoaderData = useLoaderData()
  const { t } = useTranslation()
  const signUpActionData = useActionData()
  useEffect(() => {
    if (signUpActionData) {
      if (signUpActionData?.errors?.title) {
        toast.error(t(signUpActionData?.errors?.title), {
          toastId: signUpActionData?.errors?.title,
        })
      }
    }
  }, [signUpActionData, navigate, t])
  const transition = useTransition()
  const submit = useSubmit()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(
    signUpLoaderData?.userData?.email ? signUpLoaderData?.userData?.email : ''
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const submitMemberForm = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      Password: password,
      confirmPassword: confirmPassword,
      inviteId: signUpLoaderData.inviteId,
      signUp: JSON.stringify({
        action: 'add',
      }),
    }
    submit(data, {
      method: 'post',
      action:
        signUpLoaderData.inviteId === null
          ? '/sign-up'
          : `/sign-up?cameFrom=join&id=${signUpLoaderData.inviteId}`,
    })
  }
  const signIn = () => {
    navigate(routes.signIn)
  }
  const [emailFieldError, setEmailFieldError] = useState(
    signUpActionData?.errors?.enterVaildMailAddress ||
      signUpActionData?.errors?.emailRequired
  )
  const [onBlurPasswordErr, setOnBlurPasswordErr] = useState('')
  const [onBlurConfPasswordErr, setOnConfBlurPasswordErr] = useState('')
  const onBlurPassError = () => {
    if (password.length < 8 && password.length !== 0) {
      setOnBlurPasswordErr('settings.minPasswordLimit')
    } else if (password.length >= 8 || password.length === 0) {
      setOnBlurPasswordErr('')
    }
  }
  const onBlurConfPassError = () => {
    if (password !== confirmPassword && confirmPassword.length !== 0) {
      setOnConfBlurPasswordErr('settings.passNotMatch')
    } else if (
      confirmPassword.length === 0 ||
      password.length === 0 ||
      password === confirmPassword
    ) {
      setOnConfBlurPasswordErr('')
    }
  }
  useEffect(() => {
    setEmailFieldError(
      signUpActionData?.errors?.enterVaildMailAddress ||
        signUpActionData?.errors?.emailRequired
    )
  }, [signUpActionData?.errors])
  useEffect(() => {
    const value = checkPasswordStrength(password)
    setPasswordStrength(value as string)
  }, [password])
  const inputFieldsProps = [
    {
      label: t('members.firstName'),
      placeholder: t('members.firstName'),
      isRequired: true,
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
      isRequired: true,
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
      isRequired: true,
      type: 'text',
      name: 'email',
      required: true,
      disabled: signUpLoaderData?.userData?.email ?? false,
      value: signUpLoaderData?.userData?.email ?? email,
      error: emailFieldError,
      errorId: 'email-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(trimValue(event.target.value))
        if (event.target.value === '') {
          setEmailFieldError('')
        }
      },
    },
    {
      label: t('settings.password'),
      placeholder: t('settings.password'),
      name: 'Password',
      required: true,
      isRequired: true,
      type: 'password',
      value: password,
      onBlur: onBlurPassError,
      error: signUpActionData?.errors?.minPasswordLimit || onBlurPasswordErr,
      errorId: 'New-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(trimValue(event?.target.value))
        if (event.target.value === '') {
          setOnBlurPasswordErr('')
        }
      },
    },
    {
      label: t('settings.reEnterPass'),
      placeholder: t('settings.reEnterPass'),
      name: 'confirmPassword',
      required: true,
      isRequired: true,
      type: 'password',
      value: confirmPassword,
      onBlur: onBlurConfPassError,
      error: signUpActionData?.errors?.passNotMatched || onBlurConfPasswordErr,
      errorId: 'Confirm-password-error',
      onChange: function (event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(trimValue(event?.target.value))
        if (event.target.value === '') {
          setOnConfBlurPasswordErr('')
        }
      },
    },
  ]

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2 rounded-2xl bg-white px-20 py-12 pb-8 text-left drop-shadow-2xl transition-all sm:w-full sm:max-w-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="-mt-20 flex justify-center">
            <Logo height="64" width="64" />
          </div>
          <h2
            id="signup-page-title"
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

        <div className="mt-4 flex flex-col gap-6">
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
        {password ? (
          <span className=" flex gap-1 text-sm">
            {t('commonConstants.passwordStrength')}:
            <span className={getPasswordStrengthColor(passwordStrength)}>
              {passwordStrength}
            </span>
          </span>
        ) : null}
        <div className="mt-4 flex flex-col items-center justify-center gap-6">
          <Button
            tabIndex={0}
            id="add-button"
            name="addMember"
            value={'add'}
            className="h-11 w-full px-4"
            isDisabled={
              !(
                firstName &&
                lastName &&
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword
              )
            }
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
            variant="primary-solid"
            onClick={() => submitMemberForm()}
          />
          <div className="text-base font-medium text-gray-500">
            {t('logIn.alreadyHaveAnAccount')}{' '}
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
