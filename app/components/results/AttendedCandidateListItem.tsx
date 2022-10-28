import { Link, useSubmit } from '@remix-run/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TestListActionMenu from '../TestListActionMenu'

const AttendedCandidateListItem = ({
  id,
  candidateId,
  email,
  invitedBy,
  name,
  index,
  result,
  review,
  testId,
  testName,
  candidateResultId,
  endAt,
}: {
  id: string
  candidateId: string
  email: string
  invitedBy: string
  name: string
  index: number
  result: number
  review: boolean
  testId: string
  testName: string
  candidateResultId: string
  endAt: Date
}) => {
  const { t } = useTranslation()
  const [menuListOpen, setmenuListOpen] = useState<boolean>(false)
  const submit = useSubmit()
  const resendInvite = () => {
    submit(
      {
        action: 'resendInvite',
        candidateId: candidateId,
        testId: id,
      },
      { method: 'post' }
    )
  }
  return (
    <div className="col-span-full">
      <div className="col-span-full grid grid-cols-12 gap-3 rounded-b-lg border-t border-solid border-gray-200 bg-white px-12 py-6">
        <div className="col-span-1 flex items-center items-center truncate">
          <span className="text-base text-gray-700">{index}</span>
        </div>
        {endAt ? (
          <Link
            to={`/results/groupByTests/${testId}/${candidateResultId}`}
            className="col-span-3 flex  truncate font-semibold text-primary"
            title={name}
          >
            {name}
          </Link>
        ) : name != ' ' ? (
          <span className="col-span-3 flex items-center truncate" title={name}>
            {name}
          </span>
        ) : (
          <div
            title="No Name"
            className="align-center col-span-3 flex items-center truncate"
          >
            <i>--No Name--</i>
          </div>
        )}
        <div
          title={email}
          tabIndex={0}
          role={'banner'}
          className="col-span-4 flex items-center truncate"
        >
          {email}
        </div>
        <div
          title={invitedBy}
          tabIndex={0}
          role={'banner'}
          className="col-span-2 flex items-center truncate"
        >
          <span className="text-base text-gray-700">{invitedBy}</span>
        </div>
        <div className="col-span-1 flex items-center truncate">
          <span
            tabIndex={0}
            role={'banner'}
            className="text-base text-gray-700"
          >
            {result >= 0 ? `${result}%` : 'NA'}
          </span>
        </div>
        <div
          tabIndex={0}
          role={'banner'}
          className="flex items-center justify-between"
        >
          <span
            className={`rounded-full px-2 py-1 text-xs text-gray-900 ${
              result >= 0 ? 'bg-green-200' : 'bg-yellow-200'
            }`}
          >
            {result >= 0
              ? t('commonConstants.complete')
              : t('commonConstants.pending')}
          </span>
          {result >= 0 ? (
            ''
          ) : (
            <TestListActionMenu
              menuIcon={'mdi:dots-vertical'}
              onItemClick={setmenuListOpen}
              open={menuListOpen}
              menuListText={t('resultConstants.resendInvite')}
              aria-label={t('testTableItem.menu')}
              id={id}
              resendInvite={resendInvite}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AttendedCandidateListItem
