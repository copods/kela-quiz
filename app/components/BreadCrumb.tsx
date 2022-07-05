import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const BreadCrumb = ({ data }: { data: Array<{ tabName: string, tabRoute: string }> }) => {

  return (
    <div className="flex" title="breadcrumb menu">
      {
        data.map((breadCrumb, i) => {
          return (<div key={breadCrumb.tabRoute} className="text-sm font-medium flex text-primary" title="menu item">
            <Link to={breadCrumb.tabRoute} className="cursor-pointer">{breadCrumb.tabName}</Link>
            {i != data.length - 1 && <Icon icon="ic:round-keyboard-arrow-right" className="text-gray-500 text-xl " />}
          </div>)
        })
      }
    </div>
  )
}

export default BreadCrumb