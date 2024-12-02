import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"

import MembersWrapper from "~/components/members/MembersWrapper"
import { actions } from "~/constants/action.constants"
import { routes } from "~/constants/route.constants"
import type { User } from "~/interface/Interface"
import { checkUserFeatureAuthorization } from "~/models/authorization.server"
import {
  getALLRoles,
  getALLUsers,
  getALLUsersCount,
  getUserByID,
  getALLInvitedMember,
  getALLInvitedMemberCount,
  reinviteMember,
  deleteUserByID,
  inviteNEWUser,
  editUserRole,
} from "~/services/members.service"
import {
  getActiveWorkspaceOwner,
  getUserWorkspaceService,
} from "~/services/workspace.service"
import { getUserId, requireWorkspaceId } from "~/session.server"

type ActionData = {
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
  users: Awaited<ReturnType<typeof getALLUsers>>
  userId: Awaited<ReturnType<typeof getUserId>>
  roles: Awaited<ReturnType<typeof getALLRoles>>
  workspaces: Awaited<ReturnType<typeof getUserWorkspaceService>>
  currentWorkspaceId: string
  invitedMembers: Awaited<ReturnType<typeof getALLInvitedMember>>
  getUser: Awaited<ReturnType<typeof getUserByID>>
  membersCurrentPage: number
  membersItemsPerPage: number
  invitedMembersItemsPerPage: number
  invitedMembersCurrentPage: number
  allUsersCount: number
  invitedUsersCount: number
  currentWorkspaceOwner: { ownerId: string } | null
  permission: { [key: string]: { [key: string]: boolean } }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string

  const permission = await checkUserFeatureAuthorization(
    userId!,
    currentWorkspaceId
  )
  if (!permission.member.read) {
    return redirect(routes.unauthorized)
  }

  const query = new URL(request.url).searchParams
  const membersItemsPerPage = Math.max(
    Number(query.get("MemberItems") || 10),
    10
  ) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
  const membersCurrentPage = Math.max(Number(query.get("MemberPage") || 1), 1)
  const invitedMembersCurrentPage = Math.max(
    Number(query.get("InvitedMemberPage") || 1),
    1
  )
  const invitedMembersItemsPerPage = Math.max(
    Number(query.get("InvitedMemberItems") || 5),
    5
  )
  const getUser = await getUserByID(userId as string)
  const currentWorkspaceOwner = await getActiveWorkspaceOwner(
    currentWorkspaceId
  )
  try {
    const invitedMembers = await getALLInvitedMember(
      currentWorkspaceId as string,
      invitedMembersCurrentPage,
      invitedMembersItemsPerPage,
      userId!
    )
    const workspaces = await getUserWorkspaceService(userId as string)
    const roles = await getALLRoles()
    if (!userId) return redirect(routes.signIn)
    const users = await getALLUsers({
      currentWorkspaceId,
      membersCurrentPage,
      membersItemsPerPage,
    })

    const allUsersCount = await getALLUsersCount(currentWorkspaceId)
    const invitedUsersCount = await getALLInvitedMemberCount(currentWorkspaceId)
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
      permission,
    })
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const invitedByWorkspaceId = await requireWorkspaceId(request)
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const formData = await request.formData()
  const action = await formData.get("action")
  try {
    if (action === actions.inviteMember) {
      const email = formData.get("email")
      const roleId = formData.get("roleId")

      const getUser = await getUserByID(userId as string)
      // eslint-disable-next-line no-useless-escape
      const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (typeof email !== "string" || email.length === 0) {
        return json<ActionData>(
          { errors: { title: "commonConstants.emailRequired", status: 400 } },
          { status: 400 }
        )
      }
      if (!EMAIL_REGEX.test(email)) {
        return json<ActionData>(
          { errors: { title: "toastConstants.correctEmail", status: 400 } },
          { status: 400 }
        )
      }
      if (typeof roleId !== "string" || roleId.length === 0) {
        return json<ActionData>(
          { errors: { title: "toastConstants.roleRequired", status: 400 } },
          { status: 400 }
        )
      }
      if (email === getUser?.email) {
        return json<ActionData>(
          { errors: { title: "statusCheck.notInviteYourself", status: 400 } },
          { status: 400 }
        )
      }
      return await inviteNEWUser({
        email,
        roleId,
        invitedByWorkspaceId,
        userId,
        workspaceId: currentWorkspaceId,
      })
    }
    if (action === actions.resendMember) {
      const response = await reinviteMember({
        id: formData.get("id") as string,
        userId,
        workspaceId: currentWorkspaceId,
      })
      return response
    }
    if (action === actions.deleteMember) {
      const { email } = (await getUserByID(
        formData.get("id") as string
      )) as User

      const response = await deleteUserByID(
        formData.get("id") as string,
        currentWorkspaceId,
        email,
        userId!
      )
      return response
    }
    if (action === actions.updateRole) {
      return await editUserRole(
        userId as string,
        formData.get("memberId") as string,
        invitedByWorkspaceId,
        formData.get("roleId") as string
      )
    }
  } catch (error: any) {
    if (error.status === 403) {
      return redirect(routes.unauthorized)
    }
  }

  return null
}
const Members = () => {
  return <MembersWrapper />
}

export default Members
