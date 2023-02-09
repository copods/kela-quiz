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

export async function getALLRoles() {
  return await getAllRoles()
}

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

export async function getALLUsersCount(currentWorkspaceId: string) {
  return await getAllUsersCount(currentWorkspaceId)
}

export async function getUserByID(userId: string) {
  return await getUserById(userId)
}

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

export async function getALLInvitedMemberCount(currentWorkspaceId: string) {
  return await getAllInvitedMemberCount(currentWorkspaceId)
}

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
