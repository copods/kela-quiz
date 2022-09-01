import { Icon } from '@iconify/react'
import type { Role, User } from '~/interface/Interface'

import moment from 'moment'
import DeletePopUp from '../DeletePopUp'
import { useEffect, useState } from 'react'
import { useSubmit } from '@remix-run/react'

export default function MemberListItem({
  user,
  loggedInUser,
  actionStatus,
}: {
  user: User & { role?: Role }
  loggedInUser: boolean
  actionStatus: string | undefined
}) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (actionStatus == 'Member Added Successfully..!') {
      setOpen(false)
    }
  }, [actionStatus])
  const openPopUp = () => {
    if (!loggedInUser) setOpen(!open)
  }
  const submit = useSubmit()
  const deleteUser = () => {
    submit({ deleteMember: 'delete', id: user.id }, { method: 'post' })
  }
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="memberRows col-span-full grid grid-cols-10 border-t border-solid border-gray-200 px-12 py-4">
        <div className=" col-span-2 overflow-ellipsis break-all">
          <span className="memberName text-base leading-6 text-gray-700">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="memberMail col-span-3 overflow-ellipsis break-all">
          <span className="text-base leading-6 text-gray-700">
            {user.email}
          </span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all">
          <span className="text-base leading-6 text-gray-700">
            {user?.role?.name}
          </span>
        </div>
        <div className="col-span-2 overflow-ellipsis break-all">
          <span className="text-base leading-6 text-gray-700">
            {moment(user?.createdAt).format('DD MMMM YY')}
          </span>
        </div>
        <div className="col-span-1">
          <button
            onKeyUp={(e) => {
              if (e.key === 'Enter') openPopUp()
            }}
            id="delete-button"
            tabIndex={0}
            name="deleteMember"
            disabled={loggedInUser}
            value={JSON.stringify({ action: 'delete', id: user.id })}
          >
            <Icon
              onClick={openPopUp}
              icon="ic:outline-delete-outline"
              className={`pointer-cursor h-6 w-6 text-red-500 ${
                loggedInUser && 'cursor-not-allowed text-red-300'
              }`}
            />
          </button>
        </div>
        <DeletePopUp setOpen={setOpen} open={open} onDelete={deleteUser} />
      </div>
    </div>
  )
}
