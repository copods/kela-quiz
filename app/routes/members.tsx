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
import { routes } from '~/constants/route.constants'

export type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
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
  if (!userId) return redirect(routes.signIn)
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
    const roleId = formData.get('roleId');
    const emailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (typeof firstName !== 'string' || firstName.length === 0) {
      return json<ActionData>(
        { errors: { title: 'Firstname is required', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof lastName !== 'string' || lastName.length === 0) {
      return json<ActionData>(
        { errors: { title: 'Lastname is required', status: 400 } },
        { status: 400 }
      )
    }
    if (typeof email !== 'string' || email.length === 0) {
      return json<ActionData>(
        { errors: { title: 'Email is required', status: 400 } },
        { status: 400 }
      )
    }
    if (!emailFilter.test(email)) {
      return json<ActionData>(
        { errors: { title: 'Please provide a valid email address', status: 400 } },
        { status: 400 }
      )
  }
    if (typeof roleId !== 'string' || roleId.length === 0) {
      return json<ActionData>(
        { errors: { title: 'Role is required', status: 400 } },
        { status: 400 }
      )
    }

    let addHandle = null

    await createNewUser({ firstName, lastName, email, roleId })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              title: 'Member Added Successfully..!',
              status: 200,
            },
          },
          { status: 200 }
        )
      })
      .catch((err) => {
        let title = 'Something went wrong. Please try again.'
        if (err.code === 'P2002') {
          title = 'Member with this email id already exists!'
        }
        addHandle = json<ActionData>(
          {
            errors: {
              title,
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return addHandle
  }
  if (action === 'delete') {
    if (typeof formData.get('id') !== 'string') {
      return json<ActionData>(
        { errors: { title: 'Description is required', status: 400 } },
        { status: 400 }
      )
    }
    let deleteHandle = null
    await deleteUserById(formData.get('id') as string)
      .then((res) => {
        deleteHandle = json<ActionData>(
          { resp: { title: 'Deleted Successfully..!', status: 200 } },
          { status: 200 }
        )
      })
      .catch((err) => {
        deleteHandle = json<ActionData>(
          {
            errors: {
              title: 'Something went wrong. Please try again',
              status: 400,
            },
          },
          { status: 400 }
        )
      })

    return deleteHandle
  }
}
const Members = () => {
  const membersActionData = useActionData() as ActionData
  useEffect(() => {
    if (membersActionData) {
      if (membersActionData.resp?.status === 200) {
        toast.success(membersActionData.resp?.title)
      } else if (membersActionData.errors?.status === 400) {
        toast.error(membersActionData.errors?.title, {
          toastId: membersActionData.errors?.title,
        })
      }
    }
  }, [membersActionData])

  return (
    <AdminLayout>
      <>
        <MembersHeader actionStatus={membersActionData?.resp?.status === 200} />
        <MembersList actionStatus={membersActionData?.resp?.title} />
      </>
    </AdminLayout>
  )
}

export default Members
