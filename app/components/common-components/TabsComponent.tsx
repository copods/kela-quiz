import { useLocation } from '@remix-run/react'
import { NavLink } from '@remix-run/react'
import type { TabsComponent } from '~/interface/Interface'

const TabComponent = ({ tab }: { tab: TabsComponent }) => {
  const location = useLocation() // to get current location

  const isActive = location.pathname === tab.route // to get tabs path which would match with current location

  return (
    <div className="flex gap-5 rounded-lg">
      <NavLink
        tabIndex={0}
        role={'button'}
        to={tab.route}
        id={tab.name}
        className={({ isActive }) =>
          `flex flex-col-reverse gap-2 ${isActive ? 'cursor-pointer' : ' '}`
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
