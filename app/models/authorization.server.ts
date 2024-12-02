import { prisma } from "~/db.server"

const permissions: {
  [key: string]: { [key: string]: { [key: string]: boolean } }
} = {
  admin: {
    userProfile: {
      create: true,
      read: true,
      update: true,
    },
    workspace: {
      create: true,
      read: true,
      update: true,
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
      read: true,
    },
    invite_candidate: {
      create: true,
      update: true,
    },
  },
  test_creator: {
    userProfile: {
      create: true,
      read: true,
      update: true,
    },
    workspace: {
      create: true,
      read: true,
      update: false,
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
      read: false,
    },
    invite_candidate: {
      create: false,
      update: false,
    },
  },
  recruiter: {
    userProfile: {
      create: true,
      read: true,
      update: true,
    },
    workspace: {
      create: true,
      read: true,
      update: false,
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
      read: true,
    },
    invite_candidate: {
      create: true,
      update: true,
    },
  },
}

export async function checkFeatureAuthorization(
  userId: string,
  workspaceId: string,
  feature: string,
  action: string
) {
  const userRole = await prisma.userWorkspace.findMany({
    where: { userId, workspaceId },
    select: { role: { select: { name: true } } },
  })

  return permissions[
    userRole[0].role!.name.replace(" ", "_").toLocaleLowerCase()
  ][feature][action]
}

export async function checkUserFeatureAuthorization(
  userId: string,
  workspaceId: string
) {
  const userRole = await prisma.userWorkspace.findMany({
    where: { userId, workspaceId },
    select: { role: { select: { name: true } } },
  })

  return permissions[
    userRole[0]?.role.name.replace(" ", "_").toLocaleLowerCase() as string
  ]
}
