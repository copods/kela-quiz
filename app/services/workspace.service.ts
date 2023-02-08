import {
  getCurrentWorkspaceOwner,
  getOwnersWorkspaces,
  leaveWorkspace,
} from '~/models/workspace.server'
import { json } from '@remix-run/node'

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
            title: 'members.workspaceLeft',
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
}
