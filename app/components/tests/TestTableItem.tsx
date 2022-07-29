import moment from 'moment'
import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
const TestTableItem = ({
  testName,
  createdBy,
  createdAt,
  index,
  description,
  id,
  sections,
  showCheckBox,
}: {
  index: number
  testName: string
  createdBy: any
  createdAt: Date
  description: any
  id: any
  sections: Array<SectionInTest>
  showCheckBox: boolean
}) => {
  return (
    <>
      <div
        key={index}
        id="test-table-list"
        className="flex items-center border-b border-t-0 border-gray-200 px-2 py-3 "
      >
        {showCheckBox && (
          <div className="w-1/12 pl-2 text-sm font-medium leading-6 text-gray-700">
            <input type="checkbox"></input>
          </div>
        )}
        <div
          className="w-1/12 text-sm font-medium leading-6 text-gray-700"
          id="unique-id"
        >
          {index}
        </div>
        <div
          id="test-name-navigation"
          className="w-3/12 cursor-pointer truncate pr-4 text-sm font-semibold leading-6 text-primary underline underline-offset-2 "
        >
          <NavLink to={`/tests/${id}`} key={index}>
            {testName}
          </NavLink>
        </div>
        <div className="w-2/12  text-xs leading-6 ">
          <ChipGroup sections={sections} />
        </div>
        <div className="w-2/12 truncate pr-0 text-sm font-medium leading-6 text-gray-700">
          {moment(createdAt).format('DD MMMM YY')}
        </div>
        <div className="w-2/12 truncate text-sm font-medium leading-6 text-gray-700">
          {createdBy}
        </div>
        <div className="flex w-1/12 items-center gap-3 truncate text-xl font-medium leading-6 text-gray-700">
          <div>
            <Icon
              className="cursor-pointer text-primary"
              icon={'ant-design:user-add-outlined'}
            />
          </div>
          <div>
            <Icon
              className="cursor-pointer"
              icon={'akar-icons:more-vertical'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TestTableItem
