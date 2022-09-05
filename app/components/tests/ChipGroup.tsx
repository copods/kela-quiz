import type { SectionInTest } from '~/interface/Interface'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
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
    <div className="chip-group mr-3 flex items-center gap-2">
      <div className="truncate rounded-52 bg-bgcolor px-1 py-1">
        {sections[0]?.section.name}
      </div>
      {sections.length > 1 && (
        <Menu as="div" className="relative inline-block text-left">
          <div id="section-count-button">
            <Menu.Button>
              <div aria-label={`+ ${sections.length - 1} Sections in Test`} className="cursor-pointer rounded-52 bg-bgcolor px-1 py-1 text-xs">
                + {sections.length - 1}
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              id="menu-items"
              className="sectionMenu absolute z-40 max-h-52 overflow-auto rounded-md bg-white py-4 px-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {sections.map((sect) => {
                return (
                  <div className=" flex flex-col px-2 py-2" key={sect?.section?.id}>
                    <Menu.Item>
                      <span className="text-sm">
                        <span className="truncate rounded-52 bg-bgcolor px-2 py-1">
                          {sect?.section?.name}
                        </span>
                      </span>
                    </Menu.Item>
                  </div>
                )
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}

export default ChipGroup
