import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { Fragment } from 'react'

const TestListMenuItem = ({
  menuIcon,
  onItemClick,
  menuListIcon,
  menuListText,
}: {
  menuIcon: string
  onItemClick: (e: boolean) => void
  menuListIcon: string
  menuListText: string
}) => {
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button>
          <Icon
            className="text-2xl text-gray-600"
            icon={menuIcon}
            id="vertical-icon"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-40 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  tabIndex={0}
                    name="deleteTest"
                    className={`${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }  delete-test group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      onItemClick(true)
                    }}
                  >
                    <Icon
                      icon={menuListIcon}
                      className={`${
                        !active && 'text-deleteColor'
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {menuListText}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default TestListMenuItem
