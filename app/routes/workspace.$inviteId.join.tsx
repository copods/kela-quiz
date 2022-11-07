import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import {
  getInvitedMemberById,
  joinWorkspace,
  rejectWorkspaceInvitation,
} from '~/models/user.server'
import Header from '~/components/assessment/Header'
import JoinWorkspace from '~/components/workspace/JoinWorkspace'
import { getUserId } from '~/session.server'
import { useActionData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { routes } from '~/constants/route.constants'

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
}
export const loader: LoaderFunction = async ({ request, params }) => {
  const invitedMember = await getInvitedMemberById(params.inviteId as string)

  if (invitedMember?.joined === true) {
    return redirect(routes.signIn)
  }
  if (invitedMember?.joined === false) {
    return redirect(routes.signUp)
  }
  const user = await getUserId(request) //checking if user exist or not
  // if (invitedMember?.email !== userId?.email) {
  //   return redirect(routes.signUp)
  // }
  if (user) {
    const userId = await getUserId(request)
    if (userId === invitedMember?.id) {
      return null
    } else {
      redirect('/logout')
    }
  }

  return json<LoaderData>({ invitedMember })
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const action = await formData.get('action')
  if (action === 'join') {
    let join = null

    await joinWorkspace({
      invitedId: params.inviteId as string,
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
  useEffect(() => {
    if (joinWorkspaceActionData) {
      if (joinWorkspaceActionData.resp?.status === 200) {
        toast.success(t(joinWorkspaceActionData.resp?.title))
      } else if (joinWorkspaceActionData.errors?.status === 400) {
        toast.error(t(joinWorkspaceActionData.errors?.title), {
          toastId: joinWorkspaceActionData.errors?.title,
        })
      }
    }
  }, [joinWorkspaceActionData, t])
  return (
    <div className="flex h-full flex-col">
      <Header />
      <JoinWorkspace />
    </div>
  )
}
export default InviteMember
