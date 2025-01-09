import Queue from '../model/Queue.js';

export const getQueue = async (req, res) => {
  const queue = await Queue.find();
  return res.json(queue);
};


export const addPatientToQueue = async (req, res) => {
  const { patient, status, arrival, waitTime , id } = req.body;

  if (!patient || !status || !arrival || !waitTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newPatient = await Queue.create({ patient, status, arrival, waitTime , quoeueNumber: id });
  return res.json(newPatient);
};

export const removePatientFromQueue = async (req, res) => {
  const { id } = req.params;
  console.log(id, "idddddddiiii")
  await Queue.findByIdAndDelete(id);
  return res.status(200).json({
    message: 'Patient removed from the queue',
  });
};

export const updateQueue = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedQueue = await Queue.findByIdAndUpdate(id, { status });
  return res.status(200).json({message : "updated" , updatedQueue});
};
