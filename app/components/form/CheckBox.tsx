import type { CheckboxProps } from "~/interface/Interface"

function Checkbox({ isChecked, handleChange, ...props }: CheckboxProps) {
  return (
    <div>
      <input
        name="checkbox"
        tabIndex={0}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-200 accent-primary focus:ring-blue-500 ${props.className}`}
        onChange={handleChange}
        checked={isChecked}
        {...props}
      />
    </div>
  )
}

export default Checkbox
