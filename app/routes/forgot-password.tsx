import UserForgetPassword from '~/components/login/UserForgetPassword'
import { ActionFunction } from '@remix-run/node'
import { sendResetPassword } from '~/models/user.server'
import { useEffect } from 'react'
import { useActionData, useNavigate } from '@remix-run/react'
import { toast } from 'react-toastify'
import { statusCheck } from '~/constants/common.constants'

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const email = formData.get('email') as string
  let sendResetPasswordResponse = null
  if (email) {
    sendResetPasswordResponse = await sendResetPassword(email as string)
  }
  return sendResetPasswordResponse
}

const ForgetPassword = () => {
  let navigate = useNavigate()
  const action = useActionData() as string
  useEffect(() => {
    if (action === null) {
      toast.error(statusCheck.resendPasswordSuccess)
      navigate('/sign-in')
    }
    if (action === 'Done') {
      toast.success(statusCheck.resendPasswordError)
      navigate('/sign-in')
    }
  }, [action, navigate])
  return (
    <div className="flex h-full flex-col">
      <UserForgetPassword />
    </div>
  )
}
export default ForgetPassword
