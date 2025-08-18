import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dashboard({ user, setUser }) {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        // setUser(null);
        navigate('/login');// go to login
    };
    return (
        <div>

            <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Forum app</a>
                    <ul className="navbar-nav mb-lg-0">
                        <li className="nav-item">
                            {user ? (
                                <div className='d-flex'>
                                    <a href='#' className='nav-link'>Welcome, {user.username}</a>
                                    <a href='' className='nav-link' onClick={logout}>Logout</a>
                                </div>
                            ) : (
                                navigate('/login')
                            )}
                        </li>
                    </ul>
                </div>
            </nav>


            <div className='container-fluid'>

                hello dashboard...

            </div>

        </div>


    );
}