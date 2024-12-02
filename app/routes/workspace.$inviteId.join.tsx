import { redirect, json } from "@remix-run/node"
import type { LoaderFunction } from "@remix-run/server-runtime"

import Header from "~/components/assessment/Header"
import JoinWorkspace from "~/components/workspace/JoinWorkspace"
import { routes } from "~/constants/route.constants"
import { getInvitedMemberById } from "~/models/invites.server"
import { getUserByEmail } from "~/models/user.server"
import { joinWorkspace } from "~/models/workspace.server"
import { getUserId } from "~/session.server"

export type LoaderData = {
  invitedMember: Awaited<ReturnType<typeof getInvitedMemberById>>
  loginWithWrongId: string
  inviteId: string
  joined?: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMember = await getInvitedMemberById(params.inviteId as string)
  if (!invitedMember?.id) {
    throw new Response("Not Found", { status: 404 })
  }

  const user = await getUserByEmail(invitedMember.email) //checking if user exist or not
  let loginWithWrongId
  let joined

  if (user) {
    const userId = await getUserId(request)
    if (!userId) {
      return redirect(`${routes.signIn}?cameFrom=join&id=${params.inviteId}`)
    }

    loginWithWrongId = userId && userId != user?.id
    if (loginWithWrongId === false && invitedMember.joined === true) {
      joined = "joined"
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

  const inviteId = new URL(request.url).searchParams.get("id")
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
