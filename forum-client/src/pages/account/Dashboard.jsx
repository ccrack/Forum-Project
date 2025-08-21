import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import API from '../../services/api';

export default function Dashboard({ user, setUser }) {

    const [selectedCategory, setSelectedCategory] = useState(null);

    // list of category framework
    const frontendFrameworkList = [
        'React.js',
        'Angular',
        'Vue.js',
        'Svelte',
        'Ember.js',
        'Backbone.js',
        'Preact',
        'Bootstrap'
    ]

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        // setUser(null);
        navigate('/login');// go to login
    };


    // select value
    const handleSelect = (value) => {
        setSelectedCategory(value);
    };

    return (
        <div>
            <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Frontend Forum app {selectedCategory ? ">" : ""} {selectedCategory}</a>
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

            <div className='container main'>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        {/* Sidebar */}
                        <aside className="sidebar">
                            {/* create category list */}
                            <ul className='list-group'>
                                <li className="list-group-item list-group-item-secondary list-group-item-action active">Frontend Framework List</li>
                                {
                                    frontendFrameworkList.map((f, i) => (
                                        <li key={i}>
                                            <a href='#' className="list-group-item list-group-item-action" onClick={() => handleSelect(f)}>
                                                {f}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>

                        </aside>
                    </div>

                    <div className='col-md-6 col-sm-12 col-lg-8'>
                        {/* Content */}

                        {/* Forum content */}
                        <section className="content">
                            {selectedCategory ? (
                                <div className='questions-container'>
                                    <a href='#' className='btn btn-success'>Ask new question</a>
                                    <div className="card p-3 shadow-sm">
                                        <h6 className="mb-2">Javascript modal... <span>create at: 02/06/2025</span><span className="badge text-bg-secondary rounded">14</span></h6>
                                        <p>whitch is the best way to create modal?{selectedCategory} </p>
                                    </div>

                                </div>

                            ) : (
                                <div className="alert alert-info">Select a framework to see a question</div>
                            )}
                        </section>

                    </div>

                </div>
            </div>
        </div>

    );
}