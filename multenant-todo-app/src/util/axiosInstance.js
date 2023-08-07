import axios from "axios";
import { baseUrl } from "../constants/baseUrl";

const axiosInstance = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  withCredentials: true, // This enables sending cookies along with requests
});

export default axiosInstance;
