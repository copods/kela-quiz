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
          {isExpanded === index ? (
            <Icon
              icon={'bytesize:lock'}
              className="cursor-pointer text-xl text-gray-800"
              onClick={() => onAccordianToggle(-1)}
            />
          ) : (
            <Icon
              icon={'teenyicons:tick-circle-outline'}
              className="cursor-pointer text-xl text-green-800"
              onClick={() => onAccordianToggle(index)}
            />
          )}
        </div>
        <div
          className={
            'overflow-hidden  text-sm leading-5 text-gray-400 transition-all ' +
            (isExpanded === index ? 'max-h-96' : 'max-h-0')
          }
        >
          <p className="p-3 text-sm leading-5 text-gray-400">Question</p>
        </div>
      </div>
    </div>
  )
}
export default CandidateSideNavItems
