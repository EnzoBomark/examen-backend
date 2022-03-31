import country from './country.controller';
import city from './city.controller';

const controllers = {
  ...country,
  ...city,
};

export default controllers;
