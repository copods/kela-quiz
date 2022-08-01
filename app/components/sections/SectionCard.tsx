import { Icon } from '@iconify/react'
import moment from 'moment'
import { Menu } from '@headlessui/react'
import { useSubmit } from '@remix-run/react'
import DeletePopUp from '../DeletePopUp'
import { useState, useEffect } from 'react'

const SectionCard = ({
  name,
  isActive,
  questionsCount,
  createdBy,
  createdAt,
  id,
  err,
  actionStatusData,
}: {
  name: string
  isActive: boolean
  questionsCount: number
  createdBy: string
  createdAt: string
  id: string
  err: any
  actionStatusData: any
}) => {
  // console.log(id, 'id')
  const [isDelete, setIsDelete] = useState(false)
  const submit = useSubmit()
  const deleteSection = () => {
    submit({ deleteSection: 'sectionDelete', id: id }, { method: 'post' })
  }
  useEffect(() => {
    if (actionStatusData == 'Deleted Successfully..!') {
      setIsDelete(false)
    }
  }, [actionStatusData])

  return (
    <div
      className={`flex flex-col gap-2 rounded-lg p-6 ${
        isActive
          ? 'border border-l-8 border-transparent border-l-primary bg-white pl-[17px] shadow-md'
          : 'border border-gray-300 bg-gray-100'
      }`}
      id="section-card"
    >
      <div className="flex items-center justify-between break-all">
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
        <div className="flex">
          <Menu as="div" className=" relative inline-block text-left">
            <Menu.Button>
              <Icon
                className="text-2xl text-gray-600"
                icon={'mdi:dots-vertical'}
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      name="deleteSection"
                      className={`${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
      <div className="flex text-xs text-gray-400">
        <span>By {createdBy}</span>
        <span className="created-by-date flex">
          <Icon className="text-base" icon={'mdi:circle-small'} />
          {moment(createdAt).format('DD MMM YY')}
        </span>
      </div>
      <div className="flex text-xs text-gray-400">
        Total Questions: {questionsCount}
      </div>
      <DeletePopUp
        setOpen={setIsDelete}
        open={isDelete}
        onDelete={deleteSection}
      />
    </div>
  )
}

export default SectionCard
