import City, {
  associations as cityAssociations,
  table as cityTable,
} from './city.model';

import Country, {
  associations as countryAssociations,
  table as countryTable,
} from './country.model';

import User, {
  associations as userAssociations,
  table as userTable,
} from './user.model';

export { City, Country, User };

export const tables = [countryTable, cityTable, userTable];

export const associations = [
  countryAssociations,
  cityAssociations,
  userAssociations,
];
