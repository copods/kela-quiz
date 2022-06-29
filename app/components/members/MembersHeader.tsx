import type{ Role } from "@prisma/client"
import { useState } from "react"
import AddMembers from "./AddMembers"

export  default function MembersHeader({roles}: {roles: Role[]}){
  const [addMemberModal, setAddMemberModalValue] = useState(false)
  return(
    <div className="grid grid-cols-12 pb-12">
       <div className="col-span-full grid">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold leading-9">Members</h1>
              <button className="rounded-lg bg-blue-900 px-4  h-9  text-xs font-medium leading-4 text-[#F0FDF4]" onClick={() => setAddMemberModalValue(!addMemberModal)}>
                + Add Member
              </button>
            </div>
          </div>
          <AddMembers roles={roles} addMemberModalOpen={addMemberModal} setAddSectionModalOpen={setAddMemberModalValue} />
    </div>
  )
}