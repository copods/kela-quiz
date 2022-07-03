import AdminLayout from "~/components/layouts/AdminLayout";
import { getUserId } from '~/session.server'
import { redirect } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'
import TestList from "~/components/tests/TestList";
import { getAllTests } from "~/models/tests.server";
import { json } from '@remix-run/node'
import { useLoaderData } from "@remix-run/react";


type LoaderData = {
  tests: Awaited<ReturnType<typeof getAllTests>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')
  const tests = await getAllTests()
  return json<LoaderData>({ tests })
}


export default function Results() {
  const data = useLoaderData() as LoaderData
  return (
    <AdminLayout>
      <TestList tests={data.tests} />
    </AdminLayout>
  )
}
