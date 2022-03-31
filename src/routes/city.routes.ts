import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/city/:id', controllers.getCity);

router.get('/cities', controllers.getCities);

router.post('/city', controllers.postCity);

router.put('/city/:id', controllers.putCity);

router.delete('/city/:id', controllers.deleteCity);

export default router;
