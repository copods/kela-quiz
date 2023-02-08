import { getUserId, requireWorkspaceId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
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
} from '~/models/invites.server'
import MembersWrapper from '~/components/members/MembersWrapper'
import type { LoaderData } from 'helper/members.helper'
import {
  deleteMemberById,
  inviteNewMember,
  reinviteMember,
} from 'helper/members.helper'
import type { User } from '~/interface/Interface'

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
  const formData = await request.formData()
  const action = await formData.get('action')
  if (action === actions.inviteMember) {
    const email = formData.get('email')
    const roleId = formData.get('roleId')
    // eslint-disable-next-line no-useless-escape
    const response = await inviteNewMember(
      email as string,
      roleId as string,
      invitedByWorkspaceId as string,
      userId as string
    )
    return response
  }

  if (action === actions.resendMember) {
    const response = await reinviteMember(formData.get('id') as string)
    return response
  }
  if (action === actions.deleteMember) {
    const { email } = (await getUserById(formData.get('id') as string)) as User

    const response = await deleteMemberById(
      formData.get('id') as string,
      params.workspaceId as string,
      email
    )
    return response
  }

  return null
}
const Members = () => {
  return <MembersWrapper />
}

export default Members
