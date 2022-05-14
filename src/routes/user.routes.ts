import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/user/:id', controllers.getUser);

router.get('/users', controllers.getUsers);

router.get('/user/:id/history', controllers.getUserHistory);

router.get('/user/:id/history/count', controllers.getUserHistory);

router.get('/user/:id/upcoming', controllers.getUserUpcoming);

router.get('/user/:id/upcoming/count', controllers.getUserUpcomingCount);

router.get('/user/:id/win-rate', controllers.getUserWinRate);

router.get('/user/:id/followings', controllers.getUserFollows);

router.get('/user/:id/followers', controllers.getUserFollowers);

export default router;
