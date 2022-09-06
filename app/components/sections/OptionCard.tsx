import type { CorrectAnswer, Option } from '~/interface/Interface'
import sanitizeHtml from 'sanitize-html'

const OptionCard = ({ option }: { option: Option | CorrectAnswer }) => {
  return (
    <div
      className={`flex h-full gap-2 break-normal rounded-2xl py-6 px-6 text-gray-800 ${
        (option as Option)?.coInQuestionId
          ? 'border border-solid border-green-500 bg-green-50'
          : 'border border-solid border-gray-300 bg-gray-100 '
      }`}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `${sanitizeHtml(
            (option as Option)?.option || (option as CorrectAnswer)?.answer
          )}`,
        }}
      ></div>
    </div>
  )
}
export default OptionCard
