import { useTranslation } from 'react-i18next'

const JoinWorkspace = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 rounded-lg">
      <div className="flex flex-col gap-2 text-2xl">
        <span>you have been invited by ..for ..workspace</span>
        <span className="text-center">{t('members.doYouWantToJoin')}</span>
      </div>
      <div className="flex gap-4">
        <button
          tabIndex={0}
          id="reject-button"
          name="reject-workspace"
          value={'reject'}
          className="h-9 rounded-lg bg-red-500 px-8 text-white"
        >
          Reject
        </button>
        <button
          tabIndex={0}
          id="join-button"
          name="join-workspace"
          value={'join'}
          className="h-9 rounded-lg bg-primary px-8 text-white"
        >
          Join
        </button>
      </div>
    </div>
  )
}
export default JoinWorkspace
