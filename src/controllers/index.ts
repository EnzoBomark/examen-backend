import country from './country.controller';
import city from './city.controller';
import profile from './profile.controller';
import center from './center.controller';
import chat from './chat.controller';
import match from './match.controller';
import user from './user.controller';

const controllers = {
  ...country,
  ...city,
  ...profile,
  ...center,
  ...chat,
  ...match,
  ...user,
};

export default controllers;
