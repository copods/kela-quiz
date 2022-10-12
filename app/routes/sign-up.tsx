import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { createNewUser, getAdminId } from '~/models/user.server'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import SignUp from '~/components/login/SignUp'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
type LoaderData = {
  roleId: Awaited<ReturnType<typeof getAdminId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const roleId = await getAdminId()
  return json<LoaderData>({ roleId })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = JSON.parse(formData.get('addMember') as string)

  if (action.action === 'add') {
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const roleId = formData.get('roleId')
    // eslint-disable-next-line no-useless-escape
    const emailFilter = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (typeof firstName !== 'string' || firstName.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.firstNameRequired', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof lastName !== 'string' || lastName.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.lastNameRequired', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof email !== 'string' || email.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.emailRequired', status: 400 } },
        { status: 400 }
      )
    }
    if (!emailFilter.test(email)) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.correctEmail', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof roleId !== 'string' || roleId.length === 0) {
      return json<ActionData>(
        { errors: { title: 'toastConstants.roleRequired', status: 400 } },
        { status: 400 }
      )
    }
    let addHandle = null
    await createNewUser({ firstName, lastName, email, roleId })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.signUpSuccessfull',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'statusCheck.commonError'
        if (err.code === 'P2002') {
          title = 'toastConstants.memberAlreadyExist'
        }
        addHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return addHandle
  }
}
const SignUpPage = () => {
  const { t } = useTranslation()
  const signUpActionData = useActionData() as ActionData
  const role = useLoaderData()
  let navigate = useNavigate()
  useEffect(() => {
    if (signUpActionData) {
      if (signUpActionData.resp?.status === 200) {
        navigate(routes.signIn)
        toast.success(t(signUpActionData.resp?.title))
      } else if (signUpActionData.errors?.status === 400) {
        toast.error(t(signUpActionData.errors?.title), {
          toastId: signUpActionData.errors?.title,
        })
      }
    }
  }, [signUpActionData, navigate, t])

  return (
    <div className="flex h-full flex-col justify-center">
      <SignUp roleId={role.roleId} />
    </div>
  )
}
export default SignUpPage
