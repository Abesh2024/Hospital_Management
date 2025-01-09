import express from 'express';
import { getAppointments, cancelAppointment, bookAppointment, updateAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appoinments', getAppointments);
router.delete('/:id', cancelAppointment);
router.post('/book', bookAppointment);
router.put("/appoinments/:id", updateAppointment);

export default router;
