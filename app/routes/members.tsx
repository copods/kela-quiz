import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import MembersList from '~/components/members/MembersList'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  createNewUser,
  deleteUserById,
  getAllRoles,
  getAllUsers,
} from '~/models/user.server'
import MembersHeader from '~/components/members/MembersHeader'

type ActionData = {
  errors?: {
    firstName?: string
    lastName?: string
    email?: string
    roleId?: string
    title?: string
  }
}
type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>
  userId: Awaited<ReturnType<typeof getUserId>>
  roles: Awaited<ReturnType<typeof getAllRoles>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const roles = await getAllRoles()
  if (!userId) return redirect('/sign-in')
  const users = await getAllUsers()
  return json<LoaderData>({ users, roles, userId })
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const action = formData.get('addMember') ? JSON.parse(formData.get('addMember') as string) : JSON.parse(formData.get('deleteMember') as string)

  if (action.action === 'add') {
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const roleId = formData.get('roleId')
    if (typeof firstName !== 'string' || firstName.length === 0) {
      return json<ActionData>(
        { errors: { firstName: 'firstName is required' } },
        { status: 400 }
      )
    }
    if (typeof lastName !== 'string' || lastName.length === 0) {
      return json<ActionData>(
        { errors: { lastName: 'lastName is required' } },
        { status: 400 }
      )
    }
    if (typeof email !== 'string' || email.length === 0) {
      return json<ActionData>(
        { errors: { email: 'email is required' } },
        { status: 400 }
      )
    }
    if (typeof roleId !== 'string' || roleId.length === 0) {
      return json<ActionData>(
        { errors: { roleId: 'roleId is required' } },
        { status: 400 }
      )
    }
    await createNewUser({ firstName, lastName, email, roleId })
  return redirect(`/members`)
  }
  if (action.action === 'delete') {
    if (typeof action.id !== 'string') {
      return json<ActionData>(
        { errors: { title: 'Description is required' } },
        { status: 400 }
      )
    }


    var a = {
      x: {
        ['s']: 34
      }
    }


    await deleteUserById(action.id)
    return redirect(`/members`)

  }
}

export default function Members() {
  const data = useLoaderData() as LoaderData

  return (
    <>
      <AdminLayout>
        <div>
          <div className="">
            <MembersHeader roles={data.roles} />
          </div>
          <MembersList data={data.users} loggedInUser={data.userId} />
        </div>
      </AdminLayout>
    </>
  )
}
