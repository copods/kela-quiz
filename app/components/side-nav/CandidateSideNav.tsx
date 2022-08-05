import CandidateNavFooter from '../CandidateNavFooter'

import logo from '~/../public/assets/logo.svg'
import CandidateSideNavItems from './CandidateSideNavItems'
import { useState } from 'react'
let sideNavGuide = [
  {
    navGuide: 'Assessment Details',
    subItem: [
      {
        itemName: 'Overview',
        // itemRoute: 'Overview',
      },
    ],
  },
]
const CandidateSideNav = () => {
  const [currentAccordian, setCurrentAccordian] = useState(-1)
  return (
    <div className="flex h-full flex-col justify-between overflow-auto ">
      <div>
        <div className="  p-5  ">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" />
            <span className="text-3xl font-bold leading-9">Assessment</span>
          </div>
        </div>
        <div className="border-t-2-gray-300 border border-t-2 border-x-transparent  border-b-gray-300 px-5 py-5">
          <div className="flex flex-col gap-2 ">
            <p className="text-xl font-semibold leading-7 text-gray-600">
              Pre-Interview Assessment
            </p>
            <p className="text-sm font-medium leading-5 text-gray-500">
              Time Limit: 30 Mins
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-5 pt-6">
          {sideNavGuide.map((guide, index) => {
            return (
              <div className="10px flex flex-col gap-2.5" key={index}>
                <p className="non-italic  text-left text-sm font-medium leading-5 text-gray-900">
                  {guide.navGuide}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2">
                    <span>
                      <p
                        className="non-italic py-3 text-sm font-medium	 leading-5
                text-gray-800"
                      >
                        Section 1
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="flex flex-col gap-6">
            <p className="non-italic   text-left text-sm font-medium leading-5 text-gray-900">
              Assessment Tests
            </p>
            <div className="flex flex-col gap-1">
              <CandidateSideNavItems
                isExpanded={currentAccordian}
                onAccordianToggle={setCurrentAccordian}
                index={1}
              />
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
