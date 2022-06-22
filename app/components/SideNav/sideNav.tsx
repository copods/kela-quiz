import MenuItems from "./menuItems";
import Header from "../header";

let SideNavGuide =[
    {
        navGuide : "Main Menu",
        subItem : [
            {
                iconClass : "mdi:view-dashboard",
                itemName : "Dashboard"
            },
            {
                iconClass : "mdi:chart-box-outline",
                itemName : "Results"
            }
        ]
    },
    {
        navGuide : "Assessments",
        subItem : [
            {
                iconClass : "carbon:result",
                itemName : "Tests"
            },
            {
                iconClass : "ci:list-checklist-alt",
                itemName : "Sections"
            }
        ]
    },
    {
        navGuide : "General",
        subItem : [
            {
                iconClass : "mdi:account-group",
                itemName : "Members"
            },
            {
                iconClass : "mdi:cog",
                itemName : "Settings"
            }
        ]
    }
]

function SideNav () {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="flex flex-col gap-8">
            {SideNavGuide.map(guide => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <div className="gap-1 flex flex-col" >
                        <p className="text-[#9CA3AF]  text-xs non-italic font-semibold leading-4 text-left pb-2 pl-2">{guide.navGuide}</p>
                        {guide.subItem.map(item => {
                            // eslint-disable-next-line react/jsx-key
                            return (<MenuItems iconClass={item.iconClass} itemName={item.itemName} />)
                        })}
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default SideNav;
