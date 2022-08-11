import type { ButtonProps } from '~/interface/Interface'

export default function Button({ buttonText, ...props }: ButtonProps) {
  return (
    <button
      className="w-full rounded bg-primary py-2.5 text-gray-50"
      {...props}
    >
      {buttonText}
    </button>
  )
}
