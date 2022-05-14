import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/center/:id', cont.getCenter);

router.get('/centers', cont.getCenters);

router.post('/center', cont.postCenter);

router.put('/center/:id', cont.putCenter);

router.delete('/center/:id', cont.deleteCenter);

export default router;
