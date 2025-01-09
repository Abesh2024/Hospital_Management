import Appointment from '../model/Appointment.js';

export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
};

export const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndDelete(id);
  res.sendStatus(200);
};

// Book a new appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, time } = req.body;

    // Validate request body
    if (!patient || !doctor || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      patient,
      doctor,
      time,
      status: 'Booked', // Default status
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};


export const updateAppointment = async(req , res) => {
   
     const { id } = req.params;
     const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    return res.status(200).json({message : "updated succesfully" , updatedAppointment})
}