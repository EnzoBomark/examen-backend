import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/user/:id', cont.getUser);

router.get('/users', cont.getUsers);

router.get('/user/:id/history', cont.getUserHistory);

router.get('/user/:id/history/count', cont.getUserHistoryCount);

router.get('/user/:id/upcoming', cont.getUserUpcoming);

router.get('/user/:id/upcoming/count', cont.getUserUpcomingCount);

router.get('/user/:id/win-rate', cont.getUserWinRate);

router.get('/user/:id/followings', cont.getUserFollows);

router.get('/user/:id/followings/count', cont.getUserFollowsCount);

router.get('/user/:id/followers', cont.getUserFollowers);

router.get('/user/:id/followers/count', cont.getUserFollowersCount);

router.get('/user/:id/centers', cont.getUserCenters);

router.get('/user/:id/centers/count', cont.getUserCentersCount);

export default router;
