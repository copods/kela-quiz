import { useActionData, useLoaderData, useNavigate } from '@remix-run/react'
import MembersHeader from '~/components/members/MembersHeader'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EmptyStateComponent from '~/components/common-components/EmptyStateComponent'
import MembersList from '~/components/members/MembersList'
import InvitedMembersList from '~/components/members/InvitedMembersList'
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
const MembersWrapper = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const membersActionData = useActionData() as ActionData
  const memberLoaderData = useLoaderData()

  //states
  const [actionStatus, setActionStatus] = useState<boolean>(false)
  const [membersCurrentPage, setMembersCurrentPage] = useState(
    memberLoaderData.membersCurrentPage
  )
  const [membersPageSize, setMembersPageSize] = useState(5)
  const [invitedMemberCurrentPage, setInvitedMemberPage] = useState(
    memberLoaderData.invitedMembersCurrentPage
  )
  const [invitedMemberPageSize, setInvitedMemberPageSize] = useState(5)

  //useEffects
  useEffect(() => {
    if (membersActionData) {
      if (membersActionData.resp?.status === 200) {
        setActionStatus(true)
        toast.success(t(membersActionData.resp?.title))
      } else if (membersActionData.errors?.status === 400) {
        setActionStatus(false)
        toast.error(t(membersActionData.errors?.title), {
          toastId: membersActionData.errors?.title,
        })
      }
    }
  }, [membersActionData, t])

  useEffect(() => {
    navigate(
      `?MemberPage=${membersCurrentPage}&MemberItems=${membersPageSize}&InvitedMemberPage=${invitedMemberCurrentPage}&InvitedMemberItems=${invitedMemberPageSize}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    membersPageSize,
    membersCurrentPage,
    invitedMemberCurrentPage,
    invitedMemberPageSize,
  ])
  return (
    <div className="flex flex-col gap-6 p-1">
      <MembersHeader
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
      />
      <div className="flex flex-col gap-4 text-2xl">
        <h1
          tabIndex={0}
          role={t('members.joinedMembers')}
          aria-label={t('members.joinedMembers')}
          id="joined-member-heading"
        >
          {t('members.joinedMembers')}
        </h1>
        {memberLoaderData.users.length === 0 ? (
          <EmptyStateComponent />
        ) : (
          <MembersList
            membersCurrentPage={membersCurrentPage}
            setMembersCurrentPage={setMembersCurrentPage}
            membersPageSize={membersPageSize}
            setMembersPageSize={setMembersPageSize}
          />
        )}
      </div>
      <div>
        <InvitedMembersList
          actionStatus={membersActionData?.resp?.title}
          invitedMemberCurrentPage={invitedMemberCurrentPage}
          setInvitedMemberPage={setInvitedMemberPage}
          invitedMemberPageSize={invitedMemberPageSize}
          setInvitedMemberPageSize={setInvitedMemberPageSize}
        />
      </div>
    </div>
  )
}

export default MembersWrapper