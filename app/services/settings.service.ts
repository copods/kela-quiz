import { updatePassword } from "~/models/user.server"
import { getUserId } from "~/session.server"

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
