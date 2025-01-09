import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { useLocation, useNavigate } from 'react-router-dom';

const AppointmentManagement = () => {
//   const [appointments, setAppointments] = useState([]);
const appointments = [
    { id: 1, name: "Alice Brown", doctor: "Dr. Smith", time: "10:00 AM", status: "Booked" },
    { id: 2, name: "Charlie Davis", doctor: "Dr. Johnson", time: "11:30 AM", status: "Booked" },
    { id: 3, name: "Eva White", doctor: "Dr. Lee", time: "2:00 PM", status: "Booked" },
  ];

  const {pathname} = useLocation();
  const navigate = useNavigate();
  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Lee"];

  

//   useEffect(() => {
//     api.get('/appointments').then((response) => setAppointments(response.data));
//   }, []);

const handleStatusChange = (id, event) => {
    console.log(`Status for Appointment ${id}: ${event.target.value}`);
  };

//   const cancelAppointment = (id) => {
//     api.delete(`/appointments/${id}`).then(() => {
//       setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
//     });
//   };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    doctor: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleScheduleAppointment = () => {
    console.log("New Appointment Details:", newAppointment);
    setIsModalOpen(false);
    // Here, you can add the logic to save the new appointment to the database or update state.
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Clinic Front Desk</h1>
      <button className="text-sm bg-gray-800 px-3 py-1 rounded-md">Log out</button>
    </header>

    <div>
      <h2 className="text-xl font-semibold mb-4">Front Desk Dashboard</h2>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-800 rounded-md  disabled:cursor-not-allowed disabled:opacity-55" disabled={pathname == "/" ? true : false}>Queue Management</button>
        <button  className="px-4 py-2 bg-gray-800 rounded-md  disabled:cursor-not-allowed disabled:opacity-55" disabled={pathname == "/" ? false  : true}>Appointment Managemen</button>
    </div>

      <div className="bg-gray-800 p-6 rounded-md">
        <h3 className="text-lg font-bold mb-4">Appointment Management</h3>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between bg-gray-900 p-4 rounded-md"
            >
              <div>
                <p className="text-sm font-medium">{appointment.name}</p>
                <p className="text-xs text-gray-400">{appointment.doctor}</p>
                <p className="text-xs text-gray-400">{appointment.time}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md">
                  {appointment.status}
                </span>
                <select
                  value={appointment.status}
                  onChange={(e) => console.log(`Status changed: ${e.target.value}`)}
                  className="bg-gray-700 text-gray-300 text-sm rounded-md p-1"
                >
                  <option value="Booked">Booked</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full bg-gray-700 text-white py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Schedule New Appointment
        </button>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-900 p-6 rounded-md w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Schedule New Appointment</h3>
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
                value={newAppointment.patient}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Doctor</label>
              <select
                name="doctor"
                value={newAppointment.doctor}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                className="w-full bg-gray-800 text-gray-300 p-2 rounded-md"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-md"
              onClick={handleScheduleAppointment}
            >
              Schedule Appointment
            </button>
          </form>
        </div>
      </div>
    )}
  </div>

  );
};

export default AppointmentManagement;
