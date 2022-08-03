import type { Option } from '~/interface/Interface'
const OptionsCard = ({ options }: { options: Option }) => {
  return (
    <div
      className={`pr14 flex h-full gap-2 break-normal rounded-2xl py-6 px-6 text-gray-800 ${
        options.coInQuestionId
          ? 'border border-solid border-green-500 bg-green-50   '
          : 'border border-solid   border-gray-300 bg-gray-100 '
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: `${options.option}` }}></div>
    </div>
  )
}
export default OptionsCard
