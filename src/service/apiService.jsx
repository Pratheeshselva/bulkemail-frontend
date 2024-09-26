import axios from "axios";
import config from "../utils/Config";



const api = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    if (config.authenticate === true)
        config.headers.Authorization = `Bearer ${token}`
    return config
}, (error) => Promise.reject(error))


api.interceptors.response.use((response) => {
    //     if([200,201].includes(response.status)){
    // toast.success(response.data.message)
    //     }

    return response.data
}, (error) => {
    // toast.error(error.response.data.message)
    return Promise.reject(error)
})


export default api