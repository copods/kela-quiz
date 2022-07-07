import { Icon } from "@iconify/react"
import { NavLink } from "@remix-run/react"

export interface tabProps {
    iconClass: string,
    itemName: string,
    itemRoute: string
}

function MenuItems({ iconClass, itemName, itemRoute }: tabProps) {
    return (
        <div id="menuItem">
            <NavLink to={`/${itemRoute}`} className={({ isActive }) => `flex flex-row items-start p-3.5 rounded-lg gap-2 ${isActive ? 'bg-blue-50 active_nav_link' : ""}`}>
                <div className="flex flex-row items-center gap-2">
                    <Icon id="tabIcon" icon={iconClass} className="text-gray-400 text-2xl grow-0 order-none flex-none" ></Icon>
                    <span><p id={itemName} className="non-italic font-semibold text-base leading-6 text-gray-500">{itemName}</p></span>
                </div>
            </NavLink>
        </div>
    )
}

export default MenuItems