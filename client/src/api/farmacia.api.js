import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Paciente'
})

export const getAllTasks = () => tasksApi.get('/')
export const sendPaciente = (paciente) => tasksApi.post("/", paciente)