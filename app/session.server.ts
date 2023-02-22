import { createCookieSessionStorage, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"

import { getDefaultWorkspaceIdForUserQuery } from "./models/workspace.server"
import { encryptId } from "./utils"

import type { User } from "~/models/user.server"
import { getUserById } from "~/models/user.server"

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set")

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
})

const USER_SESSION_KEY = "userId"
const USER_WORKSPACE_KEY = "workspaceId"

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie")
  return sessionStorage.getSession(cookie)
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getWorkspaceId(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request)
  const workspaceId = session.get(USER_WORKSPACE_KEY)
  return workspaceId
}

export async function getDefaultWorkspaceIdForUser(userId: string) {
  const workspaceId = await getDefaultWorkspaceIdForUserQuery(userId as string)
  return workspaceId?.workspace[0]?.id
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (userId === undefined) return null

  const user = await getUserById(userId)
  if (user) return encryptId(user)

  throw await logout(request)
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request)
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
    throw redirect(`/sign-in?${searchParams}`)
  }
  return userId
}

export async function requireWorkspaceId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const workspaceId = await getWorkspaceId(request)
  if (!workspaceId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
    throw redirect(`/sign-in?${searchParams}`)
  }
  return workspaceId
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request)

  const user = await getUserById(userId)
  if (user) return encryptId(user)

  throw await logout(request)
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
  workspace,
}: {
  request: Request
  userId: string
  remember: boolean
  redirectTo: string
  workspace?: string
}) {
  const workspaceId = workspace
    ? workspace
    : await getDefaultWorkspaceIdForUser(userId as string)
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)
  session.set(USER_WORKSPACE_KEY, workspaceId)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 30 // 30 days
          : 60 * 60 * 24 * 7, //7 days,
      }),
    },
  })
}

export async function logout(request: Request) {
  const session = await getSession(request)
  const joinId = new URL(request.url).searchParams.get("?cameFrom") === "join"
  if (joinId) {
    return redirect(
      `/sign-in?cameFrom=join&id=${new URL(request.url).searchParams.get(
        "id"
      )}`,
      {
        headers: {
          "Set-Cookie": await sessionStorage.destroySession(session),
        },
      }
    )
  }
  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  })
}
