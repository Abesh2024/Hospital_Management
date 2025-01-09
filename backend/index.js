import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import queueRoutes from './routes/queueRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRouter from "./routes/userRoute.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://hospital-management-sigma-three.vercel.app', // Replace with your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.use('/api', queueRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', userRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
