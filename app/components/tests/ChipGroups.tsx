import { Section, SectionInTest } from '~/interface/Interface'
const ChipGroups = ({ sections }: { sections: Array<SectionInTest> }) => {
  return (
    <>
      {' '}
      {sections.length === 1 && (
        <div className="w-2/12 text-xs leading-6  ">
          <span className=" rounded-[52px] bg-[#EFF6FF] py-1 px-2 text-[#111827] ">
            {sections.map((sect, i) => {
              return sect?.section?.name
            })}
          </span>
        </div>
      )}
      {sections.length > 1 && (
        <div className="w-2/12  leading-6 ">
          <span className="mr-1 rounded-[52px] bg-[#EFF6FF] py-1 px-2 text-xs text-[#111827] ">
            {sections[0].section.name}
          </span>

          <span className=" rounded-[52px] bg-[#EFF6FF] py-1 px-2 pl-2 text-xs  text-[#111827] ">
            + {sections.length - 1}
          </span>
        </div>
      )}
    </>
  )
}

export default ChipGroups
