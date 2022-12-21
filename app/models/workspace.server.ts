import { prisma } from '~/db.server'
import { getAdminId } from './user.server'

export async function getUserWorkspaces(userId: string) {
  return await prisma.userWorkspace.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      workspaceId: true,
      workspace: {
        select: {
          name: true,
        },
      },
    },
  })
}
export async function joinWorkspace({ invitedId }: { invitedId: string }) {
  // user will join the workspace for he/she invited
  const getUserInvite = await prisma.invites.findUnique({
    where: {
      id: invitedId,
    },
    select: {
      email: true,
      invitedForWorkspace: {
        select: {
          id: true,
        },
      },
      roleId: true,
    },
  })
  const user = await prisma.user.findUnique({
    where: {
      email: getUserInvite?.email,
    },
    select: {
      id: true,
    },
  })
  const linkUserWorkspace = await prisma.userWorkspace.create({
    //create user's another UserWorkspace which is linked with invited workspace
    data: {
      userId: user?.id as string,
      workspaceId: getUserInvite?.invitedForWorkspace?.id as string,
      roleId: getUserInvite?.roleId as string,
      isDefault: false,
    },
  })
  await prisma.invites.update({
    //after joining the workspace it will update the status as joined true
    where: {
      id: invitedId,
    },
    data: {
      joined: true,
      joinedAt: new Date().toString(),
    },
  })
  return linkUserWorkspace
}
export async function addWorkspace(workspaceName: string, userId: string) {
  const workspace = await prisma.workspace.create({
    data: {
      name: workspaceName,
      createdById: userId,
    },
  })
  const roleId = await getAdminId()
  return await prisma.userWorkspace.create({
    data: {
      workspaceId: workspace?.id,
      userId: userId,
      roleId: roleId as string,
    },
  })
}

export async function getDefaultWorkspaceIdForUserQuery(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      workspace: {
        select: {
          id: true,
        },
      },
    },
  })
}

export async function verifyWorkspaceId({
  userId,
  currentWorkspaceId,
}: {
  userId: string
  currentWorkspaceId: string
}) {
  return prisma.userWorkspace.findFirst({
    where: { userId, workspaceId: currentWorkspaceId },
    select: {
      workspace: {
        select: {
          id: true,
        },
      },
    },
  })
}
