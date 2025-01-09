import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QueueManagement from './components/QueueManagement';
import AppointmentManagement from './components/AppointmentManagement';
import Login from './pages/Login';

const App = () => {
     const token = localStorage.getItem("token");

     return(
       <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path={token ? "/" : "/login"} element={<QueueManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/appointments" element={<AppointmentManagement />} />
          </Routes>
        </div>
      </Router>
)
};

export default App;
