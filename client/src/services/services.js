import axios from "axios";

export const getAllUsers = () => axios.get('http://localhost:8000/api/users/',{ withCredentials: true });

export const getOneUser = (id) => axios.get(`http://localhost:8000/api/users/${id}`,{withCredentials: true}); 

export const createUser = (userInfo) => axios.post('http://localhost:8000/api/users/new', userInfo,{withCredentials: true});

export const updateUser = (id, task) => axios.put(`http://localhost:8000/api/users/update/${id}`, task,{withCredentials: true});

export const updateUserQR = (id, task) => axios.put(`http://localhost:8000/api/qr/update/${id}`, task,{withCredentials: true});

export const deleteUserQR = (id, task) => axios.put(`http://localhost:8000/api/qr/delete/${id}`, task,{withCredentials: true}); 

export const userRegister = (userInfo) => axios.post('http://localhost:8000/api/user/register', userInfo,{withCredentials: true});

export const userLogin = (userInfo) => axios.post('http://localhost:8000/api/user/login', userInfo,{withCredentials: true});

export const changePassword = (id, task) => axios.put(`http://localhost:8000/api/user/changepassword/${id}`, task,{withCredentials: true});

export const userLogout = (userInfo) => axios.post('http://localhost:8000/api/user/logout', userInfo,{withCredentials: true});










 

