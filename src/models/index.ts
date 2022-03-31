import City, {
  associations as cityAssociations,
  table as cityTable,
} from './city.model';

import Country, {
  associations as countryAssociations,
  table as countryTable,
} from './country.model';

export { City, Country };

export const tables = [countryTable, cityTable];

export const associations = [countryAssociations, cityAssociations];
