export default function Member({ data }: any) {
  return (
    <div>
      <div className="p-6">
        <div className="grid grid-cols-12 gap-12  bg-[#F9FAFB] ">
          <div className="col-span-full grid">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold leading-9">Members</h1>
              <button className="rounded-lg bg-blue-900 px-4  py-2  text-sm font-medium leading-4 text-[#F0FDF4]">
                + Add Member
              </button>
            </div>
          </div>
          <div className="col-span-full grid grid-cols-10 bg-white border-[1px] border-solid border-[#E5E7EB] rounded-lg">
            <div className="col-span-full grid grid-cols-10 py-4  px-12">
              <h1 className="col-span-2 text-sm  text-gray-500 leading-4">Name</h1>
              <h1 className="col-span-2 text-sm text-gray-500 leading-4">Email</h1>
              <h1 className="col-span-2 text-sm text-gray-500 leading-4">Role</h1>
              <h1 className="col-span-2 text-sm text-gray-500 leading-4">Added On</h1>
              <h1 className="col-span-2 text-sm text-gray-500 leading-4">Action</h1>
            </div>

            {data.map((user: any) => (
              <div key={user.id} className="col-span-full grid grid-cols-10 px-12 py-4 border-b-[1px] border-t-[1px] border-solid border-[#E5E7EB]">
                <div className="col-span-2 ">
                  <h1 className="text-base leading-6 text-gray-700">{user.firstName}</h1>
                </div>
                <div className="col-span-2 ">
                  <h1 className="text-base leading-6 text-gray-700">{user.email}</h1>
                </div>
                <div className="col-span-2 ">
                  <h1 className="text-base leading-6 text-gray-700">{user.lastName}</h1>
                </div>
                <div className="col-span-2 ">
                  <h1 className="text-base leading-6 text-gray-700">{user.createdAt}</h1>
                </div>
                <div className="col-span-2 ">
                  <h1 className="text-base leading-6 text-gray-700">{user.firstName}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}