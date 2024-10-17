import express from 'express';

import {authenticateUser} from '../middleware/auth.middleware.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/user', authenticateUser, async (req, res)=>{

    try {
        const { userId } = req;

        const user = await User.findOne({_id: userId}).select('-password');

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        
        res.status(500).json({
            status: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
})

export default router;