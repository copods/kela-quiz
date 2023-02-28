import { prisma } from "~/db.server"

const permissions: {
  [key: string]: { [key: string]: { [key: string]: boolean } }
} = {
  admin: {
    userProfile: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    workspace: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    member: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    tests: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    questions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    assessments: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    results: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    inviteCandidate: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
  testCreator: {
    userProfile: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    workspace: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    member: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    tests: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    questions: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    assessments: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    results: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    inviteCandidate: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  },
  recruiter: {
    userProfile: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    workspace: {
      create: true,
      read: true,
      update: false,
      delete: false,
    },
    member: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    tests: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    questions: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    assessments: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    results: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    inviteCandidate: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
  },
}

interface User {
  id: string
  workspaceId: string
  userId: string
  roleId: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export async function checkFeatureAuthorization(
  userId: string,
  workspaceId: string,
  feature: string,
  action: string
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { userWorkspace: true },
  })

  const userRoleId = user?.userWorkspace.find(
    (user: User) => user?.workspaceId === workspaceId
  )?.roleId

  const role = await prisma.role.findUnique({
    where: { id: userRoleId },
    select: { name: true },
  })

  console.log(permissions[role!.name.toLocaleLowerCase()][feature][action])

  return permissions[role!.name.toLocaleLowerCase()][feature][action]
}

export async function checkUserFeatureAuthorization(userId: string) {
  const userRole = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: { select: { name: true } } },
  })

  console.log(permissions[userRole?.role.name.toLocaleLowerCase() as string])

  return permissions[userRole?.role.name.toLocaleLowerCase() as string]
}
