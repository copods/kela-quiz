import type { CheckboxProps } from '~/interface/Interface'

function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
        onClick={props.handleChange}
        {...props}
      />
    </div>
  )
}

export default Checkbox
