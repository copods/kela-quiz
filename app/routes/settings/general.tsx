import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import {
  checkOldPasswordFromdb,
  getAllRoles,
  getAllUsers,
  updatePassword,
} from '~/models/user.server'
import { routes } from '~/constants/route.constants'
import { getUserId } from '~/session.server'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import GeneralSettings from '~/components/settings/GeneralSettings'
export type ActionData = {
  errors?: {
    status?: number
    valid?: string
    passNotMatched?: string
    maximumPasswordLimit?: string
  }
  resp?: {
    title: string
    status: number
  }
}

type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>
  userId: Awaited<ReturnType<typeof getUserId>>
  roles: Awaited<ReturnType<typeof getAllRoles>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const roles = await getAllRoles()
  if (!userId) return redirect(routes.signIn)
  const users = await getAllUsers()
  return json<LoaderData>({ users, roles, userId })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = formData.get('resetPassword') as string
  if (action === 'add') {
    const userId = await getUserId(request)
    const oldPassword = formData.get('Old Password')
    const newPassword = formData.get('New Password')
    const confirmPasword = formData.get('Confirm New Password')
    let addHandle = null

    const checkOldPassword = await checkOldPasswordFromdb(
      oldPassword as string,
      userId as string
    )
    if (checkOldPassword === false) {
      return json<ActionData>(
        {
          errors: {
            valid: 'statusCheck.passIsInvalid',
            status: 400,
          },
        },
        { status: 400 }
      )
    }

    if (confirmPasword !== newPassword) {
      return json<ActionData>(
        {
          errors: {
            passNotMatched: 'settings.passNotMatch',
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (typeof newPassword !== 'string' || newPassword.length >= 8) {
      return json<ActionData>(
        {
          errors: {
            maximumPasswordLimit: 'settings.maximumPasswordLimit',
            status: 400,
          },
        },
        { status: 400 }
      )
    }

    if (checkOldPassword === true) {
      if (newPassword === confirmPasword) {
        await updatePassword(userId as string, newPassword as string)
          .then((res) => {
            addHandle = json<ActionData>(
              {
                resp: {
                  title: 'password changed successfully !',
                  status: 200,
                },
              },
              { status: 200 }
            )
          })
          .catch((err) => {
            let valid = 'validationError'
            let passNotMatched = 'passwordNotMatchError'
            let maximumPasswordLimit = 'maximumPasswordLimit'

            addHandle = json<ActionData>(
              {
                errors: {
                  valid,
                  passNotMatched,
                  maximumPasswordLimit,
                  status: 400,
                },
              },
              { status: 400 }
            )
          })
      }
    }
    return addHandle
  }
}
const GeneralSetting = () => {
  return (
    <div>
      <GeneralSettings />
    </div>
  )
}
export default GeneralSetting
