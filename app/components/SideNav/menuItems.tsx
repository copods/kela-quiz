import { Icon } from "@iconify/react"
import { NavLink } from "react-router-dom"

function MenuItems(props: any) {
    return (
        <div>
            <NavLink to={`/admin/${props.itemRoute}`} className={({ isActive }) => `flex flex-row items-start p-3.5 rounded-lg gap-2 ${isActive ? 'bg-bgcolor activeNavLink' : ""}`}>
                <div className="flex flex-row items-center gap-2">
                    <Icon id="tabIcon" icon={props.iconClass} className="text-gray-400 text-2xl grow-0 order-none flex-none" ></Icon>
                    <span><p className="non-italic font-semibold text-base leading-6 text-gray-500">{props.itemName}</p></span>
                </div>
            </NavLink>
        </div>
    )
}

export default MenuItems