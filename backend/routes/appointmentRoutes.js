import express from 'express';
import { getAppointments, cancelAppointment, bookAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAppointments);
router.delete('/:id', cancelAppointment);
router.post('/book', bookAppointment);

export default router;
