import TabComponent from "./TabsComponent"

const Tabs = ({
  tabs,
}: {
  tabs: { name: string; action: () => void; active: boolean }[]
}) => {
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
