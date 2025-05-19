import axios from "axios"
import Cookies from "js-cookie";


// const myBaseUrl = 'http://127.0.0.1:8000/';

const isDevelopment: boolean = import.meta.env.MODE === 'development';
export const myBaseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY


const AxiosInstance = axios.create({
    baseURL: myBaseUrl,
    timeout: 5000,
    headers: {
        "Content-Type":"application/json",
        accept: "application/json"
    },
    withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url?.includes("/user/auth/login")) {
      config.headers.Authorization = `Token ${token}`;
    }
  
    // CSRF
    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  
    return config;
  });

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Manejar errores específicos
            if (error.response.status === 401) {
                console.error("No autorizado. Redirigiendo al login...");
                // Redirigir al login o manejar el error
            }
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance