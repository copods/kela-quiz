import UserForgetPassword from '~/components/login/UserForgetPassword'
import type { ActionFunction } from '@remix-run/node'
import { sendResetPassword } from '~/models/user.server'
import { useEffect, useState } from 'react'
import { useActionData, useNavigate } from '@remix-run/react'
import { toast } from 'react-toastify'
import { statusCheck } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'

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
  const [checkErrorStatus, setCheckErrorStatus] = useState(false)
  const action = useActionData() as string
  useEffect(() => {
    if (action === null) {
      setCheckErrorStatus(true)
    }
    if (action === 'Done') {
      toast.success(statusCheck.resendPasswordSuccess)
      navigate(routes.signIn)
    }
  }, [action, navigate])
  return (
    <div className="flex h-full flex-col">
      <UserForgetPassword checkErrorStatus={checkErrorStatus} />
    </div>
  )
}
export default ForgetPassword
