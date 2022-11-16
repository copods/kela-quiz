import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ResetPassword from './ResetPassword'
import { version } from 'package.json'

const GeneralSettings = () => {
  const [openResetPassModel, setOpenResetPassModel] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border border-solid border-gray-300 bg-white p-4">
        <h3 className="text-lg font-semibold"> {t('settings.basicInfo')}</h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-base font-bold text-gray-700">
              {t('settings.version')}
            </span>
            <span className="ext-base font-medium text-gray-600">
              {version}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base font-bold text-gray-700">
              {t('settings.password')}
            </span>
            <button
              tabIndex={0}
              onClick={() => setOpenResetPassModel(!openResetPassModel)}
              className="resetPassOpenPopUpLink cursor-pointer self-start text-base font-medium text-primary"
            >
              {t('settings.clickToChange')}
            </button>
          </div>
        </div>
      </div>
      <ResetPassword
        openResetPassModel={openResetPassModel}
        setOpenResetPassModel={setOpenResetPassModel}
      />
    </>
  )
}
export default GeneralSettings
