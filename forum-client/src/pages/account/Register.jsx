import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastname] = useState('');
    const [firstName, setFirstname] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/users/register', { username, password, email, lastName, firstName });
            setSuccess('Registration successful! You can now log in.');
            setError('');
            navigate('/login'); // redirect after success
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
            setSuccess('');
        }
    };

    return (
        <div className='register-container'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <input
                    className='form-control mb-3'
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className='form-control mb-3'
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={e => setFirstname(e.target.value)}
                />
                <input
                    className='form-control mb-3'
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={e => setLastname(e.target.value)}
                />

                <button className='btn btn-primary' type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}