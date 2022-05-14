import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/city/:id', cont.getCity);

router.get('/cities', cont.getCities);

router.post('/city', cont.postCity);

router.put('/city/:id', cont.putCity);

router.delete('/city/:id', cont.deleteCity);

export default router;
