import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { sendMail } from './sendgrid.servers'
import { faker } from '@faker-js/faker'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } })
}
export async function deleteUserById(id: string) {
  return prisma.user.delete({ where: { id } })
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
    var error = new Error('invalidPassword')
    return error
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword
  return userWithoutPassword
}
