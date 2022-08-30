import { resultConstants } from '~/constants/common.constants'

const SectionCardForResultDetail = ({
  name,
  totalQuestions,
  correctQuestions,
  skippedQuestions,
}: {
  name: string
  totalQuestions: number
  correctQuestions: number
  skippedQuestions: number
}) => {
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-6">
      <div className="text-base font-semibold text-gray-700">{name}</div>
      <div className="flex gap-9">
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">{resultConstants.correct}:</span>
          <span className="font-medium text-green-600">{correctQuestions}</span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">{resultConstants.skipped}:</span>
          <span className="font-medium text-yellow-600">
            {skippedQuestions}
          </span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">{resultConstants.total}:</span>
          <span className="font-bold text-primary">{totalQuestions}</span>
        </div>
      </div>
    </div>
  )
}
export default SectionCardForResultDetail
