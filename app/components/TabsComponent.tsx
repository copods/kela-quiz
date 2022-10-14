import { NavLink, useLocation } from '@remix-run/react'
const TabComponent = ({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: Array<{ id: number; name: string; route: string }>
  currentTab: number
  setCurrentTab: (e: number) => void
}) => {
  const location = useLocation()
  return (
    <div className="flex w-full gap-5 rounded-lg">
      {tabs.map((tab, i) => {
        return (
          <NavLink
            tabIndex={0}
            role={'button'}
            to={tab.route}
            id={tab.id.toString()}
            key={tab.id}
            className={({ isActive }) =>
              `flex flex-col-reverse gap-2 p-1 ${
                isActive ? 'cursor-pointer' : ' '
              }`
            }
            onClick={() => {
              setCurrentTab(tab.id)
            }}
          >
            <hr
              className={`h-1 w-full rounded-1 border-0   ${
                location.pathname.includes(`${tab.route}`)
                  ? 'bg-primary'
                  : 'bg-transparent'
              }`}
            />

            <div
              className={`text-base font-semibold ${
                location.pathname.includes(`${tab.route}`)
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              {tab.name}
            </div>
          </NavLink>
        )
      })}
    </div>
  )
}
export default TabComponent
