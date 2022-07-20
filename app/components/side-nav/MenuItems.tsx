import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'

export interface tabProps {
  iconClass: string
  itemName: string
  itemRoute: string
}

function MenuItems({ iconClass, itemName, itemRoute }: tabProps) {
  return (
    <div id="menuItem">
      <NavLink
        to={`/${itemRoute}`}
        className={({ isActive }) =>
          `flex flex-row items-start gap-2 rounded-lg p-3.5 ${
            isActive ? 'active_nav_link bg-blue-50' : ''
          }`
        }
      >
        <div className="flex flex-row items-center gap-2">
          <Icon
            id="tabIcon"
            icon={iconClass}
            className="order-none flex-none grow-0 text-2xl text-gray-400"
          ></Icon>
          <span>
            <p
              id={itemName}
              className="non-italic text-base font-semibold leading-6 text-gray-500"
            >
              {itemName}
            </p>
          </span>
        </div>
      </NavLink>
    </div>
  )
}

export default MenuItems
