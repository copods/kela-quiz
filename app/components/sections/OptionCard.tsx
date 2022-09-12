import type { CorrectAnswer, Option, QuestionType } from '~/interface/Interface'
import sanitizeHtml from 'sanitize-html'

const OptionCard = ({
  option,
  Questiontype,
}: {
  option: Option | CorrectAnswer
  Questiontype?: QuestionType
}) => {
  return (
    <div
      className={`flex h-full gap-2 break-normal rounded-2xl py-6 px-6 text-gray-800 ${
        (option as Option)?.coInQuestionId
          ? 'border border-solid border-green-500 bg-green-50'
          : 'border border-solid border-gray-300 bg-gray-100 '
      }`}
    >
      {Questiontype?.displayName === 'Text' ? (
        <div>
          {(option as Option)?.option || (option as CorrectAnswer)?.answer}
        </div>
      ) : (
        <div
          className="ql-editor flex-1"
          dangerouslySetInnerHTML={{
            __html: `${sanitizeHtml(
              (option as Option)?.option.replace(/<p><br[\/]?><[\/]?p>/g, '') ||
                (option as CorrectAnswer)?.answer.replace(
                  /<p><br[\/]?><[\/]?p>/g,
                  ''
                )
            )}`,
          }}
        ></div> /* eslint-disable no-useless-escape */
      )}
    </div>
  )
}
export default OptionCard
