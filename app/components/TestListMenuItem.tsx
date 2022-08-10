import { Menu } from '@headlessui/react'
import { Icon } from '@iconify/react'

const TestListMenuItem = ({
  menuIcon,
  onClick,
  menuListIcon,
  menuListText,
}: {
  menuIcon: string
  onClick: Function
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
        <Menu.Items className="absolute right-0 z-40 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  name="deleteTest"
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  }  delete-test group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => {
                    onClick(true)
                  }}
                >
                  {active ? (
                    <Icon
                      icon={menuListIcon}
                      className="mr-2 h-5 w-5 "
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon
                      icon={menuListIcon}
                      className="mr-2 h-5 w-5 text-[#EF4444]"
                      aria-hidden="true"
                    />
                  )}
                  {menuListText}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </>
  )
}

export default TestListMenuItem
