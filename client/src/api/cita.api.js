import axios from 'axios';

const citaApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Cita'
})

export const getAllCitas = () => citaApi.get('/')
export const sendCitas = (citas) => citaApi.post("/", citas)