import { useLoaderData } from "@remix-run/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import { useEffect } from "react"
import { toast } from "react-toastify"
import type { Section } from "~/components/Interface"
import AdminLayout from "~/components/layouts/AdminLayout"
import AddTestComponent from "~/components/tests/AddTest"
import { getAllSections } from "~/models/sections.server"
import { createTest } from "~/models/tests.server"
import { getUserId, requireUserId } from "~/session.server"

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  status: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect('/sign-in')

  const filter = Object.fromEntries(new URL(request.url).searchParams.entries()).data ? JSON.parse(Object.fromEntries(new URL(request.url).searchParams.entries()).data) : {}

  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections(filter)
    .then(res => {
      sections = res
      status = 'success'
    })
    .catch(err => {
      status = err
    })
  console.log(sections[0].name)
  return json<LoaderData>({ sections, status })
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

  if (data.status != "success") {
    toast.success("Something went wrong..!")
  }

  return (
    <AdminLayout>
      <AddTestComponent sections={data.sections} />
      {/* <div>hi</div>  */}
    </AdminLayout>
  )
}

export default AddTest