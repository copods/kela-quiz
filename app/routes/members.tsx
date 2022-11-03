import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId, getWorkspaceId, requireWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import MembersList from '~/components/members/MembersList'
import { json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import {
  inviteNewUser,
  deleteUserById,
  getAllRoles,
  getAllUsers,
  reinviteMember,
  getAllInvitedMember,
  deleteInviteMember,
  reInvitationMember,
} from '~/models/user.server'
import MembersHeader from '~/components/members/MembersHeader'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'
import { actions } from '~/constants/action.constants'
import InvitedMembersList from '~/components/members/InvitedMemberList'

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
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: Awaited<ReturnType<typeof getWorkspaceId>>
  invitedMembers: Awaited<ReturnType<typeof getAllInvitedMember>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const invitedMembers = await getAllInvitedMember()
  const currentWorkspaceId = await getWorkspaceId(request)
  const workspaces = await getUserWorkspaces(userId as string)
  const roles = await getAllRoles()
  if (!userId) return redirect(routes.signIn)
  const users = await getAllUsers({ currentWorkspaceId })
  return json<LoaderData>({
    users,
    roles,
    userId,
    workspaces,
    currentWorkspaceId,
    invitedMembers,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const invitedByWorkspaceId = await requireWorkspaceId(request)
  const formData = await request.formData()
  const action = await formData.get('action')

  if (action === actions.inviteMember) {
    const email = formData.get('email')
    const roleId = formData.get('roleId')
    // eslint-disable-next-line no-useless-escape
    const emailFilter = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

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

    await inviteNewUser({
      email,
      roleId,
      invitedByWorkspaceId,
    })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.invitationSent',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'statusCheck.commonError'
        if (err.code === 'P2002') {
          title = 'toastConstants.memberAlreadyInvited'
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
  if (action === actions.resendInviteMember) {
    const id = formData.get('id')
    let resendHandle = null
    await reinviteMember({
      id: id as string,
    })
      .then(() => {
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
      .catch((err) => {
        let title = 'statusCheck.commonError'
        resendHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return resendHandle
  }
  if (action === actions.resendMember) {
    const id = formData.get('id')
    let resendMember = null
    await reInvitationMember({
      id: id as string,
    })
      .then(() => {
        resendMember = json<ActionData>(
          {
            resp: {
              title: 'toastConstants.invitationSent',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'statusCheck.commonError'
        resendMember = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })
    return resendMember
  }
  if (action === actions.deleteMember) {
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
  if (action === actions.deleteInviteMember) {
    if (typeof formData.get('id') !== 'string') {
      return json<ActionData>(
        { errors: { title: 'statusCheck.descIsReq', status: 400 } },
        { status: 400 }
      )
    }
    let deleteHandle = null
    await deleteInviteMember(formData.get('id') as string)
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
  return null
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
        <div className="flex flex-col gap-4 text-2xl">
          <h1>{t('members.joinedMembers')}</h1>
          <MembersList actionStatus={membersActionData?.resp?.title} />
        </div>
        <div className="flex flex-col gap-4 text-2xl">
          <h1>{t('members.invitedMember')}</h1>
          <InvitedMembersList actionStatus={membersActionData?.resp?.title} />
        </div>
      </div>
    </AdminLayout>
  )
}

export default Members
