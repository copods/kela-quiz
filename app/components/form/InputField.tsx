import type { InputFieldProps } from '~/interface/Interface'

function InputField({ ...props }: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="mb-1.5 block text-base font-medium text-gray-800"
      >
        {props.label}
      </label>
      <input
        id={props.name}
        {...props}
        className="h-11 w-full  rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg"
      />

      {props.required && props.error && (
        <div className="pt-1 text-red-700" id={props.errorId}>
          {props.error}
        </div>
      )}
    </div>
  )
}

export default InputField
