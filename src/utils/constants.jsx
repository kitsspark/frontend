import axios from 'axios';
export  const APIURL  = 'https://api.kitsspark.in'

export const AxiosInstance = axios.create({
    baseURL: 'https://api.kitsspark.in',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
})
