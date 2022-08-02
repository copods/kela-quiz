import CandidateNavFooter from '../CandidateNavFooter'
import Header from '../SideNavHeader'
import CandidateSideNavItems from './CandidateSideNavItems'

let sideNavGuide = [
  {
    navGuide: 'Assessment Details',
    subItem: [
      {
        itemName: 'Overview',
        // itemRoute: 'Overview',
      },
      {
        itemName: 'Rules',
        // itemRoute: 'results',
      },
    ],
  },
]
const CandidateSideNav = () => {
  const title = 'Assessment'
  return (
    <div className="flex h-full flex-col justify-between overflow-auto ">
      <div>
        <div className="mb-14 px-1">
          <Header title={title} />
        </div>
        <div className="pb-9">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold leading-7 text-gray-600">
              Pre-Interview Assessment
            </p>
            <p className="text-sm font-medium leading-5 text-gray-500">
              Time Limit: 30 Mins
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {sideNavGuide.map((guide, index) => {
            return (
              <div className="10px flex flex-col gap-4" key={index}>
                <p className="non-italic  px-2 pb-2 text-left text-sm font-semibold leading-5 text-gray-500">
                  {guide.navGuide}
                </p>
                <div className="flex flex-col gap-1">
                  {guide.subItem.map((item, index) => {
                    return (
                      <CandidateSideNavItems
                        key={index}
                        itemName={item.itemName}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div>
            <p className="non-italic  px-2 pb-2 text-left text-sm font-semibold leading-5 text-gray-500">
              Assignment
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <input
                  className="h-3.5 w-3.5 rounded-[100%] border"
                  type="checkbox"
                />
                <p className="text-base font-bold leading-5 text-primary">
                  Section 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-end">
        <CandidateNavFooter />
      </div>
    </div>
  )
}
export default CandidateSideNav
