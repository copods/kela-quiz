import { checkFeatureAuthorization } from "./authorization.server"
import { getAdminId } from "./user.server"

import { prisma } from "~/db.server"

export async function getCurrentWorkspaceOwner(currentWorkspaceId: string) {
  const workspaceOwner = await prisma.workspace.findUnique({
    where: { id: currentWorkspaceId },
    select: {
      ownerId: true,
    },
  })
  return workspaceOwner
}

export async function getUserWorkspaces(userId: string, workspaceId?: string) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId!,
        "workspace",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
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
  } catch (error) {
    throw error
  }
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
      ownerId: userId,
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
export async function leaveWorkspace(workspaceId: string, userId: string) {
  await prisma.userWorkspace.deleteMany({
    where: { workspaceId: workspaceId, userId: userId },
  })
}

export async function getOwnersWorkspaces(userId: string) {
  const ownerWorkspaceId = await prisma.workspace.findMany({
    where: { ownerId: userId },
  })
  return ownerWorkspaceId
}

export async function updateUserWorkspace(
  id: string,
  name: string,
  updatedById: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(updatedById, id, "workspace", "update"))
    ) {
      throw {
        status: 403,
      }
    }
    await prisma.workspace.update({
      where: { id },
      data: { name, updatedById },
    })
  } catch (error) {
    throw error
  }
}

export async function getCurrentWorkspaceAdmins(
  workspaceId: string,
  userId: string
) {
  try {
    return await prisma.userWorkspace.findMany({
      where: {
        workspaceId,
        user: { role: { name: "Admin" }, NOT: { id: userId } },
      },
      select: {
        user: {
          select: { firstName: true, lastName: true, email: true, id: true },
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export async function updateWorkspaceOwner(
  userId: string,
  currentWorkspaceId: string,
  newOwnerId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId,
        "workspace",
        "update"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    await prisma.workspace.update({
      where: { id: currentWorkspaceId },
      data: {
        ownerId: newOwnerId,
      },
    })
  } catch (error) {
    throw error
  }
}
