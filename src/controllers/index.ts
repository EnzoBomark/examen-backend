import country from './country.controller';
import city from './city.controller';
import profile from './profile.controller';

const controllers = {
  ...country,
  ...city,
  ...profile,
};

export default controllers;
