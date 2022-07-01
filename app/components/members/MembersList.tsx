import type { User } from '@prisma/client'
import MemberListItems from './MemberListItems'

export default function MembersList({ data,loggedInUser }: {data: User[],loggedInUser:string | undefined} ){
  return (
    <div className="grid grid-cols-12 bg-[#F9FAFB] ">
      <div className="col-span-full grid grid-cols-10 rounded-lg border-[1px] border-solid border-[#E5E7EB] bg-white">
        <div className="col-span-full grid grid-cols-10 py-4  px-12">
          <h1 className="col-span-2 text-sm  leading-4 text-gray-500">Name</h1>
          <h1 className="col-span-3 text-sm leading-4 text-gray-500">Email</h1>
          <h1 className="col-span-2 text-sm leading-4 text-gray-500">Role</h1>
          <h1 className="col-span-2 text-sm leading-4 text-gray-500">
            Added On
          </h1>
          <h1 className="col-span-1 text-sm leading-4 text-gray-500">Action</h1>
        </div>
        {data.map((user: any) => (
          <div key={user.id} className="grid col-span-10">
            <MemberListItems user={user} loggedInUser={loggedInUser} />
          </div>
        ))}
      </div>
    </div>
  )
}
