import React from 'react'
import Header from '~/components/assessment/Header'
import CreatePassword from '~/components/login/CreatePassword'
import { redirect } from '@remix-run/node'

import type { LoaderFunction, ActionFunction } from '@remix-run/server-runtime'
// import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { createPasswordOfUser } from '~/models/user.server'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.userId, 'testId not found')
  return null
}
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const userId = params.userId
  const enteredPassword = formData.get('enterPassword')
  const reEnteredPassword = formData.get('reEnterPassword')
  if (enteredPassword === reEnteredPassword) {
    await createPasswordOfUser(userId as string, enteredPassword as string)
    return redirect(routes.signIn)
  }

  return null
}
const UserCreatePassword = () => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <CreatePassword />
    </div>
  )
}

export default UserCreatePassword
