interface result {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  errorId: string;
}

function InputField({
  name,
  label,
  placeholder,
  type,
  required,
  value,
  setValue,
  error,
  errorId,
}: result) {
  function onhandleChange(e: string) {
    setValue(e);
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-base font-medium text-gray-800"
      >
        {label}
      </label>
      <input
        id={name}
        required={required}
        placeholder={placeholder}
        autoFocus={true}
        name={name}
        type={type}
        value={value}
        className="h-11 w-full rounded rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg"
        onChange={(e) => onhandleChange(e.target.value)}
      />

      {required && error && (
        <div className="pt-1 text-red-700" id={errorId}>
          {error}
        </div>
      )}
    </div>
  );
}

export default InputField;
