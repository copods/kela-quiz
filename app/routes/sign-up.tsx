import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { createNewUser, getAllRoles } from '~/models/user.server'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { statusCheck, toastConstants } from '~/constants/common.constants'
import SignUp from '~/components/login/SignUp'
import { routes } from '~/constants/route.constants'

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
  roles: Awaited<ReturnType<typeof getAllRoles>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const roles = await getAllRoles()
  return json<LoaderData>({ roles })
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
        { errors: { title: toastConstants.firstNameRequired, status: 400 } },
        { status: 400 }
      )
    }
    if (typeof lastName !== 'string' || lastName.length === 0) {
      return json<ActionData>(
        { errors: { title: toastConstants.lastNameRequired, status: 400 } },
        { status: 400 }
      )
    }
    if (typeof email !== 'string' || email.length === 0) {
      return json<ActionData>(
        { errors: { title: toastConstants.emailRequired, status: 400 } },
        { status: 400 }
      )
    }
    if (!emailFilter.test(email)) {
      return json<ActionData>(
        { errors: { title: toastConstants.correctEmail, status: 400 } },
        { status: 400 }
      )
    }
    if (typeof roleId !== 'string' || roleId.length === 0) {
      return json<ActionData>(
        { errors: { title: toastConstants.roleRequired, status: 400 } },
        { status: 400 }
      )
    }

    let addHandle = null

    await createNewUser({ firstName, lastName, email, roleId })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: toastConstants.signUpSuccessfull,
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = statusCheck.commonError
        if (err.code === 'P2002') {
          title = toastConstants.memberAlreadyExist
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
  const signUpActionData = useActionData() as ActionData
  const signUpData = useLoaderData()

  let navigate = useNavigate()
  useEffect(() => {
    if (signUpActionData) {
      if (signUpActionData.resp?.status === 200) {
        navigate(routes.signIn)
        toast.success(signUpActionData.resp?.title)
      } else if (signUpActionData.errors?.status === 400) {
        toast.error(signUpActionData.errors?.title, {
          toastId: signUpActionData.errors?.title,
        })
      }
    }
  }, [signUpActionData, navigate])

  return (
    <div className="flex h-full flex-col justify-center">
      <SignUp roles={signUpData.roles} />
    </div>
  )
}
export default SignUpPage
