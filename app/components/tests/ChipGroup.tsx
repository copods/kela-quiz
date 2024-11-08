import { Fragment } from "react"

import { Menu, Transition } from "@headlessui/react"

import { useElementPositionHandler } from "~/hooks/useElementPositionHandler"
import type { SectionInTest } from "~/interface/Interface"

const ChipGroup = ({
  sections,
  totalCount,
  index,
}: {
  sections: Array<SectionInTest>
  totalCount: number
  index?: number
}) => {
  const {
    elementRef,
    componentRef,
    elementViewPortVisiblility,
    setIsElementOpen,
  } = useElementPositionHandler()

  return (
    <div className="chip-group mr-3 flex items-center gap-2" ref={elementRef}>
      <div className="rounded-52 truncate bg-blue-50 px-1.5 py-1.5 text-xs text-gray-900">
        {sections[0]?.section.name}
      </div>
      {sections.length > 1 && (
        <Menu as="div" className="relative inline-block text-left">
          <div id="section-count-button">
            <Menu.Button
              onClick={() => {
                setIsElementOpen((prev) => !prev)
              }}
            >
              <div
                aria-label={`+ ${sections.length - 1} Sections in Test`}
                className="rounded-52 cursor-pointer bg-blue-50 px-1 py-1 text-xs text-gray-900"
              >
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
              className={`sectionMenu absolute top-8 z-40 max-h-52 overflow-auto rounded-2xl bg-white px-4 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                elementViewPortVisiblility
                  ? ""
                  : "-top-1 -translate-y-full transform"
              }  border-gray-300 shadow-2xl`}
            >
              <div ref={componentRef} className="flex flex-col gap-4">
                {sections.map((sect) => {
                  return (
                    <Menu.Item key={sect?.section?.id}>
                      <span className="rounded-52 truncate bg-blue-50 px-2 py-1.5 text-xs text-gray-900">
                        {sect?.section?.name}
                      </span>
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}

export default ChipGroup
