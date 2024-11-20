import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/examen/Estado'
})

export const getAllEstados = () => tasksApi.get('/')
//export const sendEstado = (paciente) => tasksApi.post("/", paciente)
export const getEstado = (id) => tasksApi.get(`/${id}`)