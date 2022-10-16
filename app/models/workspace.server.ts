import { prisma } from '~/db.server'

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

export async function addWorkspace(workspaceName: string, userId: string) {
  const workspace = await prisma.workspace.create({
    data: {
      name: workspaceName,
      createdById: userId,
    },
  })
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  return await prisma.userWorkspace.create({
    data: {
      workspaceId: workspace?.id,
      userId: userId,
      roleId: user?.roleId as string
    }
  })
}