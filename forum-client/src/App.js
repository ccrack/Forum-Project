import React, { useState } from 'react';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/account/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Register route */}
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} setUser={setUser}/> : <Navigate to="/dashboard" />}
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
export default App;
