interface result {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputField({ name, label, placeholder, type, required }: result) {
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
        className="h-11 w-full rounded rounded-lg border border-[#D5DAE1] px-3.5 py-2.5 text-lg"
      />
    </div>
  );
}

export default InputField;
