import { json } from "@remix-run/node"

import {
  addWorkspace,
  getCurrentWorkspaceOwner,
  getOwnersWorkspaces,
  getUserWorkspaces,
  leaveWorkspace,
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
  }
}

/**
 * Function will return current workspace owner id
 * @param currentWorkspaceId
 * @param userId
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
export async function getUserWorkspaceService(userId: string) {
  return await getUserWorkspaces(userId)
}
