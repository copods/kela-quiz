import type { Option } from '~/interface/Interface'
const OptionsCard = ({
  options,
  index,
}: {
  options: Option
  index: number
}) => {
  return (
    <div
      className={`flex h-full gap-2 ${
        options.coInQuestionId
          ? 'border-2 border-solid border-[#30fc02bd] '
          : 'border-2 border-solid border-transparent '
      }`}
    >
      <div>{index}.</div>
      <div>{options.option}</div>
    </div>
  )
}
export default OptionsCard
