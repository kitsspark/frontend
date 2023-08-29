import axios from 'axios';
export  const APIURL  = 'https://api.kitsspark.in'

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZG9AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjkzMzI2Mzg0fQ.qTkyu9s7unBotn483tAfqEmcsxpPRfDQyDkbPYc9l3k`
      }
})
