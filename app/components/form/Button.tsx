import type { ButtonProps } from '~/interface/Interface'

export default function Button(props: ButtonProps) {
  return (
    <button
      className="w-full rounded bg-primary py-2.5 text-gray-50"
      {...props}
    >
      {props.buttonText}
    </button>
  )
}
