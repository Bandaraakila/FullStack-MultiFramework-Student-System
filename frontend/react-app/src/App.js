import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Students from './components/Students';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/enrollments" element={<Enrollments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;