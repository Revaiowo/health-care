import express from 'express';

import { authenticateUser } from "../middleware/auth.middleware.js";
import { createRoom, joinRoom } from '../controllers/room.js';

const router = express.Router();

router.get('/create', authenticateUser, createRoom);

router.post('/join', authenticateUser, joinRoom);


export default router;