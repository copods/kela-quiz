import moment from 'moment'
import { Icon } from '@iconify/react'
import { NavLink } from '@remix-run/react'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
import DeletePopUp from '../DeletePopUp'
import { useSubmit } from '@remix-run/react'
import TestListActionMenu from '../TestListActionMenu'
import { useState } from 'react'
import InviteCandidatePopup from './InviteCandidatePopup'
const TestTableItem = ({
  testName,
  createdBy,
  createdAt,
  index,
  id,
  sections,
  showCheckBox,
  totalCount,
  status,
}: {
  index: number
  testName: string
  createdBy: string
  createdAt: Date
  id: any
  sections: Array<SectionInTest>
  showCheckBox: boolean
  totalCount: number
  status: string | undefined
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
  const [candidatePopupOpen, setCandidatePopupOpen] = useState<boolean>(false)

  return (
    <>
      <div
        key={index}
        id="test-table-list"
        className="test-table-list flex items-center border-b border-t-0 border-gray-200 bg-white py-3 px-9 "
      >
        {showCheckBox && (
          <div className="w-1/12 pl-2.5 text-base font-normal leading-6 text-gray-700">
            <input type="checkbox" />
          </div>
        )}
        <div
          className="w-1/12 pl-2.5 text-base font-normal leading-6 text-gray-700"
          id="unique-id"
        >
          {index}
        </div>
        <div className="test-name-navigation w-4/12 cursor-pointer truncate pl-3 pr-4 text-base font-medium leading-6 text-primary  ">
          <NavLink to={`/tests/${id}`} key={index}>
            <span id="test-name-navigation">{testName}</span>
          </NavLink>
        </div>
        <div id="chip-group-id" className="mr-4 flex w-2/12 text-xs leading-6 ">
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
        <div className="flex w-1/12 ">
          <div onClick={() => setCandidatePopupOpen(true)}>
            <Icon
              className="cursor-pointer text-2xl text-primary"
              icon={'ant-design:user-add-outlined'}
            />
          </div>
          <div>
            <TestListActionMenu
              menuIcon={'mdi:dots-vertical'}
              onItemClick={setIsDelete}
              menuListIcon={'ic:outline-delete-outline'}
              menuListText={'Delete'}
            />
          </div>
        </div>
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteTest}
        status={status}
      />
      <InviteCandidatePopup
        openInvitePopup={candidatePopupOpen}
        setOpenInvitePopup={setCandidatePopupOpen}
        testName={testName}
        testId={id}
      />
    </>
  )
}

export default TestTableItem
