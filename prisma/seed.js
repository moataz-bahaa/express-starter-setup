import prisma from './client.js';

(async () => {
  try {
    // const user = await prisma.user.create({
    //   data: {
    //     balance: 0,
    //     name: 'moaatz',
    //     account: {
    //       create: {
    //         email: 'moataz@test.com',
    //         password: '123'
    //       }
    //     }
    //   },
    // });

    // const user = await prisma.account.findFirst({
    //   where: { email: 'moataz@test.com' },
    //   include: {
    //     user: {
    //       include: {
    //         profile: true,
    //       }
    //     }
    //   }
      
    // });

    console.log(user);
  } catch (err) {
    console.log(err);
  }
})();
