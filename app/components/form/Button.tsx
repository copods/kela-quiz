import type { ButtonProps } from '~/interface/Interface'

const Button = ({ buttonText , className, onClick, ...props }: ButtonProps) => {

  const getCommonClasses = () => {
    return `py-2.5 px-5 rounded-md items-center inline-flex shadow-sm text-xs font-medium ${
      props.alignment ? props.alignment : 'justify-center'
    }`
  }
  const getButtonVarient = () => {
    switch (props.varient) {
      case 'primary-solid':
        return `bg-primary text-gray-50 hover:bg-primaryHover transition ease-in-out delay-75 ${
          props.isDisabled && 'disabled:bg-primaryDisabled'
        }`
      case 'primary-outlined':
        return `text-gray-primary  rounded-md border border-primary bg-white text-primary hover:bg-gray-100 transition ease-in-out delay-75 ${
          props.isDisabled &&
          'disabled:border-primaryDisabled text-primaryDisabled'
        }`
      case 'secondary-solid':
        return `border border-transparent bg-red-500 text-white hover:bg-red-700 transition ease-in-out delay-75 ${
          props.isDisabled && 'disabled:bg-red-200'
        }`
    }
  }
  return (
    <button
      className= {
      `${getCommonClasses()} ${getButtonVarient()} ${className}`      
      }
      title={props?.title}
      data-cy={props?.datacy}
      tabIndex={props?.tabIndex}
      disabled={props?.isDisabled}
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  )
}
export default Button
