import { Icon } from "@iconify/react"
// import { Link } from "@remix-run/react"

function MenuItems(props: any) {
    // var route = "/" + props.itemName;
    // console.log(window.location.href);
    return (
        <div>
            {/* <Link > */}
            <div className="flex flex-row items-start p-3.5  bg-bgcolor rounded-lg gap-2">
                <Icon icon={props.iconClass} className="stroke-primary h-6 w-6 grow-0 order-none flex-none" ></Icon><span><p className="non-italic font-bold text-base leading-6 text-primary">{props.itemName}</p></span>
            </div>
            {/* </Link> */}
        </div>
    )
}

export default MenuItems