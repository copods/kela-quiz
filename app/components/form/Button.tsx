import type { ButtonProps } from '~/interface/Interface'

const Button = ({ buttonText, className, onClick, ...props }: ButtonProps) => {

  const getCommonClasses = () => {
    return 'py-2.5 rounded-md items-center inline-flex justify-center shadow-sm text-xs font-medium'
  }

  const getPrimarySolidClasses = () => {
    return 'bg-primary text-gray-50'
  }

  const getPrimaryOutlinedClasses = () => {
    return 'text-gray-primary rounded-md border border-primary bg-white text-primary'
  }

  const getSecondarySolidClasses = () => {
    return 'border border-transparent bg-red-600 text-white'
  }

  return (
    <button
    className= {
      `${getCommonClasses()} 
      ${props.varient === 'primary-solid' && getPrimarySolidClasses()} 
      ${props.varient === 'primary-outlined' && getPrimaryOutlinedClasses()} 
      ${props.varient === 'secondary-solid' && getSecondarySolidClasses()} 
      ${className} 
      ${props?.isDisabled && 'disabled:opacity-50'} `      
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
