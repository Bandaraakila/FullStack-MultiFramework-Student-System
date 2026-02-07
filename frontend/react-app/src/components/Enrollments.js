import React, { useState, useEffect } from 'react';
import { getStudents, getCourses, getEnrollments } from '../services/api';

const Enrollments = () => {
    const [students, setStudents] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [studentEnrollments, setStudentEnrollments] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');

    useEffect(() => {
        getStudents().then(res => setStudents(res.data));
        getCourses().then(res => setAllCourses(res.data));
    }, []);

    const fetchEnrollments = async (id) => {
        setSelectedStudentId(id);
        if(!id) return;
        const res = await getEnrollments(id);
        setStudentEnrollments(res.data);
    };

    const getCourseName = (id) => {
        const course = allCourses.find(c => c.courseId === id);
        return course ? course.courseName : 'Unknown Course';
    };

    return (
        <div className="container">
            <div className="card shadow-sm p-4">
                <h4>Check Student Enrollments</h4>
                <div className="mb-4 mt-3">
                    <label className="form-label">Select a Student</label>
                    <select className="form-select" value={selectedStudentId} onChange={e => fetchEnrollments(e.target.value)}>
                        <option value="">-- Choose Student --</option>
                        {students.map(s => <option key={s.studentId} value={s.studentId}>{s.fullName}</option>)}
                    </select>
                </div>

                <h5>Enrolled Courses (Mapping from both APIs)</h5>
                <ul className="list-group mt-2">
                    {studentEnrollments.length > 0 ? studentEnrollments.map(e => (
                        <li key={e.enrollmentId} className="list-group-item d-flex justify-content-between">
                            <span>{getCourseName(e.courseId)}</span>
                            <span className="text-muted">{new Date(e.enrollmentDate).toLocaleDateString()}</span>
                        </li>
                    )) : (
                        <li className="list-group-item text-center text-muted">No enrollments found for this student</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Enrollments;