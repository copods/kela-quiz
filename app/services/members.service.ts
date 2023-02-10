import { json } from "@remix-run/node"

import {
  getAllInvitedMember,
  getAllInvitedMemberCount,
  inviteNewUser,
  reinviteMemberForWorkspace,
} from "~/models/invites.server"
import {
  deleteUserById,
  getAllRoles,
  getAllUsers,
  getAllUsersCount,
  getUserById,
} from "~/models/user.server"

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

/**
 * Function to get all roles
 * @returns Role[]
 */
export async function getALLRoles() {
  return await getAllRoles()
}

/**
 * Function to get all users
 * @param currentWorkspaceId
 * @param membersCurrentPage
 * @param membersItemsPerPage
 * @returns user[]
 */
export async function getALLUsers({
  currentWorkspaceId,
  membersCurrentPage,
  membersItemsPerPage,
}: {
  currentWorkspaceId: string
  membersCurrentPage: number
  membersItemsPerPage: number
}) {
  return await getAllUsers({
    currentWorkspaceId,
    membersCurrentPage,
    membersItemsPerPage,
  })
}

/**
 * Function to get all users count
 * @param currentWorkspaceId
 * @returns user count in number
 */
export async function getALLUsersCount(currentWorkspaceId: string) {
  return await getAllUsersCount(currentWorkspaceId)
}

/**
 * Function to get specific user
 * @param userId
 * @returns User[]
 */
export async function getUserByID(userId: string) {
  return await getUserById(userId)
}

/**
 * Function to get all invited members
 * @param currentWorkspaceId
 * @param invitedMembersCurrentPage
 * @param invitedMembersItemsPerPage
 * @returns Invites[]
 */
export async function getALLInvitedMember(
  currentWorkspaceId: string,
  invitedMembersCurrentPage: number,
  invitedMembersItemsPerPage: number
) {
  return await getAllInvitedMember(
    currentWorkspaceId,
    invitedMembersCurrentPage,
    invitedMembersItemsPerPage
  )
}

/**
 * Function to get invited members count
 * @param currentWorkspaceId
 * @returns invited member count in number
 */
export async function getALLInvitedMemberCount(currentWorkspaceId: string) {
  return await getAllInvitedMemberCount(currentWorkspaceId)
}

/**
 * Function to reinvite member
 * @param id
 * @returns json response
 */
export async function reinviteMember({ id }: { id: string }) {
  return await reinviteMemberForWorkspace({ id })
    .then(() => {
      return json<ActionData>(
        {
          resp: {
            title: "toastConstants.invitationSent",
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = "statusCheck.commonError"
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
}

/**
 * Function to delete specific user
 * @param id
 * @param workspaceId
 * @param email
 * @returns json response
 */
export async function deleteUserByID(
  id: string,
  workspaceId: string,
  email: string
) {
  return await deleteUserById(id, workspaceId, email)
    .then((res) => {
      return json<ActionData>(
        { resp: { title: "statusCheck.deletedSuccess", status: 200 } },
        { status: 200 }
      )
    })
    .catch((err) => {
      return json<ActionData>(
        {
          errors: {
            title: "statusCheck.commonError",
            status: 400,
          },
        },
        { status: 400 }
      )
    })
}

/**
 * Function to invite new user
 * @param email
 * @param roleId
 * @param invitedByWorkspaceId
 * @param userId
 * @returns json response
 */
export async function inviteNEWUser({
  email,
  roleId,
  invitedByWorkspaceId,
  userId,
}: {
  email: string
  roleId: string
  invitedByWorkspaceId: string
  userId: string | undefined
}) {
  return await inviteNewUser({
    email,
    roleId,
    invitedByWorkspaceId,
    userId,
  })
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: "toastConstants.invitationSent",
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = "statusCheck.commonError"
      if (err.code === "P2002") {
        title = "toastConstants.memberAlreadyInvited"
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
}
