import React, { useState, useEffect, use } from 'react';
import Login from './pages/account/Login';
import API from '../src/services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className='container'>
      <h1>Forum App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          <button onClick={logout}>Logout</button>
          
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}
export default App;
