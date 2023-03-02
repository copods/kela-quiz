import { useLocation } from "@remix-run/react"
import { NavLink } from "@remix-run/react"

import type { TabsComponent } from "~/interface/Interface"

const TabComponent = ({ tab }: { tab: TabsComponent }) => {
  const location = useLocation() // to get current location

  const isActive = location.pathname === tab.route // to get tabs path which would match with current location

  return (
    <div className="flex rounded-lg">
      <NavLink
        tabIndex={0}
        role={"button"}
        to={tab.route}
        id={tab.name}
        className={({ isActive }) =>
          `relative flex flex-col-reverse ${isActive ? "cursor-pointer" : " "}`
        }
      >
        <hr
          className={`absolute -bottom-0.5 h-0.5 w-full border-0 ${
            isActive ? "bg-primary" : "bg-transparent"
          }`}
        />
        <div
          className={`px-6 py-4 text-base  ${
            isActive
              ? "font-semibold text-primary"
              : "font-normal text-gray-600"
          }`}
        >
          {tab.name}
        </div>
      </NavLink>
    </div>
  )
}
export default TabComponent
