import TabComponent from "../common-components/TabsComponent"

const Tabs = ({ tabs }: { tabs: { name: string; route: string }[] }) => {
  return (
    <div
      className="tabsWrapper flex border-b-2 border-solid
     border-gray-300"
    >
      {tabs.map((tab, i) => {
        return <TabComponent key={i} tab={tab} />
      })}
    </div>
  )
}
export default Tabs
