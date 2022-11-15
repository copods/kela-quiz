import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useSearchParams } from '@remix-run/react'

import { createUserSession, getUserId } from '~/session.server'
import { loginVerificationResponse } from '~/models/user.server'
import { safeRedirect, validateEmail } from '~/utils'
import type { ActionData } from '~/interface/Interface'
import Login from '~/components/login/Login'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect(routes.members)

  const inviteId = new URL(request.url).searchParams.get('id')

  return json({ inviteId })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const invitedId = formData.get('inviteId')
  const redirectTo = safeRedirect(
    formData.get('redirectTo'),
    invitedId != null ? `/workspace/${invitedId}/join` : routes.members
  )
  const remember = formData.get('remember')
  const email = formData.get('email')
  const password = formData.get('password')
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'statusCheck.emailIsInvalid' } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json<ActionData>(
      { errors: { password: 'statusCheck.passIsReq' } },
      { status: 400 }
    )
  }

  const user = await loginVerificationResponse(email, password)
  if (!user) {
    return json<ActionData>(
      { errors: { email: 'statusCheck.emailIsInvalid' } },
      { status: 400 }
    )
  }

  if (user instanceof Error) {
    return json<ActionData>(
      { errors: { password: 'statusCheck.passIsInvalid' } },
      { status: 400 }
    )
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on' ? true : false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  }
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || routes.members
  const actionData = useActionData() as ActionData
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50">
      <Login actionData={actionData} redirectTo={redirectTo} />
    </div>
  )
}
