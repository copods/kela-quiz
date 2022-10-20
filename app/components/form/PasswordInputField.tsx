import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { PasswordFieldProps } from '~/interface/Interface'
import { useTranslation } from 'react-i18next'

const PasswordInputFields = ({
  name,
  label,
  error,
  errorId,
  placeholder,
  required,
  value,
  onChange,
}: PasswordFieldProps) => {
  const { t } = useTranslation()
  const [passwordType, setPasswordType] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <div className="flex rounded-lg border border-gray-200">
        <input
          id={name}
          type={passwordType ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="h-11 w-full px-3.5 py-2.5 text-lg"
        />
        <button
          type="button"
          className="btn btn-outline-primary absolute right-0 left-auto mr-10 mt-2.5"
          onClick={() => setPasswordType(!passwordType)}
        >
          {passwordType ? (
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
export default PasswordInputFields
