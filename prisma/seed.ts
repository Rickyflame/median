import { PrismaClient } from '@prisma/client';

//initialize prisma client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support For MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support For MongoDB',
      body: 'Support for MongoDB has one of the most requested features since the initial release of ...',
      description:
        "We are excited to share today's Prisma ORM release add stable support for MongoDB!",
      published: true,
    },
  });
  const post2 = await prisma.article.upsert({
    where: { title: "What's new in prisma update 1.9.9.9" },
    update: {},
    create: {
      title: "What's new in prisma update 1.9.9.9",
      body: "Our engineer's have been worling really hoard to give you the best top shelf....",
      description:
        'we dont even know what is in this update we are releasing. Sisi tuko hapa kuwaongelesha kidogo and then we will be paid ',
      published: true,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'This crap is too expeinsive and you should not buy it' },
    update: {},
    create: {
      title: 'This crap is too expensive and you should not buy it',
      body: 'In todays recap on crap with a price tag, we look at the Ipone 69 pro slut max',
      description:
        ' The Ipone 69 pro slut max is a top tier sluttfying gadget to carry around and you should not buy it. With its gorgeous 63 inch screen, it has the best display to see all your falilures in 32K resolution',
      published: true,
    },
  });

  console.log({ post1, post2, post3 });
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
