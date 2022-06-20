
const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {

  // await prisma.user.deleteMany({})
  // await prisma.password.deleteMany({})
  // await prisma.role.deleteMany({})
  // await prisma.option.deleteMany({})

  // await prisma.question.deleteMany({})
  // await prisma.section.deleteMany({})
  // await prisma.questionType.deleteMany({})
  // await prisma.optionType.deleteMany({})
  // await prisma.Test.deleteMany({})

  const email = "test@user.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("testPassword", 10);

  const role=  await prisma.role.create({
    data: {
      name: 'Admin',
    }
  })

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName: 'Test',
      lastName: 'User',
      roleId: role.id
    },
  });

  const questionType1= await prisma.questionType.create({
    data: {
      name: 'SINGLE_CHOICE'
    }
  })

  const questionType2= await prisma.questionType.create({
    data: {
      name: 'MULTIPLE_CHOICE'
    }
  })

  const questionType3= await prisma.questionType.create({
    data: {
      name: 'TEXT'
    }
  })


  const optionType1= await prisma.optionType.create({
    data: {
      name: 'TEXT'
    }
  })
  const optionType2= await prisma.optionType.create({
    data: {
      name: 'IMAGE'
    }
  })

  const section= await prisma.section.create({
    data: {
      name: 'Aptitude'
    }
  })


  // const section= await prisma.section.create({
  //   data: {
  //     name: 'Aptitude'
  //   }
  // })



  const question= await prisma.question.create({
    data: {
      question: 'Do you know your name?',
      correctOption: [],
      timeInSec: 60,
      marks: 1,
      questionTypeId: questionType1.id,
      sectionId: section.id,
    }
  })

  const option1= await prisma.option.create({
    data: {
      option: 'Yes',
      questionId: question.id,
      optionTypeId: optionType1.id
    }
  })

  const option2= await prisma.option.create({
    data: {
      option: 'No',
      questionId: question.id,
      optionTypeId: optionType1.id
    }
  })

  const option3= await prisma.option.create({
    data: {
      option: 'Maybe',
      questionId: question.id,
      optionTypeId: optionType1.id
    }
  })

  const updatedQuestion = await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      correctOption: [option1.id],
    },
  })

  const test=  await prisma.test.create({
    data: {
      name: 'Aptitude test 1',
      totalQuestions: 1,
      description: 'Test Aptitude test',
      totalDurationInSeconds: 600,
    }
  })

  // const sectionWiseQuestionsForTest= await prisma.sectionWiseQuestionForTest.create({
  //   data: {
  //     sectionId: section.id,
  //     testId: test.id,
  //     questions: [
  //       question
  //     ]
  //   }
  // })

  // const updatedTest= await prisma.test.update({
  //   where: {
  //     id: test.id
  //   },
  //   data: {

  //   }
  // })









  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

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

