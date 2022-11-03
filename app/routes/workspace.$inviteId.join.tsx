import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import { getInvitedMemberById, getUserByEmail } from '~/models/user.server'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMemberId = await getInvitedMemberById(params.inviteId as string)
  const userId = await getUserByEmail(params.inviteId as string)
  if (invitedMemberId?.email !== userId?.email) {
    return redirect(routes.signUp)
  }
  if (invitedMemberId?.email === userId?.email) {
    return redirect(routes.signIn)
  }
  return json({})
}
const InviteMember = () => {
  return null
}
export default InviteMember
