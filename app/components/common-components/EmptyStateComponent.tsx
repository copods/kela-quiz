import { t } from 'i18next'
import noData from '../../../public/assets/noData.svg'

const EmptyStateComponent = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img
        src={noData}
        alt={t('candidateExamConstants.alreadySubmitted')}
        className="h-cooldownSVG w-cooldownSVG"
      />
      <span className="text-2xl font-bold">
        {t('sectionsConstants.noDataToShow')}
      </span>
    </div>
  )
}

export default EmptyStateComponent
