import type { CheckboxProps } from '~/interface/Interface'

function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input
        name="checkbox"
        tabIndex={0}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500 ${props.className}`}
        onChange={props.handleChange}
        checked={props.isChecked}
        {...props}
      />
    </div>
  )
}

export default Checkbox
