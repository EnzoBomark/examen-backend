import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/country/:id', controllers.getCountry);

router.get('/countries', controllers.getCountries);

router.post('/country', controllers.postCountry);

router.put('/country/:id', controllers.putCountry);

router.delete('/country/:id', controllers.deleteCountry);

export default router;
