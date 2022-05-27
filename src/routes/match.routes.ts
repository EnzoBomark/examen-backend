import { Router } from 'express';

import cont from '../controllers';

const router = Router();

router.get('/match/:id', cont.getMatch);

router.get('/matches', cont.getMatches);

router.post('/match', cont.postMatch);

router.put('/match/:id', cont.putMatch);

router.put('/match/:id/kick/:userId', cont.putKickMatchPlayer);

router.delete('/match/:id', cont.deleteMatch);

export default router;
