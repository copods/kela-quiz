import { updatePassword } from "~/models/user.server"

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
