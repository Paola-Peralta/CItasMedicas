import axios from 'axios';

const medicoApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Medico'
})

export const getAllmedicos = () => medicoApi.get('/')
export const getmedico = (id) => medicoApi.get(`/${id}`)
export const sendmedico = (medico) => medicoApi.post("/", medico)

const especialidadApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Especialidad'
})

export const getAllEspecialidad = () => especialidadApi.get('/')
export const sendEspecialidad = (especialidad) => especialidadApi.post("/", especialidad)
export const getEspecialidad= (id) => especialidadApi.get(`/${id}`)