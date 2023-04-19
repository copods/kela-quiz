import { useTranslation } from "react-i18next"

import type { InputFieldProps, InputFieldVariant } from "~/interface/Interface"

function InputField({
  name,
  label,
  error,
  errorId,
  isRequired = false,
  helperText,
  maxLength,
  variant = "default",
  ...props
}: InputFieldProps) {
  const { t } = useTranslation()
  const variantMap: InputFieldVariant = {
    small: "text-base h-10",
    default: "text-lg h-11",
  }
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className={"block text-gray-800"}>
          {label}
          {isRequired ? <span className="text-red-600">*</span> : null}
        </label>
      )}
      <input
        tabIndex={0}
        id={name}
        name={name}
        {...props}
        className={` w-full rounded-lg border border-gray-200 px-3.5 py-2.5 ${
          variantMap[variant as keyof InputFieldVariant]
        }`}
        title={props.placeholder}
        maxLength={maxLength}
      />
      <div className="flex items-center justify-between">
        {error && (
          <div className="text-red-700" id={errorId}>
            {t(error)}
          </div>
        )}
        {helperText && helperText}
      </div>
    </div>
  )
}

export default InputField
