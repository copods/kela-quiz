import type { Invites } from '@prisma/client'
import { prisma } from '~/db.server'
import { sendMail, sendMemberInvite } from './sendgrid.servers'
import { env } from 'process'
import faker from '@faker-js/faker'
import bcrypt from 'bcryptjs'

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
  await prisma.invites
    .create({
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
    .then(async (res) => {
      const invite = res

      const workspaceJoinLink =
        env.PUBLIC_URL + '/workspace/' + invite.id + '/join'
      const invitedForWorkspaceName = invite.invitedForWorkspace?.name
      const name = ((invite.invitedById?.firstName as string) +
        ' ' +
        invite.invitedById?.lastName) as string
      return await sendMemberInvite(
        email,
        invitedForWorkspaceName as string,
        name as string,
        workspaceJoinLink as string
      )
    })
    .catch((err) => {
      console.log('error', err)
    })
}
export async function getInvitedMemberById(id: Invites['id']) {
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
    return 'Something went wrong'
  }
}

export async function getAllInvitedMember(workspaceId: string) {
  return await prisma.invites.findMany({
    where: {
      deleted: false,
      workspaceId,
      joined: {
        equals: null,
      },
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
    include: { invitedForWorkspace: true },
  })
  const roleId = user?.roleId as string
  const role = await prisma.role.findUnique({ where: { id: roleId } })
  const workspaceJoinLink = env.PUBLIC_URL + '/workspace/' + user?.id + '/join'
  return await sendMail(
    user?.invitedForWorkspace?.name as string,
    user?.email as string,
    role?.name as string,
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
