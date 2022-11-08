import type { Invites, Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'
import { sendMail, sendMemberInvite, sendNewPassword } from './sendgrid.servers'
import { faker } from '@faker-js/faker'
import { env } from 'process'
export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id }, include: { password: true } })
}
export async function getInvitedMemberById(id: Invites['id']) {
  return prisma.invites.findUnique({
    where: { id },
    select: {
      id: true,
      joined: true,
      invitedBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      invitedForWorkspace: true,
    },
  })
}

export async function deleteUserById(id: string) {
  try {
    return await prisma.user.delete({ where: { id } })
  } catch (error) {
    return 'Something went wrong'
  }
}
export async function deleteInviteMember(id: string) {
  try {
    return await prisma.invites.delete({ where: { id } })
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

export async function inviteNewUser({
  email,
  roleId,
  invitedByWorkspaceId,
  userId,
}: {
  email: string
  roleId: string
  userId?: string
  invitedByWorkspaceId: string
}) {
  const invite = await prisma.invites.create({
    data: {
      email,
      roleId,
      workspaceId: invitedByWorkspaceId,
      userId: userId,
    },
    select: {
      invitedForWorkspace: {
        select: {
          name: true,
        },
      },
      id: true,
    },
  })

  const role = await prisma.role.findUnique({
    where: {
      id: roleId,
    },
  })
  const workspaceJoinLink = env.PUBLIC_URL + '/workspace/' + invite.id + '/join'
  const invitedForWorkspaceName = invite.invitedForWorkspace?.name
  return await sendMemberInvite(
    email,
    invitedForWorkspaceName as string,
    role?.name as string,
    workspaceJoinLink as string
  )
}

export async function getAllInvitedMember() {
  return await prisma.invites.findMany({
    include: {
      invitedForWorkspace: true,
      role: true,
      invitedBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })
}
export async function createPasswordOfUser(id: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.password.create({
    data: {
      hash: hashedPassword,
      userId: id,
    },
  })
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

export async function reInvitationMember({ id }: { id: string }) {
  const user = await prisma.invites.findUnique({
    where: { id },
    include: { invitedForWorkspace: true },
  })
  const roleId = user?.roleId as string
  const role = await prisma.role.findUnique({ where: { id: roleId } })
  const workspaceJoinLink = env.PUBLIC_URL + '/workspace/' + user?.id + '/join'
  return await sendMail(
    user?.email as string,
    user?.invitedForWorkspace?.name as string,
    role?.name as string,
    workspaceJoinLink as string
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
    },
  })
  return linkUserWorkspace
}

export async function rejectWorkspaceInvitation({
  //if user rejected the workspace invited this function is called
  invitedId,
}: {
  invitedId: string
}) {
  await prisma.invites.update({
    // update the status if rejecting the workspace invitation
    where: {
      id: invitedId,
    },
    data: {
      joined: false,
    },
  })
  return
}
