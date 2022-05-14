import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.post('/chat', cont.postChat);

export default router;
