import { updatePassword } from "~/models/user.server"
import { createUserSession, getUserId } from "~/session.server"

/** Function to get userId
 * @param request
 * @returns userId
 */
export async function getUserID(request: Request) {
  return await getUserId(request)
}

/** Function to update user password
 * @param userId
 * @param newPassword
 * @param oldPassword
 * @returns Error or "DONE"
 */
export async function updateUserPassword(
  userId: string,
  newPassword: string,
  oldPassword: string
) {
  return await updatePassword(userId, newPassword, oldPassword)
}

/** Function to create user session
 * @param request
 * @param workspace
 * @param userId
 * @param remember
 * @param redirectTo
 * @returns creates user session
 */
export async function createCurrentUserSession({
  request,
  workspace,
  userId,
  remember,
  redirectTo,
}: {
  request: Request
  workspace: string
  userId: string
  remember: boolean
  redirectTo: string
}) {
  return await createUserSession({
    request,
    workspace,
    userId,
    remember,
    redirectTo,
  })
}
