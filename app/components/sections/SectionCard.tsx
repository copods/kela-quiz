import { Icon } from '@iconify/react'
import moment from 'moment'
import { Menu } from '@headlessui/react'
import { useSubmit } from '@remix-run/react'
import DeletePopUp from '../DeletePopUp'
import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import AddSection from './AddSection'
const SectionCard = ({
  name,
  description,
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
  editMode,
  setEditMode,
}: {
  name: string
  description: string
  isActive: boolean
  questionsCount?: number
  createdBy: string
  createdAt: Date
  id: string
  err?: string
  actionStatusData?: string
  setDeleted?: (e: boolean) => void
  setIsDelete: (e: boolean) => void
  isDelete: boolean
  editMode: boolean
  setEditMode: (e: boolean) => void
}) => {
  const { t } = useTranslation()
  const submit = useSubmit()

  const [editItem, setEditItem] = useState({
    id: '',
    name: '',
    description: '',
  })

  const editSection = (name: string, description: string) => {
    submit(
      {
        editSection: 'sectionEdit',
        id: id,
        name: name,
        description: description,
      },
      {
        method: 'post',
        action: `/sections`,
      }
    )
  }

  const deleteSection = () => {
    submit({ deleteSection: 'sectionDelete', id: id }, { method: 'post' })
  }
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
      className={`sectionCard section-card flex flex-col gap-2 rounded-lg p-5 pt-4 ${
        isActive
          ? 'border border-l-8 border-transparent border-l-primary bg-white pl-13 shadow-md'
          : 'border border-gray-300 bg-gray-100'
      }`}
      id="section-card"
    >
      <div className="flex items-center justify-between">
        <h2 className="sectionName break-all text-xl font-semibold text-gray-700">
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
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div className="flex flex-col gap-1">
                      <button
                        tabIndex={0}
                        data-cy="edit-section"
                        className="text-gray-primary undefined inline-flex w-36 items-center justify-start bg-white px-2 py-2 text-xs font-medium text-primary transition delay-75 ease-in-out hover:bg-gray-100"
                        onClick={() => {
                          setEditMode(true)
                          setEditItem({
                            id: id,
                            name: name,
                            description: description,
                          })
                        }}
                        name="editSection"
                        title={t('commonConstants.edit')}
                      >
                        <>
                          <Icon
                            icon={'material-symbols:edit-outline-sharp'}
                            className="mr-2 h-5 w-5
                        text-black"
                            aria-hidden="true"
                          />
                          {t('commonConstants.edit')}
                        </>
                      </button>
                      <button
                        tabIndex={0}
                        data-cy="delete-section"
                        className="text-gray-primary undefined inline-flex w-36 items-center justify-start bg-white px-2 py-2 text-xs font-medium text-primary transition delay-75 ease-in-out hover:bg-gray-100"
                        onClick={() => {
                          setIsDelete(true)
                        }}
                        name="deleteSection"
                        title={t('commonConstants.delete')}
                      >
                        <>
                          <Icon
                            icon={'ic:outline-delete-outline'}
                            className="mr-2 h-5 w-5
                        text-red-500"
                            aria-hidden="true"
                          />
                          {t('commonConstants.delete')}
                        </>
                      </button>
                    </div>
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
        {t('sectionsConstants.totalQuestions')} {questionsCount}
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteSection}
        subAlert={t('deletePopUp.subAlert')}
        deleteItem={name}
        deleteItemType={t('sectionsConstants.sectionName')}
        setDeleted={setDeleted}
      />
      <AddSection
        open={editMode}
        setOpen={setEditMode}
        showErrorMessage={false}
        editItem={editItem}
        editSection={editSection}
      />
    </div>
  )
}

export default SectionCard
