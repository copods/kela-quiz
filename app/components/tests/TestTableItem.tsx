import moment from 'moment'
import { Icon } from '@iconify/react'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
import DeletePopUp from '../DeletePopUp'
import { useNavigate, useSubmit } from '@remix-run/react'
import TestListActionMenu from '../TestListActionMenu'
import { useEffect, useState } from 'react'
import InviteCandidatePopup from './InviteCandidatePopup'
import { useTranslation } from 'react-i18next'

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
  currentWorkspaceId,
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
  currentWorkspaceId: string
}) => {
  const { t } = useTranslation()

  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const submit = useSubmit()
  const navigate = useNavigate()
  const deleteTest = () => {
    submit(
      {
        action: 'testDelete',
        id: id,
      },
      { method: 'post' }
    )
  }
  useEffect(() => {
    if (deleted === true) {
      setTimeout(() => {
        document.getElementById('1')?.focus()
        setDeleted(false)
      }, 500)
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
        <div className="test-name-navigation w-4/12 cursor-pointer p-1 text-base font-medium text-primary">
          <div
            aria-label={testName}
            title={testName}
            onClick={() => navigate(`/${currentWorkspaceId}/assessments/${id}`)}
            role={'button'}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(`/${currentWorkspaceId}/assessments/${id}`)
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
            className="candidateInviteIcon mt-2 cursor-pointer text-2xl text-primary focus:outline-dotted focus:outline-2"
            icon={'ant-design:user-add-outlined'}
            onClick={() => {
              setCandidatePopupOpen(true)
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') setCandidatePopupOpen(true)
            }}
            aria-label={t('members.inviteMember')}
          />
          <TestListActionMenu
            menuIcon={'mdi:dots-vertical'}
            onItemClick={setShowDeletePopup}
            open={showDeletePopup}
            menuListIcon={'ic:outline-delete-outline'}
            menuListText={'Delete'}
            aria-label={t('testTableItem.menu')}
            id={id}
          />
        </div>
        <DeletePopUp
          setOpen={setShowDeletePopup}
          open={showDeletePopup}
          onDelete={deleteTest}
          setDeleted={setDeleted}
          status={status}
          deleteItem={testName}
          deleteItemType={t('testsConstants.assessment')}
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
