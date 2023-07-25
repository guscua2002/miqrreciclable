import axios from "axios";

export const getAllUsers = () => axios.get('/api/users/',{ withCredentials: true });

export const getOneUser = (id) => axios.get(`/api/users/${id}`,{withCredentials: true}); 

export const createUser = (userInfo) => axios.post('/api/users/new', userInfo,{withCredentials: true});

export const updateUser = (id, task) => axios.put(`/api/users/update/${id}`, task,{withCredentials: true});

export const updateUserQR = (id, task) => axios.put(`/api/qr/update/${id}`, task,{withCredentials: true});

export const deleteUserQR = (id, task) => axios.put(`/api/qr/delete/${id}`, task,{withCredentials: true}); 

export const userRegister = (userInfo) => axios.post('/api/user/register', userInfo);

export const userLogin = (userInfo) => axios.post('/api/user/login', userInfo,{withCredentials: true});

export const changePassword = (id, task) => axios.put(`/api/user/changepassword/${id}`, task,{withCredentials: true});

export const userLogout = (userInfo) => axios.post('/api/user/logout', userInfo,{withCredentials: true});










 

