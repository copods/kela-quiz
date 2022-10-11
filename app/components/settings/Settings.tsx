import SettingsTabs from './SettingTab'

const Setting = ({
  actionStatus,
  setActionStatus,
  validationError,
  passNotMatched,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  validationError?: string
  passNotMatched?: string
}) => {
  return (
    <div>
      <SettingsTabs
        validationError={validationError}
        passNotMatched={passNotMatched}
        actionStatus={actionStatus}
        setActionStatus={setActionStatus}
      />
    </div>
  )
}
export default Setting
