import UserForgetPassword from '~/components/login/UserForgetPassword'
import type { ActionFunction } from '@remix-run/node'
import { sendResetPassword } from '~/models/user.server'
import { useEffect, useState } from 'react'
import { useActionData, useNavigate } from '@remix-run/react'
import { toast } from 'react-toastify'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  let navigate = useNavigate()
  const [checkErrorStatus, setCheckErrorStatus] = useState(false)
  const action = useActionData()
  useEffect(() => {
    if (action?.value === null) {
      setCheckErrorStatus(true)
    }
    if (action === 'Done') {
      toast.success(t('statusCheck.resendPasswordSuccess'))
      navigate(routes.signIn)
    }
  }, [action, navigate, t, action?.time])
  return (
    <div className="flex h-full flex-col">
      <UserForgetPassword
        setCheckErrorStatus={setCheckErrorStatus}
        checkErrorStatus={checkErrorStatus}
      />
    </div>
  )
}
export default ForgetPassword
