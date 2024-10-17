import express from 'express';

import Patient from '../models/patient.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateUser, async (req, res)=>{

    try {
        const { doctorId } = req.body;
        const { userId } = req;
    
        await Patient.updateOne( {_id: userId}, { '$set': { doctorId } });
    
        res.status(201).json({
            success: true,
            message: "Doctor selected successfully!"
        });
    }    

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not select a Doctor!",
            error: error.message
        });
    }    
});

export default router;