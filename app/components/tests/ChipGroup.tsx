import { Fragment, useRef, useState } from "react"

import { Menu, Transition } from "@headlessui/react"

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
  let [isViewPortVisible, setIsViewPortVisible] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)
  const isInViewport = () => {
    const rect: any = inputRef && inputRef.current?.getBoundingClientRect()
    return (
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <=
        (window.innerHeight - 100 || document?.documentElement.clientHeight) &&
      rect?.right <=
        (window.innerWidth || document?.documentElement.clientWidth)
    )
  }

  return (
    <div className="chip-group mr-3 flex items-center gap-2" ref={inputRef}>
      <div className="truncate rounded-52 bg-blue-50 px-2 py-1.5 text-xs text-gray-900">
        {sections[0]?.section.name}
      </div>
      {sections.length > 1 && (
        <Menu as="div" className="relative inline-block text-left">
          <div id="section-count-button">
            <Menu.Button onClick={() => setIsViewPortVisible(isInViewport())}>
              <div
                aria-label={`+ ${sections.length - 1} Sections in Test`}
                className="cursor-pointer rounded-52 bg-blue-50 px-2 py-1.5 text-xs text-gray-900"
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
              className={`sectionMenu absolute top-9 z-40 max-h-52 overflow-auto rounded-2xl bg-white py-4 px-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isViewPortVisible ? "" : "-top-1 -translate-y-full transform"
              } flex flex-col gap-4 border-gray-300 shadow-2xl`}
            >
              {sections.map((sect) => {
                return (
                  <Menu.Item key={sect?.section?.id}>
                    <span className="truncate rounded-52 bg-blue-50 px-2 py-1.5 text-xs text-gray-900">
                      {sect?.section?.name}
                    </span>
                  </Menu.Item>
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
