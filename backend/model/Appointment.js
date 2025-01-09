import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  timeSlot: String,
  status: { type: String, enum: ['Booked', 'Completed', 'Canceled'], default: 'Booked' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
