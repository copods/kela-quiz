const TabComponent = ({
  tabs,
  isDisabled,
  currentTab,
  setCurrentTab,
}: {
  tabs: Array<{ id: number; name: string }>
  isDisabled: boolean
  currentTab: number
  setCurrentTab: (e: number) => void
}) => {
  const indexDisable = () => {
    if (!isDisabled) return 0
  }
  return (
    <div className="flex w-full gap-4 rounded-lg">
      {tabs.map((tab, i) => {
        return (
          <div
            tabIndex={indexDisable()}
            role={'button'}
            key={tab.id}
            id={tab.id.toString()}
            className={`stepsTab flex flex-col-reverse gap-4 p-1 ${
              isDisabled ? 'pointer-events-none' : 'cursor-pointer'
            }`}
            onClick={() => {
              setCurrentTab(tab.id)
            }}
            aria-label={`${tab.name}`}
            onKeyUp={(e) => {
              if (e.key === 'Enter') setCurrentTab(tab.id)
            }}
          >
            <hr
              className={`mb-3 h-1 w-full rounded-1 border-0 ${
                tab.id === currentTab ? 'bg-primary' : 'bg-transparent'
              }`}
            />

            <div
              className={`text-base font-semibold  ${
                tab.id === currentTab ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {tab.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TabComponent
