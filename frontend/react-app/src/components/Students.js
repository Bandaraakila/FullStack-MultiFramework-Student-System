import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent } from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ fullName: '', email: '', dateOfBirth: '', contactNumber: '' });

    useEffect(() => { load(); }, []);

    const load = () => getStudents().then(res => setStudents(res.data)).catch(() => {});

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addStudent(form);
        setForm({ fullName: '', email: '', dateOfBirth: '', contactNumber: '' });
        load();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete student?')) {
            await deleteStudent(id);
            load();
        }
    };

    const filtered = students.filter(s => s.fullName.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5>Add Student</h5>
                        <form onSubmit={handleSubmit}>
                            <input className="form-control mb-2" placeholder="Full Name" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
                            <input className="form-control mb-2" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                            <input className="form-control mb-2" type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})} required />
                            <input className="form-control mb-3" placeholder="Phone" value={form.contactNumber} onChange={e => setForm({...form, contactNumber: e.target.value})} required />
                            <button className="btn btn-primary w-100">Add Student</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="d-flex justify-content-between mb-3">
                        <h3>Student List</h3>
                        <input className="form-control w-50" placeholder="Filter by name..." onChange={e => setSearch(e.target.value)} />
                    </div>
                    <table className="table table-bordered bg-white shadow-sm">
                        <thead className="table-secondary">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.studentId}>
                                    <td>{s.fullName}</td>
                                    <td>{s.email}</td>
                                    <td>{s.contactNumber}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.studentId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;