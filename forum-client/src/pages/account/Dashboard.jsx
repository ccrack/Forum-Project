import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard({ user, setUser }) {
    const navigate = useNavigate();
    const logout = () => {
        // localStorage.removeItem('token');
        // setUser(null);
        navigate('/login');// go to login
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
                navigate('/login')
            )}
        </div>
    );
}