
import { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import { CommonMembersConstants } from '~/constants/common.constants'
import { useLoaderData } from '@remix-run/react'

export default function MembersHeader({

  actionStatus,
  er,
}: {
  
  actionStatus: Date | undefined
  er: Date | undefined
}) {
 
  const [open, setOpen] = useState(false)
  useEffect(() => {
    er ? setOpen(true) : setOpen(false)
  }, [actionStatus, er])
  const data = useLoaderData() 
  return (
    <div className="grid grid-cols-12 pb-12">
      <div className="col-span-full grid">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-9">
            {CommonMembersConstants.Members}
          </h1>
          <button
            id="addMember"
            className="h-9 rounded-lg bg-blue-900  px-4  text-xs font-medium leading-4 text-[#F0FDF4]"
            onClick={() => setOpen(!open)}
          >
            {CommonMembersConstants.Add_Member}
          </button>
        </div>
      </div>
      <AddMemberModal roles={data.roles} open={open} setOpen={setOpen} />
    </div>
  )
}
