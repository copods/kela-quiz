const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "test@user.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("testPassword", 10);

  const roles= ["Test Creator","Recruiter"]

  await roles.forEach(async(el)=>{
    await prisma.role.upsert({
      where: {
        name: el,
      },
      update: {
        name: el
      },
      create: {
        name: el,
      },
    })
  })

  const role= await prisma.role.findUnique({where: {name: "Recruiter"}})

  await prisma.user.upsert({
    where: {
      email
    },
    update: {
      email
    },
    create: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName: "Test",
      lastName: "User",
      roleId: role.id
    },
  })

  const questionType= ["SINGLE_CHOICE","MULTIPLE_CHOICE","TEXT"]
  
  questionType.forEach(async(el)=>{
    await prisma.questionType.upsert({
      where: {
        name: el,
      },
      update: {
        name: el
      },
      create: {
        name: el,
      },
    })
  })

  const optionType= ["TEXT", "IMAGE"]

  optionType.forEach(async(el)=>{
    await prisma.optionType.upsert({
      where: {
        name: el,
      },
      update: {
        name: el
      },
      create: {
        name: el,
      },
    })
  })  

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
