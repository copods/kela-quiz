import AdminLayout from '~/components/layouts/AdminLayout'
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
import SettingsTabs from '~/components/settings/SettingTab'
import { useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

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
  const userId = await getUserId(request)
  const oldPassword = formData.get('Old Password')
  const newPassword = formData.get('New Password')
  const confirmPasword = formData.get('Confirm New Password')
  let addHandle = null

  const checkOldPassword = await checkOldPasswordFromdb(oldPassword, userId)
  if (checkOldPassword === false) {
    return json<ActionData>(
      { errors: { title: 'settings.enterValidPass', status: 400 } },
      { status: 400 }
    )
  }
  if (typeof newPassword !== 'string' || newPassword.length === 0) {
    return json<ActionData>(
      { errors: { title: 'settings.enterNewPass', status: 400 } },
      { status: 400 }
    )
  }
  if (typeof confirmPasword !== 'string' || confirmPasword.length === 0) {
    return json<ActionData>(
      { errors: { title: 'settings.enterConfPass', status: 400 } },
      { status: 400 }
    )
  }
  if (confirmPasword !== newPassword || confirmPasword.length === 0) {
    return json<ActionData>(
      { errors: { title: 'settings.passNotMatch', status: 400 } },
      { status: 400 }
    )
  }
  if (checkOldPassword === true) {
    if (newPassword === confirmPasword) {
      await updatePassword(userId as string, newPassword)
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
          let title = 'error'

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
    }
  }
  return addHandle
}
export default function Settings() {
  const { t } = useTranslation()
  const resetPassActionData = useActionData() as ActionData
  const [actionStatus, setActionStatus] = useState<boolean>(false)
  useEffect(() => {
    if (resetPassActionData) {
      if (resetPassActionData.resp?.status === 200) {
        setActionStatus(true)
        toast.success(t(resetPassActionData.resp?.title))
      } else if (resetPassActionData.errors?.status === 400) {
        setActionStatus(false)
      }
    }
  }, [resetPassActionData, t])

  return (
    <AdminLayout>
      <div>
        <SettingsTabs
          error={resetPassActionData?.errors?.title}
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
      </div>
    </AdminLayout>
  )
}
