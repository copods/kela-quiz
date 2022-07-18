import type { Role } from "~/interface/Interface"
import { useState } from "react"
import AddMemberModal from "./AddMemberModal"

export default function MembersHeader({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid grid-cols-12 pb-12">
      <div className="col-span-full grid">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-9">Members</h1>
          <button id="addMember" className="rounded-lg bg-blue-900 px-4  h-9  text-xs font-medium leading-4 text-[#F0FDF4]" onClick={() => setOpen(!open)}>
            + Add Member
          </button>
        </div>
      </div>
      <AddMemberModal roles={roles} open={open} setOpen={setOpen} />
    </div>
  )
}