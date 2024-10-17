import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRouter from "./routes/auth.js";
import messageRouter from "./routes/message.js"
import userRouter from './routes/user.js'
import roomRouter from './routes/room.js'
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

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/room', roomRouter)
app.use('/api', userRouter);

app.listen(PORT, ()=>{

    connectMongoose();
    console.log(`Server is live on port ${PORT}`)
});