import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from '@remix-run/node'
import { useLoaderData } from "@remix-run/react";
import { getAllSections } from "~/models/sections.server";
import { getAllUsers } from "~/models/user.server";

type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  users: Awaited<ReturnType<typeof getAllUsers>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const sections = await getAllSections()
  const users = await getAllUsers()
  return json<LoaderData>({ sections, users })
}
export default function Section() {
  const data = useLoaderData() as LoaderData
  console.log(data)

  return (
    <div className="flex flex-col gap-12 p-9">
      Sections
    </div>
  )
}