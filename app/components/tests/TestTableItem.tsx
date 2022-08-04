import moment from 'moment'
import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
import { Menu } from '@headlessui/react'
import DeletePopUp from '../DeletePopUp'
import { useState } from 'react'
import { useSubmit } from '@remix-run/react'
const TestTableItem = ({
  testName,
  createdBy,
  createdAt,
  index,
  id,
  sections,
  showCheckBox,
  totalCount,
}: {
  index: number
  testName: string
  createdBy: any
  createdAt: Date
  id: any
  sections: Array<SectionInTest>
  showCheckBox: boolean
  totalCount: number
}) => {
  const [isDelete, setIsDelete] = useState(false)
  const submit = useSubmit()
  const deleteTest = () => {
    submit(
      {
        deleteTest: 'testDelete',
        id: id,
      },
      { method: 'post' }
    )
  }

  return (
    <>
      <div
        key={index}
        id="test-table-list"
        className="flex items-center border-b border-t-0 border-gray-200 bg-white py-3 px-9 "
      >
        {showCheckBox && (
          <div className="w-1/12 pl-2.5 text-base font-normal leading-6 text-gray-700">
            <input type="checkbox"></input>
          </div>
        )}
        <div
          className="w-1/12 pl-2.5 text-base font-normal leading-6 text-gray-700"
          id="unique-id"
        >
          {index}
        </div>
        <div className="w-4/12 cursor-pointer truncate pl-3 pr-4 text-base font-medium leading-6 text-primary  ">
          <NavLink to={`/tests/${id}`} key={index}>
            <span id="test-name-navigation">{testName}</span>
          </NavLink>
        </div>
        <div id="chip-group-id" className="w-2/12 text-xs leading-6 ">
          <ChipGroup
            sections={sections}
            totalCount={totalCount}
            index={index}
          />
        </div>
        <div className="w-2/12 truncate pr-0 text-base font-normal leading-6 text-gray-700">
          {moment(createdAt).format('DD MMMM YY')}
        </div>
        <div className="w-3/12 truncate text-base font-normal leading-6 text-gray-700">
          {createdBy}
        </div>
        <div className="  flex w-1/12 items-center justify-end gap-3 truncate pr-4 text-xl font-normal  leading-6  text-gray-700">
          <div>
            <Icon
              className="cursor-pointer text-primary"
              icon={'ant-design:user-add-outlined'}
            />
          </div>
          <div>
            <Menu as="div" className="  inline-block text-left">
              <Menu.Button>
                <Icon
                  className="text-2xl text-gray-600"
                  icon={'mdi:dots-vertical'}
                  id="vertical-icon"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-[7%] w-56 origin-top-left translate-y-[-45px] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        name="deleteTest"
                        className={`${
                          active ? 'bg-primary text-white' : 'text-gray-900'
                        }  delete-test group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          setIsDelete(true)
                        }}
                      >
                        {active ? (
                          <Icon
                            icon={'ic:outline-delete-outline'}
                            className="mr-2 h-5 w-5 "
                            aria-hidden="true"
                          />
                        ) : (
                          <Icon
                            icon={'ic:outline-delete-outline'}
                            className="mr-2 h-5 w-5 text-[#EF4444]"
                            aria-hidden="true"
                          />
                        )}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteTest}
      />
    </>
  )
}

export default TestTableItem
