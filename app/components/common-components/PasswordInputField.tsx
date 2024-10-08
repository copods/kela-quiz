import { useState } from "react"

import { Icon } from "@iconify/react"
import { useTranslation } from "react-i18next"

import type { PasswordFieldProps } from "~/interface/Interface"

const PasswordInputFields = ({
  name,
  label,
  error,
  errorId,
  placeholder,
  isRequired = false,
  required,
  value,
  onBlur,
  onChange,
}: PasswordFieldProps) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-gray-800">
        {label}
        {isRequired ? <span className="text-red-600">*</span> : null}
      </label>
      <div className="relative flex items-center justify-center rounded-lg border border-gray-200">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="h-11 w-full py-2.5 pl-3.5 pr-12 text-lg"
        />
        <button
          type="button"
          className="btn btn-outline-primary absolute left-auto right-0 mr-3.5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
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
