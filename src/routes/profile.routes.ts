import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/profile', cont.getProfile);

router.get('/profile/notifications', cont.getProfileNotifications);

router.get('/profile/chats', cont.getProfileChats);

router.get('/profile/followings', cont.getProfileFollows);

router.get('/profile/followers', cont.getProfileFollowers);

router.post('/profile', cont.postProfile);

router.put('/profile', cont.putProfile);

router.put('/profile/chat/:id', cont.putProfileChat);

router.put('/profile/center/:id', cont.putProfileCenter);

router.put('/profile/main/city/:id', cont.putProfileMainCity);

router.put('/profile/follow/:id', cont.putProfileFollow);

router.put('/profile/match/:id', cont.putProfileMatch);

export default router;
