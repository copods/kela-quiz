const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function seed() {
  const email = 'anurag@copods.co'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('anuragpatel', 10)

  const roles = ['Test Creator', 'Recruiter']

  await roles.forEach(async (roleName) => {
    await prisma.role.upsert({
      where: {
        name: roleName,
      },
      update: {
        name: roleName,
      },
      create: {
        name: roleName,
      },
    })
  })

  const role = await prisma.role.findUnique({ where: { name: 'Recruiter' } })

  await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      email,
    },
    create: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName: 'Anurag',
      lastName: 'Patel',
      roleId: role.id,
    },
  })

  const questionType = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TEXT']

  questionType.forEach(async (questionName) => {
    await prisma.questionType.upsert({
      where: {
        name: questionName,
      },
      update: {
        name: questionName,
      },
      create: {
        name: questionName,
      },
    })
  })

  const optionType = ['TEXT', 'IMAGE']

  optionType.forEach(async (optionName) => {
    await prisma.optionType.upsert({
      where: {
        name: optionName,
      },
      update: {
        name: optionName,
      },
      create: {
        name: optionName,
      },
    })
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
