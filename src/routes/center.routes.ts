import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/center/:id', controllers.getCenter);

router.get('/centers', controllers.getCenters);

router.post('/center', controllers.postCenter);

router.put('/center/:id', controllers.putCenter);

router.delete('/center/:id', controllers.deleteCenter);

export default router;
