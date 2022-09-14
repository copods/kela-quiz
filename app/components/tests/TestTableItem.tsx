import moment from 'moment'
import { Icon } from '@iconify/react'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
import DeletePopUp from '../DeletePopUp'
import { useNavigate, useSubmit } from '@remix-run/react'
import TestListActionMenu from '../TestListActionMenu'
import { useEffect, useState } from 'react'
import InviteCandidatePopup from './InviteCandidatePopup'
import { testTableItem } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'


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
  id: string
  sections: Array<SectionInTest>
  showCheckBox: boolean
  totalCount: number
  status: string | undefined
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const submit = useSubmit()
  const navigate = useNavigate()
  const deleteTest = () => {
    submit(
      {
        deleteTest: 'testDelete',
        id: id,
      },
      { method: 'post' }
    )
  }
  useEffect(() => {
    if (deleted === true) {
      setTimeout(() => {
        document.getElementById(`${index + 1}`)?.focus()
        setDeleted(false)
      }, 25)
    }
  }, [deleted])
  const [candidatePopupOpen, setCandidatePopupOpen] = useState<boolean>(false)
  return (
    <>
      <div
        key={id}
        className={`${
          index === totalCount ? 'rounded-b-md' : ''
        } test-table-list flex items-center gap-3 border-b border-gray-200 bg-white py-6 px-9`}
      >
        {showCheckBox && (
          <div className="w-1/12 text-base font-normal text-gray-700">
            <input name="checkbox" tabIndex={0} type="checkbox" />
          </div>
        )}
        <div
          className="w-1/12 text-base font-normal text-gray-700"
          id="unique-id"
        >
          {index}
        </div>
        <div className="test-name-navigation w-4/12 cursor-pointer truncate p-1 text-base font-medium text-primary">
          <div
            aria-label={testName}
            title={testName}
            onClick={() => navigate(`${routes.tests}/${id}`)}
            role={'button'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`${routes.tests}/${id}`)
            }}
            id={`${index}`}
            tabIndex={0}
            key={id}
          >
            <span id="test-name-navigation">{testName}</span>
          </div>
        </div>
        <div id="chip-group-id" className="flex w-3/12 text-xs">
          <ChipGroup
            sections={sections}
            totalCount={totalCount}
            index={index}
          />
        </div>
        <div className="w-2/12 truncate text-base font-normal text-gray-700">
          {moment(createdAt).format('DD MMMM YY')}
        </div>
        <div className="w-2/12 truncate text-base font-normal text-gray-700">
          {createdBy}
        </div>
        <div className="flex w-1/12 gap-2">
          <Icon
            id="invite-popup-open"
            role={'button'}
            tabIndex={0}
            className="candidateInviteIcon cursor-pointer text-2xl text-primary"
            icon={'ant-design:user-add-outlined'}
            onClick={() => {
              setCandidatePopupOpen(true)
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') setCandidatePopupOpen(true)
            }}
            aria-label={testTableItem.inviteMember}
          />
          <TestListActionMenu
            menuIcon={'mdi:dots-vertical'}
            onItemClick={setShowDeletePopup}
            open={showDeletePopup}
            menuListIcon={'ic:outline-delete-outline'}
            menuListText={'Delete'}
            aria-label={testTableItem.menu}
          />
        </div>
        <DeletePopUp
          setOpen={setShowDeletePopup}
          open={showDeletePopup}
          onDelete={deleteTest}
          setDeleted={setDeleted}
        />
        <InviteCandidatePopup
          openInvitePopup={candidatePopupOpen}
          setOpenInvitePopup={setCandidatePopupOpen}
          testName={testName}
          testId={id}
        />
      </div>
    </>
  )
}

export default TestTableItem
