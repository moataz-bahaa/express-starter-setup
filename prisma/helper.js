import prisma from './client.js';
import { BadRequestError } from '../lib/errors.js';

export const createUserProfile = async (profileId, provider, name, data) => {
  const isExist = await prisma.profile.findFirst({
    where: {
      profileId,
      provider,
    },
  });

  if (isExist) {
    throw new BadRequestError('user already registered, try to login');
  }

  const user = await prisma.user.create({
    data: {
      name,
      profile: {
        create: {
          profileId: profileId,
          provider,
          data,
        },
      },
    },
  });

  return user;
};

export const getUserProfile = async (profileId, provider) => {
  const account = await prisma.profile.findFirst({
    where: {
      profileId,
      provider,
    },

    include: {
      user: true,
    },
  });

  if (!account) {
    return null;
  }

  const user = {
    ...account.user,
    ...account.data,
  };

  return user;
};
