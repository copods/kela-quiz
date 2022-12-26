import { useTranslation } from 'react-i18next'

const SectionCardForResultDetail = ({
  sectionName,
  startedAt,
  correctQuestions,
  incorrectQuestions,
  skippedQuestions,
  totalQuestions,
  unansweredQuestions,
}: {
  sectionName: string
  startedAt: Date | null
  correctQuestions?: number
  incorrectQuestions?: number
  skippedQuestions?: number
  totalQuestions?: number
  unansweredQuestions?: number
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-6">
      <div className="text-base font-semibold text-gray-700">{sectionName}</div>
      {startedAt ? (
        <>
          <div className="flex gap-9">
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">
                {t('resultConstants.correct')}:
              </span>
              <span className="font-medium text-green-600">
                {correctQuestions}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">
                {t('resultConstants.incorrect')}:
              </span>
              <span className="font-medium text-red-600">
                {incorrectQuestions}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">
                {t('resultConstants.skipped')}:
              </span>
              <span className="font-medium text-zinc-600">
                {skippedQuestions}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">
                {t('resultConstants.unanswered')}:
              </span>
              <span className="font-medium text-yellow-600">
                {unansweredQuestions}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500">
                {t('resultConstants.total')}:
              </span>
              <span className="font-bold text-primary">{totalQuestions}</span>
            </div>
          </div>
        </>
      ) : (
        <span className="text-start text-sm text-gray-500">
          {' '}
          {t('commonConstants.notAttempted')}
        </span>
      )}
    </div>
  )
}
export default SectionCardForResultDetail
