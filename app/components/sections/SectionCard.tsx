import { Icon } from '@iconify/react'
import moment from 'moment'
import { Menu } from '@headlessui/react'
import { useSubmit } from '@remix-run/react'
import DeletePopUp from '../DeletePopUp'
import { useEffect } from 'react'

import {
  commonConstants,
  deletePopUp,
  sectionsConstants,
  statusCheck,
} from '~/constants/common.constants'
const SectionCard = ({
  name,
  isActive,
  questionsCount,
  createdBy,
  createdAt,
  id,
  err,
  actionStatusData,
  setDeleted,
  setIsDelete,
  isDelete,
}: {
  name: string
  isActive: boolean
  questionsCount?: number
  createdBy: string
  createdAt: Date
  id: string
  err?: string
  actionStatusData?: string
  setDeleted?: (e: boolean) => void
  setIsDelete?: (e: boolean) => void | undefined
  isDelete: boolean
}) => {
  const submit = useSubmit()
  const deleteSection = () => {
    submit({ deleteSection: 'sectionDelete', id: id }, { method: 'post' })
  }
  useEffect(() => {
    if (
      actionStatusData == statusCheck.deletedSuccess &&
      setIsDelete !== undefined
    ) {
      // setIsDelete(false)
    }
  }, [actionStatusData])
  // shift + alt + Tab combination key for get back focus to selected section card
  useEffect(() => {
    window.addEventListener('keydown', function (event) {
      if (event.shiftKey && event.altKey && event.key === 'Tab') {
        window.location.href = '#section-card'
      }
    })
  }, [])
  return (
    <div
      className={`sectionCard flex flex-col gap-2 rounded-lg p-5 pt-4 ${
        isActive
          ? 'border border-l-8 border-transparent border-l-primary bg-white pl-17 shadow-md'
          : 'border border-gray-300 bg-gray-100'
      }`}
      id="section-card"
    >
      <div className="flex items-center justify-between">
        <h2 className="sectionName text-xl font-semibold text-gray-700">
          {name}
        </h2>
        <div className="flex">
          <Menu
            as="div"
            className="verticalDots relative inline-block text-left"
          >
            <Menu.Button className={id}>
              <Icon
                className="text-2xl text-gray-600"
                icon={'mdi:dots-vertical'}
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      tabIndex={0}
                      className="text-gray-primary undefined inline-flex w-36 items-center justify-start rounded-md rounded-md border border-primary bg-white py-2.5 px-5 px-2 py-2 text-xs font-medium text-primary shadow-sm transition delay-75 ease-in-out hover:bg-gray-100"
                      onClick={() => {
                        if (setIsDelete !== undefined) setIsDelete(true)
                      }}
                      name="deleteSection"
                      title={commonConstants.delete}
                    >
                      <>
                        <Icon
                          icon={'ic:outline-delete-outline'}
                          className={`} mr-2 h-5 w-5
                        text-red-500`}
                          aria-hidden="true"
                        />
                        {commonConstants.delete}
                      </>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="flex text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span id="sectionDate" className="created-by-date flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        {sectionsConstants.totalQuestions} {questionsCount}
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteSection}
        subAlert={deletePopUp.subAlert}
        deleteItem={name}
        deleteItemType={sectionsConstants.sectionName}
        setDeleted={setDeleted}
      />
    </div>
  )
}

export default SectionCard
