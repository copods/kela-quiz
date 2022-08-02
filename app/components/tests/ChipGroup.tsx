import type { SectionInTest } from '~/interface/Interface'
import { Menu } from '@headlessui/react'
const ChipGroup = ({
  sections,
  totalCount,
  index,
}: {
  sections: Array<SectionInTest>
  totalCount: number
  index: number
}) => {
  return (
    <div className="chip-group">
      <span className=" rounded-[52px] bg-bgcolor py-1 px-2">
        {sections[0].section.name}
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
          <Menu.Items
            className={`section-menu absolute z-40  max-h-52  overflow-auto rounded-md bg-white py-4 px-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              totalCount === index ||
              totalCount - 1 === index ||
              totalCount - 2 === index ||
              totalCount - 3 === index
                ? `${
                    sections.length > 3
                      ? 'left-4 top-[-200px]'
                      : 'left-4 top-[-100px]'
                  }`
                : 'right-0'
            } `}
          >
            {sections.map((sect, i) => {
              return (
                <>
                  <div className=" flex flex-col px-2 py-2">
                    <Menu.Item>
                      <span className="text-sm">
                        <span className="truncate rounded-[52px] bg-bgcolor px-2 py-1 ">
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
