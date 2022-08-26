const StepsTabComponent = ({
  tabs,
  isDisabled,
  currentTab,
  setCurrentTab,
}: {
  tabs: Array<{ id: number; name: string; description: string }>
  isDisabled: boolean
  currentTab: number
  setCurrentTab: (e: number) => void
}) => {
  return (
    <div className="flex w-full gap-4 rounded-lg bg-white p-3 shadow">
      {tabs.map((tab, i) => {
        return (
          <div
            key={tab.id}
            id={tab.id.toString()}
            className={`stepsTab flex-1 ${
              isDisabled ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            onClick={() => {
              setCurrentTab(tab.id)
            }}
          >
            <hr
              className={`mb-3 h-1 w-full rounded-1 border-0 ${
                tab.id === currentTab ||
                (currentTab == tabs[1].id && tab.id == tabs[0].id) ||
                (currentTab == tabs[2].id &&
                  (tab.id == tabs[0].id || tab.id == tabs[1].id))
                  ? 'bg-primary'
                  : 'bg-gray-200'
              }`}
            />
            <div
              title={tab.name}
              className="stepsName mb-1 text-xs font-semibold text-primary"
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
