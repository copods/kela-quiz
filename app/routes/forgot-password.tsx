import UserForgetPassword from '~/components/login/UserForgetPassword'
import type { ActionFunction } from '@remix-run/node'
import { sendResetPassword, getUserByEmail } from '~/models/user.server'
import { useEffect, useState } from 'react'
import { useActionData, useNavigate } from '@remix-run/react'
import { toast } from 'react-toastify'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { json } from '@remix-run/node'

export type ActionData = {
  errors?: {
    title: string
    status: number
    emailNotFound?: boolean
  }
  resp?: {
    title: string
    status: number
  }
}

const errResponse = (emailNotFound: boolean) => {
  let title = 'statusCheck.sendGridError'
  let errRes = json<ActionData>(
    {
      errors: {
        title,
        status: 400,
        emailNotFound: emailNotFound,
      },
    },
    { status: 400 }
  )

  return errRes
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const email = formData.get('email') as string
  let sendResetPasswordResponse = null
  try {
    const userFound = await getUserByEmail(email)

    if (!userFound) {
      return errResponse(true)
    }

    sendResetPasswordResponse = await sendResetPassword(email as string)
    if (email && sendResetPasswordResponse) {
      return json<ActionData>(
        {
          resp: {
            title: 'statusCheck.resendPasswordSuccess',
            status: 200,
          },
        },
        { status: 200 }
      )
    }
    return sendResetPasswordResponse
  } catch (err) {
    return errResponse(false)
  }
}

const ForgetPassword = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  const [checkErrorStatus, setCheckErrorStatus] = useState(false)
  const action = useActionData()
  useEffect(() => {
    if (action?.resp?.status === 200) {
      toast.success(t(action?.resp?.title))
      navigate(routes.signIn)
    } else if (action?.errors?.status === 400) {
      action?.errors?.emailNotFound && setCheckErrorStatus(true)
      toast.error(t(action?.errors?.title), {
        toastId: action?.errors?.title,
      })
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
