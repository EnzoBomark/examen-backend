import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/match/:id', controllers.getMatch);

router.get('/matches', controllers.getMatches);

router.post('/match', controllers.postMatch);

router.put('/match/:id', controllers.putMatch);

router.delete('/match/:id', controllers.deleteMatch);

export default router;
