import axios from 'axios';

const consultaApi = axios.create({
    baseURL: 'http://localhost:8000/catalogos/Consulta'
})

export const getAllConsultas = () => consultaApi.get('/')
export const sendConsultas = (consultas) => consultaApi.post("/", consultas)