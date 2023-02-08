import { json } from '@remix-run/node'
import {
  inviteNewUser,
  reinviteMemberForWorkspace,
} from '~/models/invites.server'
import type { getAllInvitedMember } from '~/models/invites.server'
import type { getALLRoles, getALLUsers } from '~/services/user.service'
import { deleteUserByID, getUserByID } from '~/services/user.service'
import type { getUserWorkspaces } from '~/models/workspace.server'
import type { getUserId } from '~/session.server'

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
export type LoaderData = {
  users: Awaited<ReturnType<typeof getALLUsers>>
  userId: Awaited<ReturnType<typeof getUserId>>
  roles: Awaited<ReturnType<typeof getALLRoles>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
  invitedMembers: Awaited<ReturnType<typeof getAllInvitedMember>>
  getUser: Awaited<ReturnType<typeof getUserByID>>
  membersCurrentPage: number
  membersItemsPerPage: number
  invitedMembersItemsPerPage: number
  invitedMembersCurrentPage: number
  allUsersCount: number
  invitedUsersCount: number
  currentWorkspaceOwner: { createdById: string } | null
}
export const inviteNewMember = async (
  email: string,
  roleId: string,
  invitedByWorkspaceId: string,
  userId: string
) => {
  const getUser = await getUserByID(userId)
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
  if (email === getUser?.email) {
    return json<ActionData>(
      { errors: { title: 'statusCheck.notInviteYourself', status: 400 } },
      { status: 400 }
    )
  }
  const addHandle = inviteNewUser({
    email,
    roleId,
    invitedByWorkspaceId,
    userId,
  })
    .then((res) => {
      return json<ActionData>(
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
      return json<ActionData>(
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

export const reinviteMember = async (id: string) => {
  const resendMember = reinviteMemberForWorkspace({
    id,
  })
    .then(() => {
      return json<ActionData>(
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
      return json<ActionData>(
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

export const deleteMemberById = async (
  id: string,
  workspaceId: string,
  email: string
) => {
  const deleteHandle = deleteUserByID(id, workspaceId, email)

  return deleteHandle
}
