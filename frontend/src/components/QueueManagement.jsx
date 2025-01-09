import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PatientRow from './PatientRow';
import { useParams , useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const QueueManagement = () => {
  const [val, setVal] = useState("");
  const [patients, setPatients] = useState([]);
  console.log(patients);

  const status = ["Waiting", "With Doctor", "Completed"];
  const {pathname} = useLocation();

   const [isModalOpen, setIsModalOpen] = useState(false);

    const [inputVal, setInputVal] = useState({
      patient: "",
      status: "",
      arrival_time: "",
      wait_time: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputVal({ ...inputVal, [name]: value });
      console.log("New Appointment Details:", inputVal);
    };

    const handleQueue = () => {
      setIsModalOpen(true);
      // Here, you can add the logic to save the new appointment to the database or update state.
    };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/getAllQueue`).then((response) => setPatients(response.data));
  }, []);

const addPatientToQueue = async() => {
  const newPatient = {
      id: patients.length + 1,
      patient: inputVal.patient,
      status: inputVal.status,
      arrival: inputVal.arrival_time,
      waitTime: inputVal.wait_time,
    };

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/queue`, newPatient);
    setPatients([...patients, response.data]);
    
      setInputVal({
        patient: "",
        status: "",
        arrival: "",
        waitTime: "",
    });

    setIsModalOpen(false);
  };

const navigate = useNavigate();

  const updateStatus = (id, status) => {
    api.put(`/queue/${id}`, { status }).then(() => {
      setPatients((prev) =>
        prev.map((patient) => (patient._id === id ? { ...patient, status } : patient))
      );
    });
  };

  const handleRemovePatient = async (id) => {
    try {
      // Make API call to delete patient
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/${id}/remove`);
  
      if (response.status === 200) {
        setPatients([...patients].filter((patient) => patient._id !== id));
        console.log(`Patient with id ${id} removed successfully.`);
      } else {
        console.error(`Failed to remove patient with id ${id}.`);
      }
    } catch (error) {
      console.error(`Error removing patient with id ${id}:`, error);
    }
  };

  const filterPatient = (data) => {
      return data.filter((item)=> item.patient.toLowerCase().includes(val.toLowerCase()));
  }
  

  return (
    <div className="p-6 bg-gray-900 text-white">
    <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold mb-4">Front Desk Dashboard</h2>
       
      <input
        type="text"
        placeholder="Search patients"
        className="px-4 py-2 rounded-md bg-gray-800 text-gray-300"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>

    <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-gray-800 rounded-md disabled:cursor-not-allowed disabled:opacity-55" disabled={pathname == "/" ? true : false}>Queue Management</button>
        <button className="px-4 py-2 bg-gray-800 rounded-md  disabled:cursor-not-allowed" onClick={()=> navigate("/appointments")} disabled={pathname == "/" ? false  : true}>Appointment Managemen</button>
      </div>

    <div className="space-y-4">
      {filterPatient(patients).map((patient) => (
        <PatientRow
          key={patient._id}
          patient={patient}
          patients={patients}
          onRemove={handleRemovePatient}
          setPatients={setPatients}
        />
      ))}
    </div>

    <button className="mt-4 px-4 py-2 bg-blue-600 rounded-md text-white font-medium" onClick={handleQueue}>
      Add New Patient to Queue
    </button>

     {/* Modal */}
     {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-900 p-6 rounded-md w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Schedule New Qeue</h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-4">Enter the appointment details.</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Patient</label>
              <input
                type="text"
                name="patient"
                value={inputVal.patient}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                name="status"
                value={inputVal.status}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              >
                <option value="">Status</option>
                {status.map((val) => (
                  <option key={val} value={val}>  
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Arrival Time</label>
              <input
                type="time"
                name="arrival_time"
                value={inputVal.arrival_time}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Wait Time</label>
              <input
                type="time"
                name="wait_time"
                value={inputVal.wait_time}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-md"
              onClick={addPatientToQueue}
            >
              Add Patient to Queue
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default QueueManagement;
