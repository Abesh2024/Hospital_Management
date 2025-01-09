import axios from "axios";
import { useState } from "react";

const PatientRow = ({ patient, patients, onRemove , setPatients }) => {
  console.log(patient);

   const [newStatus, setNewStatus] = useState(patient.status);
  
   axios.defaults.withCredentials = true;

    const handlePriorityChange = (event) => {
        // Update the patient's priority here
        console.log(`Priority for ${patient.name}: ${event.target.value}`);
      };


      const handleStatusChange = async(e , id) => {
        const newStatus = e.target.value;
        setNewStatus(newStatus);
        const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/${id}`, { status: newStatus });
        setPatients(patients.map((patient) => patient._id === id ? { ...patient, status: res.data.updatedQueue.status} : patient));

      };

    return (
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-md">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-bold">{patient.id}</span>
          <div>
            <p className="text-sm font-medium">{patient.patient}</p>
            <p className="text-xs text-gray-400">Arrival: {patient.arrival}</p>
            <p className="text-xs text-gray-400">Est. Wait: {patient.waitTime}</p>
          </div>
        </div>
  
        <div className="flex items-center space-x-4">
          <select
            value={newStatus}
            className="bg-gray-700 text-gray-300 text-sm rounded-md p-1"
            onChange={(e) => handleStatusChange(e , patient._id)} // Added onChange

          >
            <option>Waiting</option>
            <option>With Doctor</option>
            <option>Completed</option>
          </select>
  
          <select
            value={patient.priority}
            className="bg-gray-700 text-gray-300 text-sm rounded-md p-1"
            // onChange={(e) => handleStatusChange(e , patient._id)}

          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
  
          <button
            onClick={() => onRemove(patient._id)}
            className="p-2 bg-red-600 rounded-md text-sm"
          >
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default PatientRow;
  