import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/profile', controllers.getProfile);

router.get('/profile/chats', controllers.getProfileChats);

router.post('/profile', controllers.postProfile);

router.put('/profile', controllers.putProfile);

router.put('/profile/chat/:id', controllers.putProfileChat);

export default router;
