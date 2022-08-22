import AdminLayout from '~/components/layouts/AdminLayout'
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import MembersList from '~/components/members/MembersList'
import { json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import {
  createNewUser,
  deleteUserById,
  getAllRoles,
  getAllUsers,
} from '~/models/user.server'
import MembersHeader from '~/components/members/MembersHeader'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export type ActionData = {
  errors?: {
    firstName?: string
    lastName?: string
    email?: string
    roleId?: string
    title?: string
    status?: string
    check?: Date
  }
  resp?: {
    status?: string
    check?: Date
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
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = JSON.parse(formData.get('addMember') as string)
    ? JSON.parse(formData.get('addMember') as string)
    : formData.get('deleteMember')
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

    let addHandle = null

    await createNewUser({ firstName, lastName, email, roleId })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              status: 'Member Added Successfully..!',
              check: new Date(),
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        addHandle = json<ActionData>(
          { errors: { status: err, check: new Date() } },
          { status: 400 }
        )
      })

    return addHandle
  }
  if (action === 'delete') {
    if (typeof formData.get('id') !== 'string') {
      return json<ActionData>(
        { errors: { title: 'Description is required' } },
        { status: 400 }
      )
    }
    let deleteHandle = null
    await deleteUserById(formData.get('id') as string)
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { status: 'Deleted Successfully..!' } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          { errors: { status: err, check: new Date() } },
          { status: 400 }
        )
      })

    return deleteHandle
  }
}
export default function Members() {
  const membersActionData = useActionData() as ActionData
  useEffect(() => {
    if (membersActionData) {
      if (membersActionData.resp?.status) {
        toast.success(membersActionData.resp?.status)
      } else if (membersActionData.errors?.status) {
        toast.error('Something went wrong...!')
      }
    }
  }, [membersActionData])

  return (
    <AdminLayout>
      <div>
        <MembersHeader
          actionStatus={membersActionData?.resp?.check}
          err={membersActionData?.errors?.check}
        />
        <MembersList actionStatus={membersActionData?.resp?.status} />
      </div>
    </AdminLayout>
  )
}
