import AdminLayout from "~/components/layouts/AdminLayout";
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import Member from "~/components/members/members";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import  { getAllUsers } from "~/models/user.server";

type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const users = await getAllUsers();
  return json<LoaderData>({ users });
}

export default function Results() {
  const data = useLoaderData() as LoaderData;
  return (
    <AdminLayout>
      <Member data={data.users} />
    </AdminLayout>
  )
}