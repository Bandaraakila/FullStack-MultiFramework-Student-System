import React from 'react';
import { Link } from 'react-router-dom';
import { loginAPIs } from '../services/api';

const Navbar = () => {
    const handleLogin = async () => {
        try {
            await loginAPIs();
            alert('Authenticated with both APIs');
        } catch (err) {
            alert('Login failed. Check backends.');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">IMBS REACT PORTAL</Link>
                <div className="navbar-nav me-auto">
                    <Link className="nav-link" to="/">Students</Link>
                    <Link className="nav-link" to="/courses">Courses</Link>
                    <Link className="nav-link" to="/enrollments">View Enrollments</Link>
                </div>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogin}>Auth APIs</button>
            </div>
        </nav>
    );
};

export default Navbar;