import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { sendMail } from './sendgrid.servers'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } })
}
export async function deleteUserById(id:string) {
  return prisma.user.delete({ where: { id } })
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getAllUsers() {
  return prisma.user.findMany({include:{role:true}})
}

export async function getAllRoles() {
  return prisma.role.findMany()
}
export async function createNewUser({
  firstName,
  lastName,
  email,
  roleId,
}: Pick<User, 'firstName' | 'lastName' | 'email'| 'roleId'> ) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 10;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
   }
   console.log("password: ", password)

   const send= await sendMail(email, firstName, password)
   
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.user.create({
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
}
export async function createUser(email: User['email'], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const role = await prisma.role.findUnique({
    where: {
      name: 'Test Creator',
    },
  })

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName: 'Test',
      lastName: 'User',
      roleId: role?.id,
    },
  })
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin(
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
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
