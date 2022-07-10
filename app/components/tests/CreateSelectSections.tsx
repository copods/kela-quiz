import { Icon } from "@iconify/react"
import { useFetcher, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react"
import type { TestSection } from "../Interface";
import SortFilter from "../SortFilter";
import SelectSectionCard from "./SelectSectionCard";

const SelectSections = ({ sections, setSections }: { sections: Array<TestSection>, setSections: (e: any, i: number) => void }) => {

  const [sortDirection, onSortDirectionChange] = useState('asc')
  const [sortBy, onSortChange] = useState('name')
  const [pseudoDivs, setPseudoDivs] = useState([1])


  const filterByType = [
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'createdAt'
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

  const submit = useSubmit()
  const fetcher = useFetcher()
  useEffect(() => {
    var filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    console.log('filter', filter)
    submit({ data: JSON.stringify(filter) }, { method: "get" })
    // fetcher.submit({ data: JSON.stringify(filter) }, { method: "get" })
  }, [sortDirection, sortBy])

  return (
    <div className="w-full bg-white shadow p-6 rounded-lg flex flex-col gap-6  overflow-x-auto">
      {/* filters */}
      <SortFilter filterData={filterByType} sortDirection={sortDirection} onSortDirectionChange={onSortDirectionChange} sortBy={sortBy} onSortChange={onSortChange} totalItems={sections?.length} />

      {/* Sections list */}
      <div className="flex flex-wrap gap-6">
        {
          sections.map((section: TestSection, i) => {
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