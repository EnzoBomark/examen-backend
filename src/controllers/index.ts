import country from './country.controller';
import city from './city.controller';
import profile from './profile.controller';
import center from './center.controller';

const controllers = {
  ...country,
  ...city,
  ...profile,
  ...center,
};

export default controllers;
