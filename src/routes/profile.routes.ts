import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/profile', controllers.getProfile);

router.post('/profile', controllers.postProfile);

router.put('/profile', controllers.putProfile);

export default router;
