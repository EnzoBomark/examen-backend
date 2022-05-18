import { Router } from 'express';

import { decodeToken } from '../middleware';
import country from './country.routes';
import city from './city.routes';
import center from './center.routes';
import profile from './profile.routes';
import chat from './chat.routes';
import match from './match.routes';
import user from './user.routes';
import notification from './notification.routes';

const routes = Router();

routes.use(decodeToken);
routes.use(country);
routes.use(city);
routes.use(center);
routes.use(profile);
routes.use(chat);
routes.use(match);
routes.use(user);
routes.use(notification);

export default routes;
