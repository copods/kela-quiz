import { Icon } from "@iconify/react"
import type { Section, User } from "@prisma/client"
import { useEffect, useState } from "react"
import type { TestSection } from "../Interface";
import SelectSectionCard from "./SelectSectionCard";

const SelectSections = ({ sections, setSections }: { sections: Array<TestSection>, setSections: (e: any, i: number) => void }) => {

  const [sortDirectionAscending, setSortDirection] = useState(true)
  const [pseudoDivs, setPseudoDivs] = useState([1])


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

  useEffect(() => {
    if (window.innerWidth > 1842 && sections.length % 4 != 0) {
      sections.length % 4 == 1 ? setPseudoDivs([1, 2, 3]) : sections.length % 4 == 2 ? setPseudoDivs([1, 2]) : setPseudoDivs([1])
    }
    else if (window.innerWidth > 1441 && sections.length % 3 != 0) {
      sections.length % 3 == 1 ? setPseudoDivs([1, 2]) : setPseudoDivs([1])
    }
    else if (window.innerWidth > 1086 && sections.length % 2 != 0) {
      setPseudoDivs([1])
    } else {
      setPseudoDivs([])
    }
  }, [sections.length])

  return (
    <div className="w-full bg-white shadow p-6 rounded-lg flex flex-col gap-6  overflow-x-auto">
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
          {sections?.length}
        </span>
      </div>

      {/* Sections list */}
      <div className="flex flex-wrap gap-6">
        {
          sections.map((section: (Section & { _count: { questions: number }; createdBy: User }), i) => {
            return (
              // <SelectSectionCard selectedSection={getSectionWiseValue(section.id)} getDataFn={getData} section={section} key={section.id} />
              <SelectSectionCard section={section} updateSection={(e) => setSections(e, i)} key={section.id} />
            )
          })
        }
        {
          pseudoDivs.map(temp => {
            return <div key={temp} className="h-1 flex-1 w-sectionCard min-w-sectionCard border border-transparent px-5 py-6" ></div>
          })
        }
      </div>

    </div >
  )
}

export default SelectSections