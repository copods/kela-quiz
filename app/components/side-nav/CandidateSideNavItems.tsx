import { Icon } from '@iconify/react'

const CandidateSideNavItems = ({
  isExpanded,
  onAccordianToggle,
  index,
}: {
  isExpanded: number
  onAccordianToggle: (e: number) => void
  index: number
}) => {
  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between py-3 text-sm font-medium leading-5 text-gray-800 ">
          Section 1
          <div
            className="items-top flex flex-1 justify-between"
            onClick={() => {
              onAccordianToggle(
                isExpanded == -1 ? index : isExpanded == index ? -1 : index
              )
            }}
          >
            <div className="ql-editor flex-1 p-0 pr-4">
              <div
                className="cursor-pointer"
                // dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
            </div>
            {isExpanded === index ? (
              <Icon
                icon={'bytesize:lock'}
                className="cursor-pointer text-xl text-gray-800"
              />
            ) : (
              <Icon
                icon={'teenyicons:tick-circle-outline'}
                className="cursor-pointer text-xl text-green-800"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={
          'overflow-hidden   transition-all ' +
          (isExpanded === index ? 'max-h-96' : 'max-h-0')
        }
      >
        <p className="p-3 text-sm leading-5  text-gray-600">Question</p>
      </div>
    </div>
  )
}
export default CandidateSideNavItems
