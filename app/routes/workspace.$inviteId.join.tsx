import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import Header from '~/components/assessment/Header'
import JoinWorkspace from '~/components/workspace/JoinWorkspace'
import { getUserId } from '~/session.server'
import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { routes } from '~/constants/route.constants'
import { joinWorkspace } from '~/models/workspace.server'
import { rejectWorkspaceInvitation } from '../models/workspace.server'
import { getInvitedMemberById } from '~/models/invites.server'
import { getUserByEmail } from '~/models/user.server'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}
type LoaderData = {
  invitedMember: Awaited<ReturnType<typeof getInvitedMemberById>>
  loginWithWrongId: any
  inviteId: any
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMember = await getInvitedMemberById(params.inviteId as string)
  if (!invitedMember?.id) {
    throw new Response('Not Found', { status: 404 })
  }

  const user = await getUserByEmail(invitedMember.email) //checking if user exist or not
  let loginWithWrongId
  if (user) {
    const userId = await getUserId(request)
    if (!userId) {
      return redirect(`${routes.signIn}?cameFrom=join&id=${params.inviteId}`)
    }

    loginWithWrongId = userId && userId != user?.id
  }
  if (!user) {
    if (invitedMember && !user) {
      return redirect(`${routes.signUp}?cameFrom=join&id=${params.inviteId}`)
    }
  }
  const inviteId = new URL(request.url).searchParams.get('id')
  return json<LoaderData>({ invitedMember, loginWithWrongId, inviteId })
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const action = await formData.get('action')
  if (action === 'join') {
    let join = null

    await joinWorkspace({
      invitedId: params.inviteId as string, //taking invited id from params
    })
      .then((res) => {
        join = json<ActionData>(
          { resp: { title: 'statusCheck.workspaceJoinSuccess', status: 200 } },
          { status: 200 }
        )
      })
      .catch((err) => {
        join = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return join
  }
  if (action === 'reject') {
    let reject = null

    await rejectWorkspaceInvitation({
      invitedId: params.inviteId as string,
    })
      .then((res) => {
        reject = json<ActionData>(
          {
            resp: {
              title: 'statusCheck.workspaceInvitationRejected',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        reject = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return reject
  }
}
const InviteMember = () => {
  const { t } = useTranslation()
  const joinWorkspaceActionData = useActionData() as ActionData
  const workspaceInvitationData = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (joinWorkspaceActionData) {
      if (joinWorkspaceActionData.resp?.status === 200) {
        toast.success(t(joinWorkspaceActionData.resp?.title))
        return navigate(
          `/${workspaceInvitationData?.invitedMember.invitedForWorkspace?.id}/members`
        )
      } else if (joinWorkspaceActionData.errors?.status === 400) {
        toast.error(t(joinWorkspaceActionData.errors?.title), {
          toastId: joinWorkspaceActionData.errors?.title,
        })
      }
    }
  }, [joinWorkspaceActionData, t, navigate, workspaceInvitationData])

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <Header />
      <JoinWorkspace />
    </div>
  )
}
export default InviteMember
