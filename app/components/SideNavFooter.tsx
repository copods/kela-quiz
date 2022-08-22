import { Icon } from '@iconify/react'
import { useUser } from '~/utils'
import { Form } from '@remix-run/react'

function Footer() {
  const user = useUser()
  return (
    <div>
      <hr className="mb-3 mt-3 border border-solid border-gray-300"></hr>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-medium leading-7 text-white">
              {user.firstName.slice(0, 1)}
              {user.lastName.slice(0, 1)}
            </span>
          </div>

          <div className="flex-col gap-2">
            <p className="w-32 truncate text-xs font-semibold leading-4 text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="w-32 truncate text-xs leading-4 text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <Form action="/logout" method="post">
          <button
            type="submit"
            id="logoutButton"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500"
          >
            <Icon
              icon="mdi:logout-variant"
              className="relative h-5 w-5 text-gray-50"
            ></Icon>
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Footer
