import { json } from '@remix-run/node'
import {
  createUserBySignUp,
  getUserById,
  deleteUserById,
  getAllRoles,
  getAllUsers,
  updatePassword,
  getUserByEmail,
  loginVerificationResponse,
  sendResetPassword,
} from '~/models/user.server'
import { createUserSession } from '~/session.server'

type ActionData = {
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

export async function createUserBySignUP(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  redirectTo: string,
  request: Request
) {
  return await createUserBySignUp({ firstName, lastName, email, password })
    .then((res) => {
      return createUserSession({
        request,
        userId: res?.id,
        remember: false,
        redirectTo,
      })
    })
    .catch((err) => {
      let title = 'statusCheck.commonError'
      if (err.code === 'P2002') {
        title = 'toastConstants.memberAlreadyExist'
      }
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

export async function getUserByID(userId: string) {
  return await getUserById(userId as string)
}

export async function deleteUserByID(
  id: string,
  workspaceId: string,
  email: string
) {
  return await deleteUserById(id, workspaceId, email)
    .then((res) => {
      return json<ActionData>(
        { resp: { title: 'statusCheck.deletedSuccess', status: 200 } },
        { status: 200 }
      )
    })
    .catch((err) => {
      return json<ActionData>(
        {
          errors: {
            title: 'statusCheck.commonError',
            status: 400,
          },
        },
        { status: 400 }
      )
    })
}

export async function getALLRoles() {
  return await getAllRoles()
}

export async function getALLUsers({
  currentWorkspaceId,
  membersCurrentPage,
  membersItemsPerPage,
}: {
  currentWorkspaceId: string
  membersCurrentPage?: number
  membersItemsPerPage?: number
}) {
  return await getAllUsers({
    currentWorkspaceId,
    membersCurrentPage,
    membersItemsPerPage,
  })
}

export async function updateUserPassword(
  userId: string,
  newPassword: string,
  oldPassword: string
) {
  return await updatePassword(userId, newPassword, oldPassword)
}

export async function getUserBYEmail(email: string) {
  return await getUserByEmail(email)
}

export async function userLoginVerificationResponse(
  email: string,
  password: string
) {
  return await loginVerificationResponse(email, password)
}

export async function sendUserResetPassword(email: string) {
  return await sendResetPassword(email)
}
