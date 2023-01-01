import type { Invites } from '@prisma/client'
import { prisma } from '~/db.server'
import { sendMemberInvite } from './sendgrid.servers'
import { env } from 'process'

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
  try {
    const inviteCreated = await prisma.invites.create({
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

    const workspaceJoinLink =
      env.PUBLIC_URL + '/workspace/' + inviteCreated.id + '/join'
    const name = ((inviteCreated.invitedById?.firstName as string) +
      ' ' +
      inviteCreated.invitedById?.lastName) as string

    const emailSentRes = await sendMemberInvite(
      email,
      name as string,
      workspaceJoinLink as string
    )

    return emailSentRes
  } catch (err) {
    throw new Error('Something went wrong!')
  }
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
    return 'Something went wrong'
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
  try {
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
    const workspaceJoinLink =
      env.PUBLIC_URL + '/workspace/' + user?.id + '/join'
    const name = ((user?.invitedById?.firstName as string) +
      ' ' +
      user?.invitedById?.lastName) as string

    const emailSentRes = await sendMemberInvite(
      user?.email as string,
      name as string,
      workspaceJoinLink as string
    )

    return emailSentRes
  } catch (err) {
    throw new Error('Something went wrong!')
  }
}
