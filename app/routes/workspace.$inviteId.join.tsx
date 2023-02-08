import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import Header from '~/components/assessment/Header'
import JoinWorkspace from '~/components/workspace/JoinWorkspace'
import { getUserId } from '~/session.server'
import { routes } from '~/constants/route.constants'
import { joinWorkspace } from '~/models/workspace.server'
import { getInvitedMemberById } from '~/models/invites.server'
import { getUserBYEmail } from '~/services/user.service'

export type LoaderData = {
  invitedMember: Awaited<ReturnType<typeof getInvitedMemberById>>
  loginWithWrongId: string
  inviteId: string
  joined?: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMember = await getInvitedMemberById(params.inviteId as string)
  if (!invitedMember?.id) {
    throw new Response('Not Found', { status: 404 })
  }

  const user = await getUserBYEmail(invitedMember.email) //checking if user exist or not
  let loginWithWrongId
  let joined

  if (user) {
    const userId = await getUserId(request)
    if (!userId) {
      return redirect(`${routes.signIn}?cameFrom=join&id=${params.inviteId}`)
    }

    loginWithWrongId = userId && userId != user?.id
    if (loginWithWrongId === false && invitedMember.joined === true) {
      joined = 'joined'
      return joined
    }

    if (loginWithWrongId === false) {
      await joinWorkspace({
        invitedId: params.inviteId as string, //taking invited id from params
      })
      return redirect(`/${invitedMember?.invitedForWorkspace?.id}`)
    }
  }

  if (!user && invitedMember) {
    return redirect(`${routes.signUp}?cameFrom=join&id=${params.inviteId}`)
  }

  const inviteId = new URL(request.url).searchParams.get('id')
  return json<LoaderData>({
    invitedMember,
    loginWithWrongId: loginWithWrongId as string,
    inviteId: inviteId as string,
    joined,
  })
}
const InviteMember = () => {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <Header />
      <JoinWorkspace />
    </div>
  )
}
export default InviteMember
