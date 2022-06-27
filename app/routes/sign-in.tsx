import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useSearchParams } from '@remix-run/react'

import { createUserSession, getUserId } from '~/session.server'
import { verifyLogin } from '~/models/user.server'
import { safeRedirect, validateEmail } from '~/utils'
import type { ActionData } from '~/components/Interface'
import Login from '~/components/login/Login'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/sign-in')
  return json({})
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')
  const remember = formData.get('remember')

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: 'Email is invalid' } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json<ActionData>(
      { errors: { password: 'Password is required' } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: 'Password is too short' } },
      { status: 400 }
    )
  }

  const user = await verifyLogin(email, password)
  if (!user) {
    return json<ActionData>(
      { errors: { email: 'Invalid email or password' } },
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
  const redirectTo = searchParams.get('redirectTo') || '/admin'
  const actionData = useActionData() as ActionData
  // const emailRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (actionData?.errors?.email) {
  //     emailRef.current?.focus();
  //   } else if (actionData?.errors?.password) {
  //     passwordRef.current?.focus();
  //   }
  // }, [actionData]);
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50">
      <Login actionData={actionData} redirectTo={redirectTo} />
    </div>
  )
}
