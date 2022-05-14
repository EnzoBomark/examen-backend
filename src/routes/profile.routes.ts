import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/profile', controllers.getProfile);

router.get('/profile/chats', controllers.getProfileChats);

router.get('/profile/followings', controllers.getProfileFollows);

router.get('/profile/followers', controllers.getProfileFollowers);

router.post('/profile', controllers.postProfile);

router.put('/profile', controllers.putProfile);

router.put('/profile/chat/:id', controllers.putProfileChat);

router.put('/profile/center/:id', controllers.putProfileCenter);

router.put('/profile/main/city/:id', controllers.putProfileMainCity);

router.put('/profile/follow/:id', controllers.putProfileFollow);

export default router;
