import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResetPassword from './ResetPassword'

const GeneralSettings = () => {
  const [openResetPassPopUp, setOpenResetPassPopUp] = useState(false)
  const { t } = useTranslation()
  return (
    <div className="rounded-lg border border-solid border-gray-300 bg-white p-4">
      <div className="flex flex-col gap-8">
        <h3 className="text-lg font-semibold"> {t('settings.basicInfo')}</h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-4">
            <span className="text-base font-medium text-gray-700">
              {t('settings.attentionToDetail')}
            </span>
            <span className="ext-base font-medium text-gray-600">
              {t('settings.version')}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-base font-medium text-gray-700">
              {t('settings.password')}
            </span>
            <button
              tabIndex={0}
              onClick={() => setOpenResetPassPopUp(!openResetPassPopUp)}
              className="cursor-pointer text-base font-medium text-primary"
            >
              {t('settings.clickToChange')}
            </button>
          </div>
        </div>
      </div>
      <ResetPassword
        openResetPassPopUp={openResetPassPopUp}
        setOpenResetPassPopUp={setOpenResetPassPopUp}
      />
    </div>
  )
}
export default GeneralSettings
