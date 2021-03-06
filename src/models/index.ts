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

import Center, {
  associations as centerAssociations,
  table as centerTable,
} from './center.model';

import Chat, {
  associations as chatAssociations,
  table as chatTable,
} from './chat.model';

import Match, {
  associations as matchAssociations,
  table as matchTable,
} from './match.model';

import Notification, {
  associations as notificationAssociations,
  table as notificationTable,
} from './notification.model';

export { City, Country, User, Center, Chat, Match, Notification };

export const tables = [
  countryTable,
  cityTable,
  userTable,
  centerTable,
  chatTable,
  matchTable,
  notificationTable,
];

export const associations = [
  countryAssociations,
  cityAssociations,
  userAssociations,
  centerAssociations,
  chatAssociations,
  matchAssociations,
  notificationAssociations,
];
