import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { sendMail, sendPassword } from './sendgrid.servers'
import { faker } from '@faker-js/faker'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } })
}

export async function deleteUserById(id: string) {
  try {
    return await prisma.user.delete({ where: { id } })
  } catch (error) {
    return 'Something went wrong'
  }
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getAllUsers({
  currentWorkspaceId,
}: {
  currentWorkspaceId: string | undefined
}) {
  return prisma.user.findMany({
    where: {
      userWorkspace: {
        some: {
          workspaceId: currentWorkspaceId,
        },
      },
    },
    include: {
      role: true,
    },
  })
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

  workspaceName,
}: {
  firstName: string
  lastName: string
  email: string
  workspaceName: string
}) {
  const password = faker.internet.password()
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

  return await sendMail(email, firstName, password, role?.name as string)
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
  console.log(111)

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
  console.log(222)

  return await sendMail(email, firstName, password, role?.name as string)
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
        userId: userEmail.id,
      },
      data: {
        hash: hashedPassword,
      },
    })
    return await sendPassword(userEmail?.email as string, password)
  } else {
    return null
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
