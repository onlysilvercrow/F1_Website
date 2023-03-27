import axios from 'axios'
const BASE_URL = 'http://localhost:3500/'
const test_url = 'https://ergast.com/api/'

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})

export const axiosPublic =  axios.create({
    baseURL: test_url,
    headers: {'Content-Type': 'application/json'}
})