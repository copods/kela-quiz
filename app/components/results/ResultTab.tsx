const ResultTab = ({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: Array<{ id: number; title: string }>
  currentTab: number
  setCurrentTab: (e: number) => void
}) => {
  return (
    <div className="flex gap-8">
      {tabs.map((tab) => {
        return (
          <div
            key={tab.id}
            className={`${
              tab.id === currentTab ? 'border-b-4 border-primary' : ''
            } "  cursor-pointer `}
            onClick={() => setCurrentTab(tab.id)}
          >
            <div
              id="tab-title"
              title={tab.title}
              className={`${
                tab.id === currentTab
                  ? 'font-semibold text-primary'
                  : 'font-normal text-totalCount'
              } mb-3 text-base`}
            >
              {tab.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultTab
