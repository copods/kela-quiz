import type { CheckboxProps } from '~/components/Interface'

function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
        {...props}
      />
    </div>
  )
}

export default Checkbox
