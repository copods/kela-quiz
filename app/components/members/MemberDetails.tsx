import { Icon } from '@iconify/react'
import { Form } from '@remix-run/react'
import moment from 'moment'

export default function MemberDetails({user}:any) {

  return (
    <div className='grid grid-cols-10 col-span-full'>
      <div
        className="col-span-full grid grid-cols-10 border-b-[1px] border-t-[1px] border-solid border-[#E5E7EB] px-12 py-4"
      >
        <div className="col-span-2 ">
          <h1 className="text-base leading-6 text-gray-700">
            {user.firstName}
          </h1>
        </div>
        <div className="col-span-3 ">
          <h1 className="text-base leading-6 text-gray-700">{user.email}</h1>
        </div>
        <div className="col-span-2 ">
          <h1 className="text-base leading-6 text-gray-700">
            {user.role.name}
          </h1>
        </div>
        <div className="col-span-2 ">
          <h1 className="text-base leading-6 text-gray-700">
            {moment(user?.createdAt).format('DD MMM YY')}
          </h1>
        </div>
        <div className="col-span-1">
          <div className=" flex  gap-5">
            <div>
              <button type="submit">
                <Icon
                  icon="eva:edit-2-outline"
                  className="h-6 w-6 text-blue-900 "
                ></Icon>
              </button>
            </div>
            <div>
              <Form method="post" action={`/members/delete/${user.id}`}>
                <button type="submit">
                  <Icon
                    icon="ic:outline-delete-outline"
                    className="h-6 w-6 text-red-500 "
                  ></Icon>
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
