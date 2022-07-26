import moment from 'moment'
import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import ChipGroups from './ChipGroups'
import { SectionInTest } from '~/interface/Interface'
const TestTable = ({
  testName,
  createdBy,
  createdAt,
  uniqueId,
  description,
  id,
  sections,
}: {
  uniqueId: number
  testName: string
  createdBy: any
  createdAt: Date
  description: any
  id: any
  sections: Array<SectionInTest>
}) => {
  return (
    <>
      <div
        key={uniqueId}
        className="flex  items-center border-b border-t-0 border-gray-200 px-2 py-3 "
      >
        <div className=" w-16 pl-2 text-sm font-medium leading-6 text-gray-700">
          <input type="checkbox"></input>
        </div>
        <div className="w-1/12 text-sm font-medium leading-6 text-gray-700">
          {uniqueId + 1}
        </div>
        <div className="w-3/12 cursor-pointer truncate pr-4 text-sm font-semibold leading-6  text-gray-700 underline underline-offset-2 ">
          <NavLink to={`/tests/${id}`} key={uniqueId}>
            <span className="text-primary">{testName}</span>
          </NavLink>
        </div>
        <ChipGroups sections={sections} />
        <div className="w-2/12 truncate text-sm font-medium leading-6 text-gray-700">
          {moment(createdAt).format('DD MMMM YY')}
        </div>
        <div className="w-2/12 truncate text-sm font-medium leading-6 text-gray-700">
          {createdBy}
        </div>
        <div className="flex w-1/12  items-center gap-3 truncate text-xl  font-medium leading-6 text-gray-700">
          <div>
            <Icon
              className="cursor-pointer text-[#353988]"
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

export default TestTable
