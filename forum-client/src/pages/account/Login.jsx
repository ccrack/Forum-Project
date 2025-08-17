import React, { useState } from 'react';
import API from '../../services/api';
import './Login.css'

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('users/login', { username, password });
            localStorage.setItem('token', res.data.token);

             
            setUser({ username });
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className='login-container'> 
            <h2>Login</h2>
            <form className='form' onSubmit={handleLogin}>
                <input
                    className='form-control mb-3'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className='form-control mb-3'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='btn btn-primary' type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}