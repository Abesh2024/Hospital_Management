import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema({
  patient: String,
  queueNumber: Number,
  status: { type: String, enum: ['Waiting', 'With Doctor', 'Completed'], default: 'Waiting' },
  arrival: String,
  waitTime: String,
});

const Queue = mongoose.model('Queue', queueSchema);

export default Queue;
