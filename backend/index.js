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
    origin: 'http://localhost:5173', // Replace with your frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.use('/api', queueRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
