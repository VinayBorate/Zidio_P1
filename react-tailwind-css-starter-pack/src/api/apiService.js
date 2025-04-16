import axios from 'axios';

const BASE = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');

    const publicEndpoints = [
      '/admin/signup', '/admin/login',
      '/manager/signup', '/manager/login',
      '/employee/signup', '/employee/login'
    ];

    const isPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const apiService = {
  
  adminSignup: (data) => api.post('/admin/signup', data, { headers: jsonHeaders }),
  adminLogin: (data) => api.post('/admin/login', data, { headers: jsonHeaders }),


  managerSignup: (data) => api.post('/manager/signup', data, { headers: jsonHeaders }),
  managerLogin: (data) => api.post('/manager/login', data, { headers: jsonHeaders }),

  employeeSignup: (data) => api.post('/employee/signup', data, { headers: jsonHeaders }),
  employeeLogin: (data) => api.post('/employee/login', data, { headers: jsonHeaders }),

  submitExpense: (data) => api.post('/expenses/submit', data),
  getPendingExpenses: () => api.get('/expenses/pending'),
  approveExpense: (id) => api.put(`/expenses/approve/${id}`),
  rejectExpense: (id) => api.put(`/expenses/reject/${id}`),
  getAllExpenses: () => api.get('/expenses/all'),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  getExpensesAboveOneLakh: () => api.get('/expenses/aboveonelakh'),

 
  getEmployeeExpenses: (email) => api.get(`/expenses/employee/${email}`),
};

export default apiService;
