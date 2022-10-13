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

export async function getAllUsers() {
  return prisma.user.findMany({ include: { role: true } })
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
export async function createNewUser({
  firstName,
  lastName,
  email,
  roleId,
}: Pick<User, 'firstName' | 'lastName' | 'email' | 'roleId'>) {
  const password = faker.internet.password()
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
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
    },
  })
  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  })

  return await sendMail(email, firstName, password, role?.name || 'NA')
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
