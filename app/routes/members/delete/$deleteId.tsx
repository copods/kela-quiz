import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'

import {} from '~/models/sections.server'

import { deleteUserById } from '~/models/user.server'

interface ActionData {
  errors?: {
    title?: string
    body?: string
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  console.log(params)

  if (typeof params.deleteId !== 'string' || params.deleteId.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Description is required' } },
      { status: 400 }
    )
  }

  await deleteUserById(params.deleteId)

  return redirect('/members')
}

export const loader: LoaderFunction = async () => {
  return redirect('/members')
}
