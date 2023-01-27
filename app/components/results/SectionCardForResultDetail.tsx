import { useTranslation } from 'react-i18next'
import { Link } from '@remix-run/react'

const SectionCardForResultDetail = ({
  sectionId,
  startedAt,
  endAt,
  sectionName,
  correctQuestions,
  incorrectQuestions,
  skippedQuestions,
  totalQuestions,
  unansweredQuestions,
  currentWorkspaceId,
  candidateId,
  testId,
}: {
  sectionId: string
  startedAt: Date | null
  endAt: Date | null
  sectionName: string
  correctQuestions?: number
  incorrectQuestions?: number
  skippedQuestions?: number
  totalQuestions?: number
  unansweredQuestions?: number
  currentWorkspaceId: string
  candidateId?: string
  testId: string
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-6">
      <div className="text-base font-semibold text-gray-700">{sectionName}</div>
      {startedAt && endAt ? (
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
            <hr className="h-5 w-px bg-gray-300" />
            <div className="flex gap-2 text-sm">
              <Link
                tabIndex={0}
                to={`/${currentWorkspaceId}/results/groupByTests/${testId}/${candidateId}/${sectionId}`}
                id="result-detail-by-section"
                data-cy="result-details"
                className="groupByItemTest text-base font-semibold text-primary"
              >
                {t('resultConstants.viewDetails')}
              </Link>
            </div>
          </div>
        </>
      ) : startedAt ? (
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
          {t('commonConstants.onGoing')}
        </span>
      ) : (
        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs">
          {t('commonConstants.notAttempted')}
        </span>
      )}
    </div>
  )
}
export default SectionCardForResultDetail
