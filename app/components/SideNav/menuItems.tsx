import {Icon} from "@iconify/react"

function MenuItems (props : any ) {
return (
    <div>
            <div className="flex flex-row items-start p-3.5  bg-bgcolor rounded-lg gap-2">
                <Icon icon = {props.iconClass} className="stroke-primary h-6 w-6 grow-0 order-none flex-none" ></Icon><span><p className="non-italic font-bold text-base leading-6 text-primary">{props.itemName}</p></span>
            </div>
    </div>
)
}

export default MenuItems