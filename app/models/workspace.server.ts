import { prisma } from '~/db.server'

export async function getUserWorkspaces(userId: string) {
  return await prisma.userWorkspace.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      workspaceId: true,
      Workspace: {
        select: {
          name: true,
        },
      },
    },
  })
}
