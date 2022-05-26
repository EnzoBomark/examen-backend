import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.post('/notification/follow', controllers.postFollowNotification);

router.post('/notification/invite', controllers.postInviteNotification);

router.post('/notification/result', controllers.postResultNotification);

router.put('/notifications/status', controllers.putNotificationsReadStatus);

export default router;
