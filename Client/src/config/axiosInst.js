import axios from 'axios';

const BASE_URL="http://localhost:5001/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.base=BASE_URLl
axiosInstance.defaults.withCredentials=true;
axiosInstance.defaults.timeout=10000000000000;
export default axiosInstance;