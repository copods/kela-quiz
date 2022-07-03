import { useLoaderData } from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import AdminLayout from "~/components/layouts/AdminLayout"
import AddTestComponent from "~/components/tests/AddTest"
import { getAllSections } from "~/models/sections.server"
import { createTest } from "~/models/tests.server"
import { getUserId, requireUserId } from "~/session.server"

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')

  const sections = await getAllSections()

  return json<LoaderData>({ sections })
}


export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const data: { name: string, description: string, sections: Array<{ sectionId: string, totalQuestions: number, timeInSeconds: number }> } | any = formData.get('data')

  await createTest(createdById, JSON.parse(data))

  return redirect('/tests')
}

const AddTest = () => {
  const data = useLoaderData() as LoaderData

  return (
    <AdminLayout>
      <AddTestComponent sections={data.sections} />
    </AdminLayout>
  )
}

export default AddTest