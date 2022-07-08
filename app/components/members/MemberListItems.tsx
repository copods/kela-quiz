import { Icon } from '@iconify/react'
import type { Role, User } from '@prisma/client'

import moment from 'moment'
import { useState } from 'react'
import ConfirmationPopUp from './ConfirmationPopUp'

export default function MemberListItems({
  user,
  loggedInUser,
}: {
  user: User & { role: Role }
  loggedInUser: string | undefined
}) {
  const [open, setOpen] = useState(false)

  const openPopUp = () => {
    setOpen(!open)
  }
  const description = 'do you wan to delete this user'
  const deletebutton = 'delete'
 const deleteMember='delete'
 const DeleteName="deleteMember"
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="col-span-full grid grid-cols-10 border-b-[1px] border-t-[1px] border-solid border-[#E5E7EB] px-12 py-4">
        <div className="col-span-2 ">
          <h1 className="text-base leading-6 text-gray-700" id='userName'>
            {user.firstName} {user.lastName}
          </h1>
        </div>
        <div className="col-span-3 overflow-ellipsis ">
          <h1 className="text-base leading-6 text-gray-700 break-all pr-2 ">{user.email}</h1>
        </div>
        <div className="col-span-2 overflow-ellipsis">
          <h1 className="text-base leading-6 text-gray-700">
            {user.role.name}
          </h1>
        </div>
        <div className="col-span-2 overflow-ellipsis ">
          <h1 className="text-base leading-6 text-gray-700">
            {moment(user?.createdAt).format("DD MMMM YY")}
          </h1>
        </div>
        <div className="col-span-1 overflow-ellipsis">
          <div className=" flex  gap-5">
            <div>
              {!open ? (
                <button
              
                  name="deleteMember"
                  value={JSON.stringify({ action: 'delete', id: user.id })}
                >
                  <Icon
                   id='deleteButton'
                    onClick={openPopUp}
                    icon="ic:outline-delete-outline"
                    className={`pointer-cursor h-6 w-6 text-red-500 ${
                      loggedInUser === user.id &&
                      'cursor-not-allowed text-red-300'
                    }`}
                  ></Icon>
                </button>
              ) : (
                <ConfirmationPopUp openPopUp={openPopUp} DeleteName={DeleteName} loggedInUser={loggedInUser} user={user} description={description} deletebutton={deletebutton} DeleteValue={deleteMember}  />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




