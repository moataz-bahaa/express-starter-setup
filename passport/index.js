import { addPassportJwtStrategy } from './jwt-strategy.js';
import addFacebookStragegy from './facebook.js';

const initPassport = () => {
  addPassportJwtStrategy();
  addFacebookStragegy();
};

export default initPassport;
