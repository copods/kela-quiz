export interface tabProps {
  itemName: string
}

const CandidateSideNavItems = ({ itemName }: tabProps) => {
  return (
    <div>
      <div id="menuItem">
        <div className="flex flex-row items-start gap-2 rounded-lg bg-blue-50 p-3.5 ">
          <div className="flex flex-row items-center gap-2">
            <span>
              <p
                id={itemName}
                className="non-italic text-sm font-bold	 leading-6 
                text-primary"
              >
                {itemName}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CandidateSideNavItems
