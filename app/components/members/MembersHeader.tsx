import AddMemberModal from './AddMemberModal'
import { commonMembers } from '~/constants/common.constants'
import { useLoaderData } from '@remix-run/react'

export default function MembersHeader({
  open,
  setOpen,
  showErrorMessage,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  showErrorMessage: boolean
}) {
  const membersData = useLoaderData()
  return (
    <div className="grid grid-cols-12 pb-12">
      <div className="col-span-full grid">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-9">
            {commonMembers.members}
          </h1>
          <button
            id="addMember"
            className="h-9 rounded-lg bg-blue-900  px-4  text-xs font-medium leading-4 text-[#F0FDF4]"
            onClick={() => setOpen(!open)}
          >
            + {commonMembers.addMember}
          </button>
        </div>
      </div>
      <AddMemberModal
        roles={membersData.roles}
        open={open}
        setOpen={setOpen}
        showErrorMessage={showErrorMessage}
      />
    </div>
  )
}
