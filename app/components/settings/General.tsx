import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResetPasswordManually from './ResetPassword'

const General = ({
  actionStatus,
  setActionStatus,
  error,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  error?: string
}) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionStatus) {
      setOpen(false)
      setActionStatus(false)
    }
  }, [actionStatus, setActionStatus])
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-solid border-gray-300 bg-white p-4">
      <div className="flex flex-col gap-8">
        <h3 className="text-lg font-semibold">Basic Info</h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <span className="text-base font-medium text-gray-700">
              {t('settings.attentionToDetail')}
            </span>
            <span className="ext-base font-medium text-gray-600">
              Version 1.0.0
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base font-medium text-gray-700">
              {t('settings.password')}
            </span>
            <button
              tabIndex={0}
              onClick={() => setOpen(!open)}
              className="cursor-pointer text-base font-medium text-primary"
            >
              {t('settings.clickToChange')}
            </button>
          </div>
        </div>
      </div>
      <ResetPasswordManually open={open} errors={error} setOpen={setOpen} />
    </div>
  )
}
export default General
