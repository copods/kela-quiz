import { Icon } from "@iconify/react"
import { NavLink, useLocation } from "@remix-run/react"

import { useCommonContext } from "~/context/Common.context"
export interface tabProps {
  iconClass: string
  itemName: string
  itemRoute: string
  id: string
  currentWorkspaceId: string
}

function MenuItems({
  iconClass,
  itemName,
  itemRoute,
  id,
  currentWorkspaceId,
}: tabProps) {
  const location = useLocation() // to get current location
  const { clearStorage } = useCommonContext()
  return (
    <div className="menuItem">
      <NavLink
        tabIndex={0}
        to={`/${currentWorkspaceId}${itemRoute}`}
        onClick={clearStorage}
        className={({ isActive }) =>
          `hover:bg-hover flex flex-row items-start gap-2 rounded-lg p-3.5 ${
            isActive || location.pathname.includes(itemName.toLowerCase())
              ? "active_nav_link bg-blue-50 hover:bg-blue-50"
              : ""
          }`
        }
      >
        <div className="flex flex-row items-center gap-2">
          <Icon
            id="tabIcon"
            icon={iconClass}
            className={`order-none flex-none grow-0 text-2xl  ${
              location.pathname.includes(itemName.toLowerCase())
                ? "text-primary"
                : "text-gray-400"
            }`}
          />
          <span>
            <p
              id={id}
              className={`non-italic text-base font-semibold ${
                location.pathname.includes(itemName.toLowerCase())
                  ? "text-primary"
                  : "text-gray-500"
              }`}
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
