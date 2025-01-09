import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QueueManagement from './components/QueueManagement';
import AppointmentManagement from './components/AppointmentManagement';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null)
  useEffect(()=> {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token])


     return(
       <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
          <Route path="/" element={token ? <QueueManagement/> : <Navigate to="/login" />} />
          <Route path="/login"  element={token == null ? <Login setToken={setToken}/> : <Navigate to="/"/>}/>
            {/* <Route path="/" element={<QueueManagement />} />
            <Route path="/login" element={<Login />} /> */}
            <Route path="/appointments" element={<AppointmentManagement />} />
          </Routes>
        </div>
      </Router>
)
};

export default App;
