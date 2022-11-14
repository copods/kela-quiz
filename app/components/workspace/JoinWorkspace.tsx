import { useLoaderData, useSubmit, useTransition } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import Button from '../form/Button'
import logo from '../../../public/assets/member-invitation.svg'

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
  const workspaceInvitation = workspcaceInvitationData.invitedMember

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 rounded-lg">
      <div className="rounded-lg border-solid border-gray-50 bg-white px-14 py-10 shadow-sm">
        <div className="flex max-w-554 flex-col items-center gap-10">
          <img className="h-24 w-32" src={logo} alt="" />
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center justify-center gap-4 text-2xl">
              <span className="break-word text-2xl font-bold">
                {' '}
                {t('members.workspaceInvitation')}
              </span>
              <span className="break-word text-center text-base font-medium text-gray-500">
                You have been invited by{' '}
                <span className="text-center text-primary">
                  {workspaceInvitation.invitedById.firstName}{' '}
                  {workspaceInvitation.invitedById.lastName}
                </span>{' '}
                to join{' '}
                <span className="text-primary">
                  {workspaceInvitation.invitedForWorkspace.name}
                </span>
              </span>
            </div>
            <div className="flex justify-center gap-8">
              <Button
                tabIndex={0}
                title="Reject"
                id="reject-button"
                buttonText="Reject"
                name="reject-workspace"
                varient="primary-outlined"
                value={'reject'}
                className="h-9 px-24"
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
                className="h-9  px-24"
                varient="primary-solid"
                onClick={() => joinInvitedWorkspace()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default JoinWorkspace
