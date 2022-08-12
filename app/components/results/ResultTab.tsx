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
    <div className="flex w-full flex-1  text-totalCount">
      <div className="p flex flex-row">
        {tabs.map((tab) => {
          return (
            <>
              <div
                key={tab.id}
                className="cursor-pointer"
                onClick={() => setCurrentTab(tab.id)}
              >
                <div
                  title={tab.title}
                  className={`${
                    tab.id === currentTab
                      ? 'font-semibold text-primary'
                      : 'font-normal text-totalCount'
                  } mb-3 pr-6 text-base`}
                >
                  {tab.title}
                </div>
                <hr
                  className={`h-1 w-full rounded-1 border-0 ${
                    tab.id === currentTab ? 'bg-primary ' : 'bg-gray-200'
                  } `}
                />
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ResultTab
