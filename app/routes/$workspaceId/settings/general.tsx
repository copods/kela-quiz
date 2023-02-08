import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import GeneralSettings from "~/components/settings/GeneralSettings"
import { routes } from "~/constants/route.constants"
import { updateUserPassword } from "~/services/user.service"
import { getUserId } from "~/session.server"
export type ActionData = {
  errors?: {
    status?: number
    valid?: string
    passNotMatched?: string
    maximumPasswordLimit?: string
    passShouldNotBeSame?: string
    error?: string
  }
  resp?: {
    title: string
    status: number
  }
}

type LoaderData = {
  userId: Awaited<ReturnType<typeof getUserId>>
}
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)

  return json<LoaderData>({ userId })
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData() // getting formData
  const action = formData.get("resetPassword") as string
  if (action === "resetPassword") {
    // action will perform if match with specific formData
    const userId = await getUserId(request)
    const oldPassword = formData.get("oldPassword")
    const newPassword = formData.get("newPassword")
    const confirmPasword = formData.get("confirmNewPassword")

    if (confirmPasword !== newPassword) {
      // checking if newly entered password and confirm password is matched or not
      return json<ActionData>(
        {
          errors: {
            passNotMatched: "settings.passNotMatch",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      // checking if newly entered password is less than 8 characters then throws error
      return json<ActionData>(
        {
          errors: {
            maximumPasswordLimit: "settings.minPasswordLimit",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (newPassword === oldPassword) {
      // checking if current and newly entered password is same then throwing a error
      return json<ActionData>(
        {
          errors: {
            passShouldNotBeSame: "settings.passShouldNotBeSame",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (newPassword === confirmPasword) {
      // new password will be update if this condition is true
      const general = await updateUserPassword(
        userId as string,
        newPassword as string,
        oldPassword as string
      )
      if (general instanceof Error) {
        // if old password user entered is not correct which is handled in backend
        return json<ActionData>(
          { errors: { valid: "statusCheck.passIsInvalid" } },
          { status: 400 }
        )
      }
      return general
    }
  }
}
const GeneralSetting = () => {
  return (
    <div>
      <GeneralSettings />
    </div>
  )
}
export default GeneralSetting
