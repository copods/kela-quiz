import { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import { members } from '~/constants/common.constants'
import { useLoaderData } from '@remix-run/react'

export default function MembersHeader({
  actionStatus,
  err,
}: {
  actionStatus: Date | undefined
  err: Date | undefined
}) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    err ? setOpen(true) : setOpen(false)
  }, [actionStatus, err])
  const membersData = useLoaderData()
  return (
    <div className="grid grid-cols-12 pb-12">
      <div className="col-span-full grid">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-9">{members.members}</h1>
          <button
            tabIndex={0}
            id="addMember"
            className="h-9 rounded-lg bg-blue-900  px-4  text-xs font-medium leading-4 text-[#F0FDF4]"
            onClick={() => setOpen(!open)}
          >
            + {members.addMember}
          </button>
        </div>
      </div>
      <AddMemberModal roles={membersData.roles} open={open} setOpen={setOpen} />
    </div>
  )
}
