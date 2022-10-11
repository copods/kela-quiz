import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { PasswordFieldProps } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'

const PasswordInputField = ({
  name,
  label,
  error,
  errorId,
  ...props
}: PasswordFieldProps) => {
  const { t } = useTranslation()
  const [passwordType, setPasswordType] = useState('password')

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    } else {
      return setPasswordType('password')
    }
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="block text-base font-medium text-gray-800"
      >
        {label}
      </label>
      <div className="flex rounded-lg border border-gray-200 px-3.5">
        <input
          tabIndex={0}
          id={name}
          type={passwordType}
          name={name}
          {...props}
          className="h-11 w-full py-2.5 text-lg"
          title={props.placeholder}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={togglePassword}
        >
          {passwordType === 'password' ? (
            <Icon icon="codicon:eye" className="text-xl text-gray-500 " />
          ) : (
            <Icon
              icon="codicon:eye-closed"
              className="text-xl text-gray-500 "
            />
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-700" id={errorId}>
          {t(error)}
        </div>
      )}
    </div>
  )
}
export default PasswordInputField
