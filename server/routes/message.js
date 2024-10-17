import express from 'express';

import { authenticateUser } from "../middleware/auth.middleware.js";
import { deleteMessage, editMessage, getMessages, sendMessage  } from '../controllers/message.js';

const router = express.Router();


router.post('/send/:id', authenticateUser, sendMessage);

router.get('/:id', authenticateUser, getMessages);

router.put('/edit/:id', authenticateUser, editMessage);

router.delete('/delete/:id', authenticateUser, deleteMessage);


export default router;