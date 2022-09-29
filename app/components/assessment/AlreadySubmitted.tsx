import alreadySubmitted from '../../../public/assets/alreadySubmitted.svg'
import Header from './Header'
import { useTranslation } from 'react-i18next'
const AlredySubmitted = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="mx-auto flex w-coolDownCard flex-col items-center justify-center gap-10 bg-white py-16">
            <img
              src={alreadySubmitted}
              alt="End test"
              className="h-cooldownSVG w-cooldownSVG"
            />
            <span className="text-2xl font-bold text-gray-900">
              {t('candidateExamConstants.alreadyExamSubmitted')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AlredySubmitted
