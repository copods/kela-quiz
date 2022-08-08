import type { Option } from '~/interface/Interface'
const OptionCard = ({ option }: { option: Option }) => {
  return (
    <div
      tabIndex={0}
      className={`pr14 flex h-full gap-2 break-normal rounded-2xl py-6 px-6 text-gray-800 ${
        option.coInQuestionId
          ? 'border border-solid border-green-500 bg-green-50   '
          : 'border border-solid border-gray-300 bg-gray-100 '
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: `${option.option}` }}></div>
    </div>
  )
}
export default OptionCard
