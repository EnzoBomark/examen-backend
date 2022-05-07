import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/user/:id', controllers.getUser);

router.get('/users', controllers.getUsers);

export default router;
