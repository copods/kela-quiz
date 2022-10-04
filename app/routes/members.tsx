import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import MembersList from '~/components/members/MembersList'
import { json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import {
  createNewUser,
  deleteUserById,
  getAllRoles,
  getAllUsers,
  resendInvitation,
} from '~/models/user.server'
import MembersHeader from '~/components/members/MembersHeader'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
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
  const action = JSON.parse(formData.get('addMember') as string)
    ? JSON.parse(formData.get('addMember') as string)
    : formData.get('deleteMember')
  console.log(formData)

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
              title: 'toastConstants.memberAdded',
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
  if (action.action === 'resend') {
    const id = formData.get('id')
    const firstName = formData.get('firstName')
    const email = formData.get('email')
    const role = formData.get('roleId')
    let resendHandle = null
    await resendInvitation({
      id: id as string,
      firstName: firstName as string,
      email: email as string,
      role: role as string,
    }).then((res) => {
      resendHandle = json<ActionData>(
        {
          resp: {
            title: 'toastConstants.invitationSent',
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    return resendHandle
  }
  if (action === 'delete') {
    if (typeof formData.get('id') !== 'string') {
      return json<ActionData>(
        { errors: { title: 'statusCheck.descIsReq', status: 400 } },
        { status: 400 }
      )
    }
    let deleteHandle = null
    await deleteUserById(formData.get('id') as string)
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { title: 'statusCheck.deletedSuccess', status: 200 } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return deleteHandle
  }
}
const Members = () => {
  const { t } = useTranslation()
  const membersActionData = useActionData() as ActionData
  const [actionStatus, setActionStatus] = useState<boolean>(false)
  useEffect(() => {
    if (membersActionData) {
      if (membersActionData.resp?.status === 200) {
        setActionStatus(true)
        toast.success(t(membersActionData.resp?.title))
      } else if (membersActionData.errors?.status === 400) {
        setActionStatus(false)
        toast.error(t(membersActionData.errors?.title), {
          toastId: membersActionData.errors?.title,
        })
      }
    }
  }, [membersActionData, t])

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-1">
        <MembersHeader
          actionStatus={actionStatus}
          setActionStatus={setActionStatus}
        />
        <MembersList actionStatus={membersActionData?.resp?.title} />
      </div>
    </AdminLayout>
  )
}

export default Members
