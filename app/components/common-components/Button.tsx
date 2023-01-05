import type { ButtonProps } from '~/interface/Interface'

const Button = ({
  buttonText,
  className,
  onClick,
  isDisabled,
  btnRef,
  ...props
}: ButtonProps) => {
  const getCommonClasses = () => {
    return `py-2.5 px-5 rounded-md items-center inline-flex shadow-sm text-xs font-medium ${
      props.alignment ? props.alignment : 'justify-center'
    }`
  }
  const getButtonVariant = () => {
    switch (props.variant) {
      case 'primary-solid':
        return `bg-primary text-gray-50 ${
          !isDisabled && 'hover:bg-primaryHover transition ease-in-out delay-75'
        } ${isDisabled && 'disabled:bg-primaryDisabled'}`

      case 'primary-outlined':
        return `text-gray-primary rounded-md border border-primary bg-white text-primary ${
          !isDisabled && 'hover:bg-gray-100 transition ease-in-out delay-75'
        } ${
          isDisabled && 'disabled:border-primaryDisabled text-primaryDisabled'
        }`

      case 'secondary-solid':
        return `border border-transparent bg-red-500 text-white ${
          !isDisabled && 'hover:bg-red-700 transition ease-in-out delay-75'
        } ${isDisabled && 'disabled:bg-red-200'}`
    }
  }
  return (
    <button
      ref={btnRef}
      className={`${getCommonClasses()} ${getButtonVariant()} ${className}`}
      title={props?.title}
      data-cy={props?.datacy}
      tabIndex={props?.tabIndex}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  )
}
export default Button
