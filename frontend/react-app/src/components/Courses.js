import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getCourses().then(res => setCourses(res.data));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Available Courses</h3>
                    <ul className="list-group shadow-sm">
                        {courses.map(c => (
                            <li key={c.courseId} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
                                style={{cursor: 'pointer'}} onClick={() => setSelected(c)}>
                                {c.courseName}
                                <span className="badge bg-primary rounded-pill">{c.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>Course Details</h3>
                    {selected ? (
                        <div className="card border-primary shadow">
                            <div className="card-body">
                                <h4 className="card-title text-primary">{selected.courseName}</h4>
                                <hr />
                                <p><strong>Description:</strong> {selected.description}</p>
                                <p><strong>Duration:</strong> {selected.duration}</p>
                                <p className="h5 text-success">Fee: LKR {selected.fee}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">Select a course to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;