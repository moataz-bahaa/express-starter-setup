import { Strategy as FacebookStrategy } from 'passport-facebook';
import passport from 'passport';
import { NotFoundError } from '../lib/errors.js';
import { createUserProfile, getUserProfile } from '../prisma/helper.js';

const clientId = process.env.FACEBOOK_CLIENT_ID,
  clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

const addFacebookStragegy = () => {
  // facebook-register
  passport.use(
    'facebook-register',
    new FacebookStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: '/auth/facebook/register',
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await createUserProfile(
            profile.id,
            profile.provider,
            profile.displayName
          );

          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  // facebook-login
  passport.use(
    'facebook-login',
    new FacebookStrategy(
      {
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: '/auth/facebook/login',
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await getUserProfile(profile.id, profile.provider);
          if (!user) return cb(new NotFoundError('no user found'));
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    )
  );
};

export default addFacebookStragegy;
