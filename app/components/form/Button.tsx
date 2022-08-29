import type { ButtonProps } from '~/interface/Interface'

const Button = ({ buttonText, className, onClick, ...props }: ButtonProps) => {

  const getCommonClasses = () => {
    return 'py-2.5 rounded-md items-center inline-flex justify-center shadow-sm text-xs font-medium'
  }

  const getButtonVarient = () => {
    switch(props.varient) {
      case 'primary-solid':
        return `bg-primary text-gray-50 hover:bg-primaryHover ${props.isDisabled && 'disabled:bg-primaryDisabled'}`

      case 'primary-outlined':
        return `text-gray-primary rounded-md border border-primary bg-white text-primary hover:border-primaryOutlined ${props.isDisabled && 'disabled:border-primaryOutlinedDisabled text-primaryOutlinedDisabled'}`

      case 'secondary-solid': 
        return `border border-transparent bg-red-600 text-white hover:bg-deleteColorHover ${props.isDisabled && 'disabled:bg-deleteColorDisabled'}`
    }
  }

  return (
    <button
    className= {
      `${getCommonClasses()} ${getButtonVarient()} ${className}`      
    }
      disabled={props?.isDisabled}
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  )
}
export default Button
