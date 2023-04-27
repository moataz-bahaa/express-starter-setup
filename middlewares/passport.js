import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import prisma from '../prisma/client.js';

export const addPassportJwtStrategy = () => {
  const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
