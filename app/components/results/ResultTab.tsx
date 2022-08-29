import { NavLink } from '@remix-run/react'

const ResultTab = ({
  tabs,
  testId,
}: {
  tabs: Array<{ id: number; title: string; route: string }>
  testId: string
}) => {
  return (
    <div className="flex gap-8" id="group-by-tests-test-candidate-list-tab">
      {tabs.map((tab) => {
        return (
          <NavLink
            key={tab.id}
            to={`/results/groupByTests/${testId}/${tab?.route}`}
            id="tab-title"
            title={tab.title}
            className={({ isActive }) =>
              isActive
                ? 'cursor-pointer border-b-4 border-primary pb-3 text-base font-semibold text-primary'
                : 'cursor-pointer pb-3 text-base font-normal text-totalCount'
            }
          >
            {tab.title}
          </NavLink>
        )
      })}
    </div>
  )
}

export default ResultTab
