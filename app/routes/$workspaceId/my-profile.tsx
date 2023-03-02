import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { redirect } from "@remix-run/server-runtime"

import MyProfileComponent from "~/components/my-profile/MyProfile"
import { routes } from "~/constants/route.constants"
import { getUserByID } from "~/services/members.service"
import { updateUserProfile } from "~/services/my-profile.service"
import { getUserId } from "~/session.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const getUserData = await getUserByID(userId)
  return getUserData
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const userId = formData.get("id") as string
  return await updateUserProfile({ userId, firstName, lastName })
}

const MyProfile = () => {
  return <MyProfileComponent />
}

export default MyProfile
