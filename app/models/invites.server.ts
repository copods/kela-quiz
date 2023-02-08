import type { Invites } from "@prisma/client"
import { prisma } from "~/db.server"
import { sendMail, sendMemberInvite } from "./sendgrid.servers"
import { env } from "process"
import faker from "@faker-js/faker"
import bcrypt from "bcryptjs"

export async function inviteNewUser({
  email,
  roleId,
  invitedByWorkspaceId,
  userId,
}: {
  email: string
  roleId: string
  userId?: string
  invitedByWorkspaceId: string
}) {
  const res = await prisma.invites.create({
    data: {
      email,
      roleId,
      workspaceId: invitedByWorkspaceId,
      userId: userId,
    },
    select: {
      invitedForWorkspace: {
        select: {
          name: true,
        },
      },
      id: true,
      invitedById: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
  if (res) {
    const invite = res
    const workspaceJoinLink =
      env.PUBLIC_URL + "/workspace/" + invite.id + "/join"
    const name = ((invite.invitedById?.firstName as string) +
      " " +
      invite.invitedById?.lastName) as string
    return await sendMemberInvite(
      email,
      name as string,
      workspaceJoinLink as string
    )
  }
  return res
}
export async function getInvitedMemberById(id: Invites["id"]) {
  return prisma.invites.findUnique({
    where: { id },
    select: {
      id: true,
      joined: true,
      email: true,
      invitedById: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      invitedForWorkspace: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })
}
export async function deleteMemberInvite(id: string) {
  try {
    return await prisma.invites.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date().toString(),
      },
    })
  } catch (error) {
    return "Something went wrong"
  }
}

export async function getAllInvitedMemberCount(workspaceId: string) {
  const invitedMemberCount = await prisma.invites.count({
    where: {
      deleted: false,
      workspaceId,
      OR: [
        {
          joined: {
            equals: null,
          },
        },
        {
          joined: {
            equals: false,
          },
        },
      ],
    },
  })
  return invitedMemberCount
}

export async function getAllInvitedMember(
  workspaceId: string,
  invitedMembersCurrentPage?: number,
  invitedMembersItemsPerPage?: number
) {
  return await prisma.invites.findMany({
    take: invitedMembersItemsPerPage,
    skip: (invitedMembersCurrentPage! - 1) * invitedMembersItemsPerPage!,
    where: {
      deleted: false,
      workspaceId,
      OR: [
        {
          joined: {
            equals: null,
          },
        },
        {
          joined: {
            equals: false,
          },
        },
      ],
    },
    include: {
      invitedForWorkspace: true,
      role: true,
      invitedById: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}
export async function reinviteMemberForWorkspace({ id }: { id: string }) {
  const user = await prisma.invites.findUnique({
    where: { id },
    include: {
      invitedForWorkspace: true,
      invitedById: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
  const workspaceJoinLink = env.PUBLIC_URL + "/workspace/" + user?.id + "/join"
  const name = ((user?.invitedById?.firstName as string) +
    " " +
    user?.invitedById?.lastName) as string
  return await sendMemberInvite(
    user?.email as string,
    name as string,
    workspaceJoinLink as string
  )
}
export async function reinviteMember({ id }: { id: string }) {
  const user = await prisma.user.findUnique({ where: { id } })
  const roleId = user?.roleId as string
  const role = await prisma.role.findUnique({ where: { id: roleId } })
  const password = faker.internet.password()
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.password.update({
    where: {
      userId: id,
    },
    data: {
      hash: hashedPassword,
    },
  })
  return await sendMail(
    user?.email as string,
    user?.firstName as string,
    password,
    role?.name as string
  )
}
