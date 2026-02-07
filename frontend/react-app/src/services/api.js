import axios from 'axios';

const DOTNET_URL = 'https://localhost:7154/api';
const SPRING_URL = 'http://localhost:8081/api';

const getDotnetConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('dotnet_token')}` }
});

const getSpringConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('spring_token')}` }
});

export const loginAPIs = async () => {
    const loginData = { username: 'admin', password: 'password123' };
    const dotnetRes = await axios.post(`${DOTNET_URL}/Auth/login`, loginData);
    const springRes = await axios.post(`${SPRING_URL}/auth/login`, loginData);
    
    localStorage.setItem('dotnet_token', dotnetRes.data.token);
    localStorage.setItem('spring_token', springRes.data.token);
};

export const getStudents = () => axios.get(`${DOTNET_URL}/Students`, getDotnetConfig());
export const addStudent = (student) => axios.post(`${DOTNET_URL}/Students`, student, getDotnetConfig());
export const deleteStudent = (id) => axios.delete(`${DOTNET_URL}/Students/${id}`, getDotnetConfig());

export const getCourses = () => axios.get(`${SPRING_URL}/courses`, getSpringConfig());

export const getEnrollments = (studentId) => axios.get(`${DOTNET_URL}/Students/${studentId}/courses`, getDotnetConfig());