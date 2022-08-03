import type { SectionInTest } from '~/interface/Interface'
import { Menu } from '@headlessui/react'
const ChipGroup = ({ sections }: { sections: Array<SectionInTest> }) => {
  return (
    <div className="chip-group">
      <span className=" rounded-[52px] bg-bgcolor py-1 px-2">
        {sections[0]?.section.name}
      </span>
      {sections.length > 1 && (
        <Menu as="div" className=" relative inline-block text-left">
          <Menu.Button>
            <span
              id="section-count-button"
              className="  ml-2 cursor-pointer rounded-[52px] bg-bgcolor py-1 px-2 pl-2 text-xs"
            >
              + {sections.length - 1}
            </span>
          </Menu.Button>
          <Menu.Items className="section-menu absolute right-0 z-40 mt-2 max-h-52 origin-top-right overflow-auto rounded-md bg-white py-4 px-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sections.map((sect, i) => {
              return (
                <>
                  <div className=" flex flex-col px-2 py-2">
                    <Menu.Item>
                      <span className="text-sm">
                        <span className="truncate rounded-md bg-bgcolor px-2 ">
                          {sect?.section?.name}
                        </span>
                      </span>
                    </Menu.Item>
                  </div>
                </>
              )
            })}
          </Menu.Items>
        </Menu>
      )}
    </div>
  )
}

export default ChipGroup
