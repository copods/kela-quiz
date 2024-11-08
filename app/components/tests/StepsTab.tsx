const StepsTabComponent = ({
  tabs,
  disabledTabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: Array<{ id: number; name: string; description: string }>
  disabledTabs: Array<boolean>
  currentTab: number
  setCurrentTab: (e: number) => void
}) => {
  return (
    <div className="flex w-full gap-4 rounded-lg bg-white p-3 shadow">
      {tabs.map((tab, i) => {
        return (
          <div
            tabIndex={disabledTabs[i] ? -1 : 0}
            role={"button"}
            key={tab.id}
            id={tab.id.toString()}
            className={`stepsTab flex-1 p-1 ${
              tab.name !== tabs[0].name
                ? disabledTabs[i]
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (disabledTabs[i]) return
              setCurrentTab(tab.id)
            }}
            aria-label={`${tab.name} ${tab.description}`}
            onKeyUp={(e) => {
              if (e.key === "Enter") setCurrentTab(tab.id)
            }}
          >
            <hr
              className={`rounded-1 mb-3 h-1 w-full border-0 ${
                tab.id === currentTab ||
                (currentTab == tabs[1].id && tab.id == tabs[0].id) ||
                (currentTab == tabs[2].id &&
                  (tab.id == tabs[0].id || tab.id == tabs[1].id))
                  ? "bg-primary"
                  : "bg-gray-200"
              }`}
            />
            <div
              title={tab.name}
              className="stepsName text-primary mb-1 text-xs font-semibold"
            >
              {tab.name}
            </div>
            <div className="text-xs font-medium text-gray-500">
              {tab.description}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StepsTabComponent
