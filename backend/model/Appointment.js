import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: String,
  doctor: String,
  time: String,
  status: { type: String, enum: ['Booked', 'Completed', 'Canceled'], default: 'Booked' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
