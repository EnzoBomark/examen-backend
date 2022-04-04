import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.post('/chat', controllers.postChat);

export default router;
