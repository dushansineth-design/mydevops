import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5050/api",
  //baseURL: "http://3.91.209.132:5050/api",
  withCredentials: true,
});

console.log('Axios Instance Loaded with URL:', instance.defaults.baseURL);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

//export default instance;