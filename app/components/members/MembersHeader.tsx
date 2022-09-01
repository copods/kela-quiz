import { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import { members } from '~/constants/common.constants'
import { useLoaderData } from '@remix-run/react'

export default function MembersHeader({
  actionStatus,
}: {
  actionStatus: boolean
}) {
  const membersData = useLoaderData()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (actionStatus) {
      setOpen(false)
    }
  }, [actionStatus])

  return (
    <>
      <div className="flex items-center justify-between pb-12">
        <h1 className="text-3xl font-bold leading-9 membersHeading">{members.members}</h1>
        <button
          id="add-member"
          className="h-9 rounded-lg bg-blue-900 px-4 text-xs font-medium leading-4 text-[#F0FDF4]"
          onClick={() => setOpen(true)}
        >
          + {members.addMember}
        </button>
      </div>
      <AddMemberModal roles={membersData.roles} open={open} setOpen={setOpen} />
    </>
  )
}
