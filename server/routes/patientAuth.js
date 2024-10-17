import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Patient from '../models/patient.js';
import { authenticateUser } from "../middleware/auth.middleware.js";
import { registerSchema, loginSchema } from "../validation/patientAuth.js";


const router = express.Router();

router.post('/register', async (req, res)=>{

    try {
        const { error, value } = registerSchema.validate(req.body, { abortEarly: false});

        if (error) return res.status(404).json({
            success: false,
            message: "Invalid credentials",
            error: error.message
        });

        const { firstName, lastName, phoneNumber, gender, 
                dob, email, password, confirmPassword
                } = value;
        
        let user = await Patient.findOne({email});

        if (user) return res.status(400).json({
            success: false,
            message:"User already exist!"
        });

        if (password != confirmPassword) 
            return res.status(500).json({
                success: false,
                message: "Your password and confirm password doesn't match."
            });

        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await Patient.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            gender,
            dob,
        });

        res.status(201).json({
            success: true,
            message: "User created!"
        });
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Something unexpected happened!",
            error: error.message
        })
    }
})

router.post('/login', async (req, res)=>{

    try {
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

        if (error) return res.status(404).json({
            success: false,
            message: "Invalid credentials!",
            error: error.message
        });

        const { email, password } = value;

        const user = await Patient.findOne({email});

        // Confirm password
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ' ');

        if (!user || !isPasswordCorrect) return res.status(404).json({
            success: false,
            message: "Either email or password is incorrect."
        });

        // Check if token exists
        let { token } = req.cookies;

        if (token) return res.status(404).json({
            success: false,
            message: "You are already logged in!"
        });

        // set jwt cookies
        token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET ,{
            expiresIn: '5d'
        });

        res.cookie('token', token, {
            maxAge: 5 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false, // false only in development
            // sameSite: 'strict'
        })

        res.status(200).json({
            success: true,
            message: "Login successfull!"
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: error.message
        })
    }
})

router.post('/logout', authenticateUser, async (req, res)=>{

    try {
        const userId = req.userId
        const user = await Patient.findOne({_id: userId});
        
        res.clearCookie('token');

        res.status(200).json({
            success: true,
            message: `Logged you out, ${user.patientName}!`   
        })
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: error.message
        });
    }
});


export default router;