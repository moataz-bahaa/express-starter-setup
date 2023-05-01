import { BadRequestError, NotFoundError } from '../lib/errors.js';
import prisma from '../prisma/client.js';
import { comparePassword, hash } from '../lib/bcrypt.js';
import { generateToken } from '../lib/utils.js';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

export const registerByEmail = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError();
  }

  const isEmailExist = await prisma.account.findUnique({ where: { email } });
  if (isEmailExist) {
    throw new BadRequestError('this email already exists');
  }

  const hashedPassword = await hash(password);

  const user = await prisma.user.create({
    data: {
      name,
      account: {
        create: {
          email,
          password: hashedPassword,
        },
      },
    },
  });

  res.status(StatusCodes.OK).json({
    msg: 'account created successfully',
    user,
  });
};

export const loginByEmail = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError();
  }

  const userAccount = await prisma.account.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
      user: {
        select: {
          id: true,
          name: true,
          notifications: true,
          isVerified: true,
          isSuspended: true,
          profileImageUrl: true,
        },
      },
    },
  });

  if (!userAccount) {
    throw new NotFoundError('wrong email or passowrd');
  }
  const isPasswordMatch = await comparePassword(password, userAccount.password);
  if (!isPasswordMatch) {
    throw new NotFoundError('wrong email or passowrd');
  }

  const token = generateToken({
    id: userAccount.user.id,
    email: userAccount.email,
  });

  res.status(StatusCodes.OK).json({
    userAccount,
    token,
  });
};

export const registerByFacebook = async (req, res, next) => {
  passport.authenticate(
    'facebook-register',
    (err, user, info) => {
      if (err) return next(err);
      res.status(StatusCodes.OK).json({
        user,
      });
    }
  )(req, res, next);
};

export const loginByFacebook = async (req, res, next) => {
  passport.authenticate(
    'facebook-login',
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      const token = generateToken({ id: user.id, email: user.email });

      res.status(StatusCodes.OK).json({
        token,
        user,
      });
    }
  )(req, res, next);
};
