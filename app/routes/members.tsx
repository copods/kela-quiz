import AdminLayout from "~/components/layouts/AdminLayout";
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction , ActionFunction} from '@remix-run/node'
import MembersList from "~/components/members/MembersList";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import  { createNewUser, getAllRoles, getAllUsers } from "~/models/user.server";
import MembersHeader from "~/components/members/MembersHeader";

type ActionData = {
  errors?: {
    firstName?: string
    lastName?: string
    email?:string
    roleId?:string
  }
}
type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>;
  roles: Awaited<ReturnType<typeof getAllRoles>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  const roles = await getAllRoles()
  if (!userId) return redirect('/sign-in')
  const users = await getAllUsers();
  return json<LoaderData>({ users, roles });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
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


  const user = await createNewUser({ firstName, lastName, email,roleId})

  return redirect(`/members`)
}

export default function Results() {

  const data = useLoaderData() as LoaderData;
 

  return (
    <>
     
    <AdminLayout>
      <div>
        <div className="">
        <MembersHeader roles={data.roles} />
        </div>
      <MembersList data={data.users}  />
      </div>
    </AdminLayout>
    </>
    
  )
}