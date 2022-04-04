import { Router } from 'express';

import { decodeToken } from '../middleware';
import country from './country.routes';
import city from './city.routes';
import center from './center.routes';
import profile from './profile.routes';

const routes = Router();

routes.use(decodeToken);
routes.use(country);
routes.use(city);
routes.use(center);
routes.use(profile);

export default routes;
