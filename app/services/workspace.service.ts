import { json } from "@remix-run/node"

import {
  addWorkspace,
  getCurrentWorkspaceAdmins,
  getCurrentWorkspaceOwner,
  getOwnersWorkspaces,
  getUserWorkspaces,
  leaveWorkspace,
  updateUserWorkspace,
  updateWorkspaceOwner,
} from "~/models/workspace.server"

type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
    workspaceId?: string
    action?: string
  }
}

/**
 * Function will return current workspace owner id
 * @param currentWorkspaceId
 * @returns createdById
 */
export async function getActiveWorkspaceOwner(currentWorkspaceId: string) {
  return await getCurrentWorkspaceOwner(currentWorkspaceId)
}

/**
 * Function will return current owners workspace array
 * @param userId
 * @returns Workspace[]
 */
export async function getActiveOwnerWorkspaces(userId: string) {
  return await getOwnersWorkspaces(userId)
}

/**
 * Function will return response of leaving workspace
 * @param workspaceId
 * @param userId
 * @returns json response
 */
export async function leaveActiveWorkspace(
  workspaceId: string,
  userId: string
) {
  return await leaveWorkspace(workspaceId, userId)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: "members.workspaceLeft",
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
 * Function will return json response
 * @param workspace
 * @param userId
 * @returns json response
 */
export async function createWorkspace(workspace: string, userId: string) {
  return await addWorkspace(workspace, userId)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: "toastConstants.workspaceAdded",
            status: 200,
            workspaceId: res.workspaceId,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = "toastConstants.duplicateWorkspace"
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
 * Function to get user workspaces
 * @param userId
 * @returns Object consisting workspaces of user
 */
export async function getUserWorkspaceService(
  userId: string,
  workspaceId?: string
) {
  try {
    return await getUserWorkspaces(userId, workspaceId!)
  } catch (error) {
    throw error
  }
}

export async function updateCurrentUserWorkspace(
  workspaceId: string,
  workspaceName: string,
  workspaceUpdatorId: string
) {
  try {
    return await updateUserWorkspace(
      workspaceId,
      workspaceName,
      workspaceUpdatorId
    ).then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: "settings.workspaceUpdated",
            status: 200,
          },
        },
        { status: 200 }
      )
    })
  } catch (error) {
    throw error
  }
}

export async function getAllCurrentWorkspaceAdmins(
  currentWorkspaceId: string,
  userId: string
) {
  try {
    return await getCurrentWorkspaceAdmins(currentWorkspaceId, userId)
  } catch (error) {
    throw error
  }
}

export async function updateCurrentWorkspaceOwner(
  userId: string,
  currentWorkspaceId: string,
  newOwnerId: string
) {
  try {
    return await updateWorkspaceOwner(userId, currentWorkspaceId, newOwnerId)
      .then((res) => {
        return json<ActionData>(
          {
            resp: {
              title: "settings.ownerUpdated",
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
  } catch (error) {
    throw error
  }
}
