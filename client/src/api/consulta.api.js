import axios from 'axios';

const consultaApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Consulta'
})

export const getAllConsultas = () => consultaApi.get('/')
export const getConsulta = (id) => consultaApi.get(`/${id}`)
export const sendConsultas = (consultas) => consultaApi.post("/", consultas)