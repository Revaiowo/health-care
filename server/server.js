import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import patientAuthRouter from './routes/patientAuth.js'
import doctorAuthRouter from './routes/doctorAuth.js'
import selectDoctorRouter from './routes/selectDoctor.js';
import { connectMongoose } from "./db/database.js";

const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['clientURL']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth/patient', patientAuthRouter);
app.use('/api/auth/doctor', doctorAuthRouter);
app.use('/api/selectDoctor', selectDoctorRouter);

app.listen(PORT, ()=>{

    connectMongoose();
    console.log(`Server is live on port ${PORT}`)
});