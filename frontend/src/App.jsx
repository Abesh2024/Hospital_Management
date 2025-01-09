import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QueueManagement from './components/QueueManagement';
import AppointmentManagement from './components/AppointmentManagement';

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<QueueManagement />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
      </Routes>
    </div>
  </Router>
);

export default App;
