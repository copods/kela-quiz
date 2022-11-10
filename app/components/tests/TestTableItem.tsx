import moment from 'moment'
import ChipGroup from './ChipGroup'
import type { SectionInTest } from '~/interface/Interface'
import DeletePopUp from '../DeletePopUp'
import { useNavigate, useSubmit } from '@remix-run/react'
import TestListActionMenu from '../TestListActionMenu'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  return (
    <>
      <div className="col-span-full grid grid-cols-12">
        <div
          key={id}
          className={`${
            index === totalCount ? 'rounded-b-md' : ''
          } test-table-list col-span-full grid grid-cols-12 gap-3 border-t border-solid border-gray-200 px-6 py-4`}
        >
          {showCheckBox && (
            <div className="col-span-1 text-base font-normal text-gray-700">
              <input name="checkbox" tabIndex={0} type="checkbox" />
            </div>
          )}
          <div
            className="break-word col-span-1 overflow-ellipsis pl-4 text-base font-normal text-gray-700"
            id="unique-id"
          >
            {index}
          </div>
          <div className="test-name-navigation break-word col-span-3 cursor-pointer overflow-ellipsis p-1 pl-4 text-base font-medium text-primary">
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
          <div
            id="chip-group-id"
            className="break-word col-span-3 overflow-ellipsis pl-4 text-xs"
          >
            <ChipGroup
              sections={sections}
              totalCount={totalCount}
              index={index}
            />
          </div>
          <div className="break-word col-span-2 truncate overflow-ellipsis pl-4 text-base font-normal text-gray-700">
            {moment(createdAt).format('DD MMMM YY')}
          </div>
          <div className="break-word col-span-2 truncate overflow-ellipsis pl-4 text-base font-normal text-gray-700">
            {createdBy}
          </div>
          <div className="break-word col-span-1 overflow-ellipsis pl-4">
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
            deleteItemType={t('testsConstants.test')}
          />
        </div>
      </div>
    </>
  )
}

export default TestTableItem
