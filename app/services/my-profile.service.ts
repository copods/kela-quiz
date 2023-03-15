import { json } from "@remix-run/node"

import { updateUserData } from "~/models/user.server"

type ActionData = {
  errors?: {
    title: string
    status: number
  }
  resp?: {
    title: string
    status: number
  }
}

export async function updateUserProfile({
  userId,
  firstName,
  lastName,
}: {
  userId: string
  firstName: string
  lastName: string
}) {
  return await updateUserData(userId, firstName, lastName)
    .then((res) => {
      return json<ActionData>(
        {
          resp: {
            title: "toastConstants.userProfileUpdatedSuccessfully",
            status: 200,
          },
        },
        { status: 200 }
      )
    })
    .catch((err) => {
      let title = "statusCheck.commonError"
      return json<ActionData>(
        {
          errors: {
            title,
            status: 400,
          },
        },
        { status: 400 }
      )
    })
}
