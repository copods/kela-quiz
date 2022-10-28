import React, { useEffect, useState } from 'react'
import Header from '~/components/assessment/Header'
import CreatePassword from '~/components/login/CreatePassword'
import { redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import type { LoaderFunction, ActionFunction } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import { createPasswordOfUser, getAllUsers } from '~/models/user.server'
import { routes } from '~/constants/route.constants'

export const loader: LoaderFunction = async ({ request, params }) => {
  const getUsers = await getAllUsers()
  const userId = getUsers.filter((item) => {
    return item?.id === params.userId
  })
  if (userId[0]?.id !== params.userId) {
    throw new Response('Not Found', {
      status: 404,
    })
  }
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

  if (enteredPassword !== reEnteredPassword) {
    return 'not equal'
  }

  return null
}
const UserCreatePassword = () => {
  const action = useActionData() as string
  const [checkErrorStatus, setCheckErrorStatus] = useState(false)
  useEffect(() => {
    if (action === 'not equal') {
      setCheckErrorStatus(true)
    }
  }, [action])
  return (
    <div className="flex h-full flex-col">
      <Header />
      <CreatePassword checkErrorStatus={checkErrorStatus} />
    </div>
  )
}

export default UserCreatePassword
