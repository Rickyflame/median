import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

//initialize prisma client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create tqo dummy users

  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const PasswordAlex = await bcrypt.hash('passowrd-alex', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'melony ndungu', // manzi yako apo kwa API
      password: 'passwordSabin',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: PasswordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'kijana dwanzi',
      password: 'PasswordAlex',
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support a For MongoDB' },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'Prisma Adds Support a For MongoDB',
      body: 'Support for MongoDB has one of the most requested features since the initial release of ...',
      description:
        "We are excited to share today's Prisma ORM release add stable support for MongoDB!",
      published: true,
    },
  });
  const post2 = await prisma.article.upsert({
    where: { title: "What's new in prisma update 4.92.9.9" },
    update: {
      authorId: user1.id,
    },
    create: {
      title: "What's new in prisma update 4.92.9.9",
      body: "Our engineer's have been worling really hoard to give you the best top shelf....",
      description:
        'we dont even know what is in this update we are releasing. Sisi tuko hapa kuwaongelesha kidogo and then we will be paid ',
      published: true,
    },
  });

  const post3 = await prisma.article.upsert({
    where: {
      title: 'This crap is too expensive and you should not buy it part 1',
    },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'This crap is too expensive and you should not buy it part 1',
      body: 'In todays recap on crap with a price tag, we look at the Ipone 69 pro slut max',
      description:
        ' The Ipone 69 pro slut max is a top tier sluttfying gadget to carry around and you should not buy it. With its gorgeous 63 inch screen, it has the best display to see all your falilures in 32K resolution',
      published: true,
    },
  });

  const post4 = await prisma.article.upsert({
    where: { title: 'We are the new adult so its time we act like it' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'We are the new adult so its time we act like it',
      body: 'In todays recap on we are the new adult w e take a look at the onlyfans mothers',
      description:
        'We are living in a worls where mothers are no longer what they used to be 30 yyears ago. The nurture is no longer there',
      published: false,
    },
  });

  const post5 = await prisma.article.upsert({
    where: { title: 'The government will not reduce the taxes anymore' },
    update: {},
    create: {
      title: 'The government will not reduce the taxes anymore',
      body: 'In todays recap on the government want to F us over we look at the proposed finance bill by zakayo',
      description:
        'with just 30 days to the begining of the 24/25 fiscal years,Zakayo has decided that we will increase the taxes and kill the middle class ',
      published: true,
    },
  });

  console.log({ post1, post2, post3, post4, post5 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close prisma Client at the end
    await prisma.$disconnect();
  });
