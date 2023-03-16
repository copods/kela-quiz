import type { TabsComponent } from "~/interface/Interface"

const TabComponent = ({ tab }: { tab: TabsComponent }) => {
  return (
    <div
      id={tab.name.replace(" ", "_")}
      tabIndex={0}
      role={"button"}
      onClick={tab.route}
      onKeyUp={(e) => e.key === "Enter" && tab.route()}
      className="relative flex cursor-pointer flex-col-reverse rounded-lg"
    >
      <hr
        className={`absolute -bottom-0.5 h-0.5 w-full border-0 ${
          tab.active ? "bg-primary" : "bg-transparent"
        }`}
      />
      <div
        className={`px-6 py-4 text-base  ${
          tab.active
            ? "font-semibold text-primary"
            : "font-normal text-gray-600"
        }`}
      >
        {tab.name}
      </div>
    </div>
  )
}
export default TabComponent
