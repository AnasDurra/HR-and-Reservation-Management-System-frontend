import axios from 'axios';
import authUtil from './authUtil';

const AxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {

          }
    })

    const token = authUtil();
    axiosInstance.defaults.headers.common['Authorization'] = token

    return axiosInstance;
}



export default AxiosInstance