import { useTranslation } from 'react-i18next'
import type { InputFieldProps } from '~/interface/Interface'

function InputField({
  name,
  label,
  error,
  errorId,
  ...props
}: InputFieldProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="block text-gray-800">
        {label}
      </label>
      <input
        tabIndex={0}
        id={name}
        name={name}
        {...props}
        className="h-11 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg"
        title={props.placeholder}
      />
      {error && (
        <div className="text-red-700" id={errorId}>
          {t(error)}
        </div>
      )}
    </div>
  )
}

export default InputField