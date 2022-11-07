import { useLoaderData, useSubmit, useTransition } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Button from '../form/Button'

const JoinWorkspace = () => {
  const { t } = useTranslation()

  const submit = useSubmit()
  const joinInvitedWorkspace = () => {
    let data = {
      action: 'join',
    }
    submit(data, {
      method: 'post',
    })
  }
  const rejectInvitedWorkspace = () => {
    let data = {
      action: 'reject',
    }
    submit(data, {
      method: 'post',
    })
  }
  const transition = useTransition()
  const workspcaceInvitationData = useLoaderData()
  const WorkspaceInvitation = workspcaceInvitationData.invitedMember

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 rounded-lg">
      <div className="flex flex-col gap-2 text-2xl">
        <span>
          you have been invited by {WorkspaceInvitation.invitedBy.firstName}{' '}
          {WorkspaceInvitation.invitedBy.lastName} to join{' '}
          {WorkspaceInvitation.invitedForWorkspace.name} workspace
        </span>
        <span className="text2xl text-center font-semibold">
          {t('members.doYouWantToJoin')}
        </span>
      </div>
      <div className="flex gap-4">
        <Button
          tabIndex={0}
          title="Reject"
          id="reject-button"
          buttonText="Reject"
          name="reject-workspace"
          varient="primary-outlined"
          value={'reject'}
          className="h-9 px-4"
          onClick={() => rejectInvitedWorkspace()}
        />

        <Button
          tabIndex={0}
          id="join-button"
          name="join-workspace"
          value={'join'}
          title={
            transition.state === 'submitting'
              ? t('commonConstants.joining')
              : t('commonConstants.join')
          }
          buttonText={
            transition.state === 'submitting'
              ? t('commonConstants.joining')
              : t('commonConstants.join')
          }
          className="h-9 px-4"
          varient="primary-solid"
          onClick={() => joinInvitedWorkspace()}
        />
      </div>
    </div>
  )
}
export default JoinWorkspace
