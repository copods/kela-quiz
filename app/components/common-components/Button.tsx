import type { ButtonProps } from "~/interface/Interface"

const Button = ({
  buttonText,
  className,
  onClick,
  isDisabled,
  btnRef = null,
  padding,
  ...restProps
}: ButtonProps) => {
  const getCommonClasses = () => {
    return `py-2.5 ${
      padding ? padding : "px-5"
    } rounded-md items-center inline-flex shadow-sm text-xs font-medium ${
      restProps.alignment ? restProps.alignment : "justify-center"
    }`
  }
  const getButtonVariant = () => {
    switch (restProps.variant) {
      case "primary-solid":
        return `bg-primary text-gray-50 ${
          !isDisabled && "hover:bg-primaryHover transition ease-in-out delay-75"
        } ${isDisabled && "disabled:bg-primaryDisabled"}`

      case "primary-outlined":
        return `text-gray-primary rounded-md border border-primary bg-white text-primary ${
          !isDisabled && "hover:bg-gray-100 transition ease-in-out delay-75"
        } ${
          isDisabled && "disabled:border-primaryDisabled text-primaryDisabled"
        }`

      case "secondary-solid":
        return `border border-transparent bg-red-500 text-white ${
          !isDisabled && "hover:bg-red-700 transition ease-in-out delay-75"
        } ${isDisabled && "disabled:bg-red-200"}`
    }
  }
  return (
    <button
      ref={btnRef}
      className={`${getCommonClasses()} ${getButtonVariant()} ${className}`}
      title={restProps?.title}
      data-cy={restProps?.datacy}
      tabIndex={restProps?.tabIndex}
      disabled={isDisabled}
      onClick={onClick}
      {...restProps}
    >
      {buttonText}
    </button>
  )
}
export default Button
