import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"

import SignUp from "~/components/login/SignUp"
import { routes } from "~/constants/route.constants"
import { getInvitedMemberById } from "~/models/invites.server"
import { createUserBySignUp } from "~/models/user.server"
import { createUserSession } from "~/session.server"
import { safeRedirect } from "~/utils"

export type ActionData = {
  errors?: {
    title?: string
    firstNameRequired?: string
    lastNameRequired?: string
    emailRequired?: string
    passNotMatched?: string
    workspaceNameRequired?: string
    enterVaildMailAddress?: string
    status: number
    minPasswordLimit?: string
  }
  resp?: {
    title: string
    status: number
  }
}
export const loader: LoaderFunction = async ({ request }) => {
  let userData
  const inviteId = new URL(request.url).searchParams.get("id")
  if (inviteId) {
    userData = await getInvitedMemberById(inviteId)
  }
  if (inviteId && userData?.email.includes("@copods.co")) {
    return json({ inviteId, userData })
  }
  return redirect("/sing-in")
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const action = JSON.parse(formData.get("signUp") as string)
  const invitedId = formData.get("inviteId")
  const redirectTo = safeRedirect(
    formData.get("redirectTo"),
    invitedId != "null" ? `/workspace/${invitedId}/join` : routes.members
  )

  if (action.action === "add") {
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const password = formData.get("Password")
    const confirmPassword = formData.get("confirmPassword")
    // eslint-disable-next-line no-useless-escape
    const emailFilter = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (typeof firstName !== "string" || firstName.length === 0) {
      return json<ActionData>(
        {
          errors: {
            firstNameRequired: "toastConstants.firstNameRequired",
            status: 400,
          },
        },
        { status: 400 }
      )
    }

    if (typeof lastName !== "string" || lastName.length === 0) {
      return json<ActionData>(
        {
          errors: {
            lastNameRequired: "toastConstants.lastNameRequired",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (typeof email !== "string" || email.length === 0) {
      return json<ActionData>(
        {
          errors: {
            emailRequired: "commonConstants.emailRequired",
            status: 400,
          },
        },
        { status: 400 }
      )
    }

    if (!emailFilter.test(email)) {
      return json<ActionData>(
        {
          errors: {
            enterVaildMailAddress: "toastConstants.correctEmail",
            status: 400,
          },
        },
        { status: 400 }
      )
    }

    if (typeof password !== "string" || password.length < 8) {
      // checking if newly entered password is less than 8 characters then throws error
      return json<ActionData>(
        {
          errors: {
            minPasswordLimit: "settings.minPasswordLimit",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (confirmPassword !== password) {
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

    if (typeof password !== "string" || password.length < 8) {
      // checking if newly entered password is less than 8 characters then throws error
      return json<ActionData>(
        {
          errors: {
            minPasswordLimit: "settings.minPasswordLimit",
            status: 400,
          },
        },
        { status: 400 }
      )
    }
    if (confirmPassword !== password) {
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
    let addHandle = null
    await createUserBySignUp({
      firstName,
      lastName,
      email,
      password,
    })
      .then((res) => {
        addHandle = createUserSession({
          request,
          userId: res?.id,
          remember: false,
          redirectTo,
        })
      })
      .catch((err) => {
        let title = "statusCheck.commonError"
        if (err.code === "P2002") {
          title = "toastConstants.memberAlreadyExist"
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
}
const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center overflow-auto py-11">
      <SignUp />
    </div>
  )
}
export default SignUpPage
