import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import Header from '~/components/assessment/Header'
import JoinWorkspace from '~/components/workspace/JoinWorkspace'
import { getUserId } from '~/session.server'
import { routes } from '~/constants/route.constants'
import { joinWorkspace } from '~/models/workspace.server'
import { getInvitedMemberById } from '~/models/invites.server'
import { getUserByEmail } from '~/models/user.server'
import { useEffect } from 'react'
import { useLoaderData, useNavigate } from '@remix-run/react'

export type LoaderData = {
  invitedMember: Awaited<ReturnType<typeof getInvitedMemberById>>
  loginWithWrongId: string
  inviteId: string
  joined?: string | undefined
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMember = await getInvitedMemberById(params.inviteId as string)
  if (!invitedMember?.id) {
    throw new Response('Not Found', { status: 404 })
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
    if (loginWithWrongId === false) {
      await joinWorkspace({
        invitedId: params.inviteId as string, //taking invited id from params
      })
        .then((res) => {
          joined = 'joined'
          if (res) return joined
        })
        .catch((err) => {
          return err
        })
    }
  }

  if (!user) {
    if (invitedMember) {
      return redirect(`${routes.signUp}?cameFrom=join&id=${params.inviteId}`)
    }
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
  let navigate = useNavigate()
  const workspcaceInvitationData = useLoaderData() as LoaderData
  useEffect(() => {
    if (workspcaceInvitationData.joined === 'joined') {
      return navigate(
        `/${workspcaceInvitationData?.invitedMember?.invitedForWorkspace?.id}`
      )
    }
  }, [navigate, workspcaceInvitationData])
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <Header />
      <JoinWorkspace workspcaceInvitationData={workspcaceInvitationData} />
    </div>
  )
}
export default InviteMember
