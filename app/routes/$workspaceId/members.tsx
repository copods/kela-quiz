import { getUserId, requireWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  deleteUserById,
  getAllRoles,
  getAllUsers,
  getAllUsersCount,
  getUserById,
} from '~/models/user.server'
import { routes } from '~/constants/route.constants'
import {
  getCurrentWorkspaceOwner,
  getUserWorkspaces,
} from '~/models/workspace.server'
import { actions } from '~/constants/action.constants'
import {
  getAllInvitedMember,
  getAllInvitedMemberCount,
  inviteNewUser,
  reinviteMemberForWorkspace,
} from '~/models/invites.server'
import MembersWrapper from '~/components/members/MembersWrapper'

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
  currentWorkspaceId: string
  invitedMembers: Awaited<ReturnType<typeof getAllInvitedMember>>
  getUser: Awaited<ReturnType<typeof getUserById>>
  membersCurrentPage: number
  membersItemsPerPage: number
  invitedMembersItemsPerPage: number
  invitedMembersCurrentPage: number
  allUsersCount: number
  invitedUsersCount: number
  currentWorkspaceOwner: { createdById: string } | null
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const query = new URL(request.url).searchParams
  const membersItemsPerPage = Math.max(Number(query.get('MemberItems') || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const membersCurrentPage = Math.max(Number(query.get('MemberPage') || 1), 1)
  const invitedMembersCurrentPage = Math.max(
    Number(query.get('InvitedMemberPage') || 1),
    1
  )
  const invitedMembersItemsPerPage = Math.max(
    Number(query.get('InvitedMemberItems') || 5),
    5
  )
  const userId = await getUserId(request)
  const getUser = await getUserById(userId as string)
  const currentWorkspaceId = params.workspaceId as string
  const currentWorkspaceOwner = await getCurrentWorkspaceOwner(
    currentWorkspaceId
  )
  const invitedMembers = await getAllInvitedMember(
    currentWorkspaceId as string,
    invitedMembersCurrentPage,
    invitedMembersItemsPerPage
  )
  const workspaces = await getUserWorkspaces(userId as string)
  const roles = await getAllRoles()
  if (!userId) return redirect(routes.signIn)
  const users = await getAllUsers({
    currentWorkspaceId,
    membersCurrentPage,
    membersItemsPerPage,
  })

  const allUsersCount = await getAllUsersCount(currentWorkspaceId)
  const invitedUsersCount = await getAllInvitedMemberCount(currentWorkspaceId)
  return json<LoaderData>({
    users,
    roles,
    userId,
    workspaces,
    currentWorkspaceId,
    invitedMembers,
    getUser,
    membersCurrentPage,
    membersItemsPerPage,
    invitedMembersCurrentPage,
    invitedMembersItemsPerPage,
    allUsersCount,
    invitedUsersCount,
    currentWorkspaceOwner,
  })
}

export const action: ActionFunction = async ({ request, params }) => {
  const invitedByWorkspaceId = await requireWorkspaceId(request)
  const userId = await getUserId(request)
  const getUser = await getUserById(userId as string)
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
    if (email === getUser?.email) {
      return json<ActionData>(
        { errors: { title: 'statusCheck.notInviteYourself', status: 400 } },
        { status: 400 }
      )
    }

    let addHandle = null

    await inviteNewUser({
      email,
      roleId,
      invitedByWorkspaceId,
      userId,
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
        let title = 'statusCheck.sendGridError'
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

  if (action === actions.resendMember) {
    const id = formData.get('id')
    let resendMember = null
    await reinviteMemberForWorkspace({
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
        let title = 'statusCheck.sendGridError'
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
    await deleteUserById(
      formData.get('id') as string,
      params.workspaceId as string
    )
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
  return <MembersWrapper />
}

export default Members
