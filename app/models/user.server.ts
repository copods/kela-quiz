import { faker } from "@faker-js/faker"
import type { Password, User } from "@prisma/client"
import bcrypt from "bcryptjs"

import { checkFeatureAuthorization } from "./authorization.server"
import { sendMail, sendNewPassword } from "./sendgrid.servers"

import { prisma } from "~/db.server"

export type { User } from "@prisma/client"

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id }, include: { password: true } })
}

export async function deleteUserById(
  userId: string,
  workspaceId: string,
  email: string,
  id: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(id, workspaceId, "member", "delete"))
    ) {
      throw {
        status: 403,
      }
    }
    const deleteUserWorkspace = await prisma.userWorkspace.deleteMany({
      where: { userId, workspaceId },
    })
    const invitedIdByEmail = await prisma.invites.findMany({
      where: {
        email: email,
        workspaceId,
        deleted: false,
      },
      select: {
        id: true,
      },
    })
    await prisma.invites.update({
      where: {
        id: invitedIdByEmail[0].id,
      },
      data: {
        deleted: true,
        deletedAt: new Date().toString(),
      },
    })
    return deleteUserWorkspace
  } catch (error) {
    throw error
  }
}

export async function getUserByEmail(email: User["email"]) {
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
  membersCurrentPage = 1,
  membersItemsPerPage = 5,
}: {
  currentWorkspaceId: string | undefined
  membersCurrentPage?: number
  membersItemsPerPage?: number
}) {
  const PER_PAGE_ITEMS = membersItemsPerPage
  const user = await prisma.user.findMany({
    take: PER_PAGE_ITEMS,
    skip: (membersCurrentPage - 1) * PER_PAGE_ITEMS,
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
      userWorkspace: {
        where: {
          workspaceId: currentWorkspaceId,
        },
        select: {
          role: {
            select: {
              name: true,
              id: true,
            },
          },
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
  const roleName = "Admin"
  const role = await prisma.role.findUnique({ where: { name: roleName } })
  return role?.id
}

export async function createUserBySignUp({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
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
          name: `${firstName}'s workspace`,
        },
      },
    },
    select: {
      id: true,
      roleId: true,
      workspace: {
        select: {
          id: true,
          createdById: true,
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

  await prisma.workspace.update({
    where: { id: user.workspace[0].id },
    data: { ownerId: user.workspace[0].createdById },
  })

  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  })

  await sendMail(email, firstName, password, role?.name as string)
  return user
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
    await sendNewPassword(userEmail?.email as string, password)
    return "Done"
  } else {
    return { value: null, time: Date.now() }
  }
}

export async function loginVerificationResponse(
  email: User["email"],
  password: Password["hash"]
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
    let error = new Error("invalidPassword")
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
    let error = new Error("invalidPassword")
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
    return "DONE"
  }
}

export async function updateUserData(
  id: string,
  firstName: string,
  lastName: string
) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
  })
}

export async function updateUserRole(
  id: string,
  userId: string,
  workspaceId: string,
  roleId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(id, workspaceId, "member", "update"))
    ) {
      throw {
        status: 403,
      }
    }
    const updateRole = await prisma.userWorkspace.update({
      where: {
        workspaceId_userId: {
          workspaceId: workspaceId,
          userId: userId,
        },
      },
      data: {
        roleId: roleId,
      },
    })

    if (updateRole) {
      return {
        response: {
          status: 203,
        },
      }
    } else {
      return {
        response: {
          status: 400,
        },
      }
    }
  } catch (error) {
    throw error
  }
}
