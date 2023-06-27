import axios from "axios";
import authUtil from "./authUtil";

const AxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173/',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          
        }
    })

    const token = authUtil();
    axiosInstance.defaults.headers.common['Authorization'] = token

  return axiosInstance;
};

export default AxiosInstance;
