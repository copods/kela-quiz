const StepsTabComponent = ({ tabs, currentTab, setCurrentTab }: { tabs: Array<{ id: number, name: string, description: string }>, currentTab: number, setCurrentTab: (e: number) => void }) => {

  return (
    <div className="w-full bg-white shadow p-3 rounded-lg flex gap-4">
      {tabs.map((tab, i) => {
        return (
          <div key={tab.id} id={tab.id.toString()} className="flex-1 cursor-pointer" onClick={() => setCurrentTab(tab.id)}>
            <hr className={`border-0 w-full rounded-1 h-1 mb-3 ${tab.id === currentTab || (currentTab == tabs[1].id && tab.id == tabs[0].id) || (currentTab == tabs[2].id && (tab.id == tabs[0].id || tab.id == tabs[1].id)) ? 'bg-primary' : 'bg-gray-200'}`} />
            <div title={tab.name} className="text-xs font-semibold text-primary mb-1">
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