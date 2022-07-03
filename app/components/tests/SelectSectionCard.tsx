import { Icon } from "@iconify/react"
import Moment from 'moment';
import type { TestSections } from "../Interface";

const SelectSectionCard = ({ section, updateSection }: { section: TestSections, updateSection: (e: any) => void }) => {

  const updateThisSection = (target: string, value?: string, selected?: boolean) => {
    var temp = {
      isSelected: section.isSelected,
      totalQuestions: section.totalQuestions,
      time: section.time
    }
    switch (target) {
      case 'isSelected':
        temp.isSelected = selected
        break
      case 'totalQuestions':
        temp.totalQuestions = parseInt(value || '')
        break
      case 'time':
        temp.time = parseInt(value || '')
        break
    }
    updateSection(temp)
  }

  return (
    <div className={`flex-1 flex flex-col gap-2 w-sectionCard min-w-sectionCard rounded-2xl border ${section.isSelected ? 'border-[3px] border-primary bg-white px-[18px] py-[22px]' : 'border-gray-300 bg-gray-100 px-5 py-6'}`}>
      <div className="flex justify-between items-start">
        <h3 title={section.name} className="flex-1 text-xl font-semibold text-gray-700">{section.name}</h3>
        {
          section.isSelected
            ?
            <button className="h-6 text-[9px] bg-red-500 rounded text-white px-4" onClick={() => { updateThisSection('isSelected', '', false) }}>Remove</button>
            :
            <button className="h-6 text-[9px] bg-primary rounded text-white px-4" onClick={() => { updateThisSection('isSelected', '', true) }}>Add</button>
        }
      </div >
      <div className="text-xs text-gray-400 flex">
        <span>By {section?.createdBy?.firstName} {section?.createdBy?.lastName}</span>
        <span className="flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {Moment(section?.createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="text-xs text-gray-400 flex">
        Total Questions: {section?._count.questions}
      </div>
      <hr className="border-0 w-full bg-gray-300 h-px" />
      <div className="pt-1 flex gap-4">
        <div>
          <label htmlFor="noOfQuestion" className="text-xs font-medium text-gray-600">Total Questions</label>
          <input type="number" name="noOfQuestion" value={section.totalQuestions} onChange={(e) => updateThisSection('totalQuestions', e.target.value)} className={`w-full h-11 rounded-lg border border-gray-300 text-xs px-3 mt-1 ${section.isSelected ? 'bg-white' : 'bg-gray-200'}`} placeholder="Total Questions" disabled={!section.isSelected} />
        </div>
        <div>
          <label htmlFor="totalTime" className="text-xs font-medium text-gray-600">Total Time</label>
          <input type="number" name="totalTime" value={section.time} onChange={(e) => updateThisSection('time', e.target.value)} className={`w-full h-11 rounded-lg border border-gray-300 text-xs px-3 mt-1 ${section.isSelected ? 'bg-white' : 'bg-gray-200'}`} placeholder="Time(min)" disabled={!section.isSelected} />
        </div>
      </div>
    </div >
  )
}

export default SelectSectionCard