import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const getMe = () => API.get('/auth/me');
export const getAllUsers = () => API.get('/auth/users');

// Audit APIs
export const createAudit = (auditData) => API.post('/audits', auditData);
export const getAllAudits = (params) => API.get('/audits', { params });
export const getAudit = (id) => API.get(`/audits/${id}`);
export const updateAudit = (id, auditData) => API.put(`/audits/${id}`, auditData);
export const submitAudit = (id) => API.post(`/audits/${id}/submit`);
export const getAuditStats = () => API.get('/audits/stats');

// Assignment APIs
export const createAssignment = (assignmentData) => API.post('/assignments', assignmentData);
export const getAllAssignments = () => API.get('/assignments');
export const getAssignment = (id) => API.get(`/assignments/${id}`);
export const updateAssignment = (id, assignmentData) => API.put(`/assignments/${id}`, assignmentData);
export const deleteAssignment = (id) => API.delete(`/assignments/${id}`);

// Upload APIs
export const uploadSingle = (formData) => API.post('/upload/single', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const uploadMultiple = (formData) => API.post('/upload/multiple', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export default API;
