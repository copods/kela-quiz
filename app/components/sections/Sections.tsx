import { Icon } from "@iconify/react"
import { useState } from "react"
import SectionCard from "./SectionCard";
import type { Section } from "@prisma/client";

const Sections = ({ data }: { data: { sections: Array<Section>, selectedSectionId: string } }) => {
  const [sortDirectionAscending, setSortDirection] = useState(true)
  const [selectedSection, setSelectedSection] = useState(data.selectedSectionId)


  const filterByType = [
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'date'
    }
  ]


  return (
    < div className="w-96 flex flex-col gap-6 overflow-auto" >
      {/* filters */}
      <div className="flex justify-between items-center " >
        <div className="flex items-center gap-2.5">
          {
            sortDirectionAscending ?
              <Icon icon="ph:sort-ascending-bold" onClick={() => setSortDirection(false)} className="text-2xl cursor-pointer" /> :
              <Icon icon="ph:sort-descending-bold" onClick={() => setSortDirection(true)} className="text-2xl cursor-pointer" />
          }
          <select className="h-11 rounded-lg border border-gray-200 w-36 test-base px-3">
            {
              filterByType.map((filterBy, i) => {
                return <option key={i} value={filterBy?.value}>{filterBy?.name}</option>
              })
            }
          </select>
        </div>
        <span className="bg-white border border-gray-200 flex justify-center items-center h-11 w-11 rounded-lg">
          {data?.sections?.length}
        </span>
      </div >

      {/* list */}
      {
        data.sections?.map((el: any) => {
          return <SectionCard key={el.id} section={el} selectedSectionId={selectedSection} setSelectedSectionId={setSelectedSection} />
        })
      }
      {
        data.sections.length === 0 && <div className='flex justify-center p-7'>No Record Found</div>
      }
    </div >
  )
}

export default Sections