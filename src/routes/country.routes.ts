import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/country/:id', cont.getCountry);

router.get('/countries', cont.getCountries);

router.post('/country', cont.postCountry);

router.put('/country/:id', cont.putCountry);

router.delete('/country/:id', cont.deleteCountry);

export default router;
