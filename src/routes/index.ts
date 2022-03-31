import { Router } from 'express';

import country from './country.routes';
import city from './city.routes';

const routes = Router();

routes.use(country);
routes.use(city);

export default routes;
