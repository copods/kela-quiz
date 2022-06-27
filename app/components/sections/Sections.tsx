import { Icon } from "@iconify/react"
import { Link } from "@remix-run/react"
import { useState } from "react"

const Sections = ({ data }: any) => {
  const [selectedSection, setSelectedSection] = useState(data.selectedSectionId)
  const [sortDirectionAscending, setSortDirection] = useState(true)

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

  const getClassName = (id: string) => {
    var tempClasses = "rounded-2xl p-6 flex flex-col gap-2 "
    if (id === selectedSection) {
      tempClasses += "bg-white border pl-[17px] border-transparent shadow-md border-l-8 border-copods"
    } else {
      tempClasses += "bg-gray-100 border border-gray-200"
    }
    return tempClasses
  }

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
          return <div onClick={() => setSelectedSection(el.id)} key={el.id}>
            <Link to={'/admin/sections/' + el.id} className={getClassName(el.id)}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">{el.name}</h2>
                <Icon className="text-2xl text-gray-600" icon={'mdi:dots-vertical'} />
              </div>
              <div className="text-xs text-gray-400 flex">
                <span>By {el?.user?.lastName}</span>
                <span className="flex">
                  <Icon className="text-base" icon={'mdi:circle-small'} />
                  {el?.createdAt}
                </span>
              </div>
              <div className="text-xs text-gray-400 flex">
                Total Questions: {el?.questions?.length}
              </div>
            </Link>
          </div>
        })
      }
    </div >
  )
}

export default Sections