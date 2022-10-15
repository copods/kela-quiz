import { NavLink } from '@remix-run/react'
const TabComponent = ({ tab, isActive }: { tab: any; isActive: boolean }) => {
  return (
    <div className="flex w-full gap-5 rounded-lg">
      <NavLink
        tabIndex={0}
        role={'button'}
        to={tab.route}
        id={tab.name}
        key={tab.name}
        className={({ isActive }) =>
          `flex flex-col-reverse gap-2 p-1 ${isActive ? 'cursor-pointer' : ' '}`
        }
      >
        <hr
          className={`h-1 w-full rounded-1 border-0   ${
            isActive ? 'bg-primary' : 'bg-transparent'
          }`}
        />

        <div
          className={`text-base font-semibold ${
            isActive ? 'text-primary' : 'text-gray-600'
          }`}
        >
          {tab.name}
        </div>
      </NavLink>
    </div>
  )
}
export default TabComponent
