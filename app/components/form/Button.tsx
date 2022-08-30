import type { ButtonProps } from '~/interface/Interface'

const Button = ({ buttonText, ...props }: ButtonProps) => {
  return (
    <button
      data-cy="submit"
      tabIndex={0}
      className={
        'w-full rounded bg-primary py-2.5 text-gray-50 ' +
        (props?.isDisabled ? 'disabled:opacity-50' : '')
      }
      disabled={props?.isDisabled}
      {...props}
    >
      {buttonText}
    </button>
  )
}
export default Button
