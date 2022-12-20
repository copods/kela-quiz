import bcrypt from 'bcryptjs'
import type { Password, User } from '@prisma/client'
import { sendMail, sendNewPassword } from './sendgrid.servers'
import { prisma } from '~/db.server'
import { faker } from '@faker-js/faker'
import { env } from 'process'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id }, include: { password: true } })
}

export async function deleteUserById(userId: string, workspaceId: string) {
  try {
    return await prisma.userWorkspace.deleteMany({
      where: { userId, workspaceId },
    })
  } catch (error) {
    return 'Something went wrong'
  }
}

export async function getUserByEmail(email: User['email']) {
  return await prisma.user.findUnique({ where: { email } })
}
export async function getAllUsersCount(currentWorkspaceId: string | undefined) {
  const userCount = await prisma.user.count({
    where: {
      userWorkspace: {
        some: {
          workspaceId: currentWorkspaceId,
        },
      },
    },
  })
  return userCount
}
export async function getAllUsers({
  currentWorkspaceId,
  membersCurrentPage,
  membersItemsPerPage,
}: {
  currentWorkspaceId: string | undefined
  membersCurrentPage?: number
  membersItemsPerPage?: number
}) {
  const PER_PAGE = membersItemsPerPage
  const user = await prisma.user.findMany({
    take: PER_PAGE,
    skip: (membersCurrentPage! - 1) * PER_PAGE!,
    where: {
      userWorkspace: {
        some: {
          workspaceId: currentWorkspaceId,
        },
      },
    },
    include: {
      role: true,
      Invites: {
        select: {
          email: true,
          joinedAt: true,
        },
      },
    },
  })
  return user
}

export async function getAllRoles() {
  return prisma.role.findMany()
}

//To get roleId of Admin role
export async function getAdminId() {
  const roleName = 'Admin'
  const role = await prisma.role.findUnique({ where: { name: roleName } })
  return role?.id
}

export async function createUserBySignUp({
  firstName,
  lastName,
  email,
  password,
  workspaceName,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
  workspaceName: string
}) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const roleId = await getAdminId()
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      roleId: roleId as string,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      workspace: {
        create: {
          name: workspaceName,
        },
      },
    },
    select: {
      id: true,
      roleId: true,
      workspace: {
        select: {
          id: true,
        },
      },
    },
  })

  await prisma.userWorkspace.create({
    data: {
      userId: user.id as string,
      workspaceId: user.workspace[0].id,
      roleId: user?.roleId,
      isDefault: true,
    },
  })

  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  })

  await sendMail(email, firstName, password, role?.name as string)
  return user
}

export async function createNewUser({
  firstName,
  lastName,
  email,
  roleId,
  defaultWorkspaceName,
  createdById,
  invitedByWorkspaceId,
}: {
  firstName: string
  lastName: string
  email: string
  defaultWorkspaceName: string
  roleId: string
  createdById: User['id']
  invitedByWorkspaceId: string
}) {
  const password = faker.internet.password()
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      roleId,
      password: {
        create: {
          hash: hashedPassword,
        },
      },

      workspace: {
        create: {
          name: defaultWorkspaceName,
        },
      },
    },
    select: {
      id: true,
      roleId: true,
      workspace: {
        select: {
          id: true,
        },
      },
    },
  })

  const adminRoleId = await getAdminId()

  await prisma.userWorkspace.create({
    data: {
      userId: user.id as string,
      workspaceId: user.workspace[0].id,
      roleId: adminRoleId as string,
      isDefault: true,
    },
  })

  await prisma.userWorkspace.create({
    data: {
      userId: user.id as string,
      workspaceId: invitedByWorkspaceId,
      roleId: roleId,
      isDefault: false,
    },
  })
  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  })
  const passwordGenerationLink =
    env.PUBLIC_URL + '/members/' + user?.id + '/create-password'
  return await sendMail(
    passwordGenerationLink,
    email,
    firstName,
    role?.name || 'NA'
  )
}

export async function sendResetPassword(email: string) {
  const password = faker.internet.password()
  const hashedPassword = await bcrypt.hash(password, 10)
  const userEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      id: true,
    },
  })
  if (userEmail) {
    await prisma.password.update({
      where: {
        userId: userEmail?.id,
      },
      data: {
        hash: hashedPassword,
      },
    })
    return await sendNewPassword(userEmail?.email as string, password)
  } else {
    return { value: null, time: Date.now() }
  }
}

export async function loginVerificationResponse(
  email: User['email'],
  password: Password['hash']
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
      userWorkspace: {
        where: {
          isDefault: true,
        },
        select: {
          workspaceId: true,
        },
      },
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)
  if (!isValid) {
    let error = new Error('invalidPassword')
    return error
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword
  return userWithoutPassword
}

export async function updatePassword(
  id: string,
  newPassword: string,
  oldPassword: string
) {
  const oldPass = await prisma.user.findUnique({
    where: { id },
    select: {
      password: {
        select: {
          hash: true,
        },
      },
    },
  })

  const isValid = await bcrypt.compare(
    oldPassword,
    oldPass?.password?.hash as string
  )
  if (!isValid) {
    let error = new Error('invalidPassword')
    return error
  }
  let checkValidPass
  if (isValid === true) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    checkValidPass = await prisma.password.update({
      where: {
        userId: id,
      },
      data: {
        hash: hashedPassword,
      },
    })
  }
  if (checkValidPass) {
    return 'DONE'
  }
}
