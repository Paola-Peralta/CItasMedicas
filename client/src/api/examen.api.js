import axios from 'axios';

const examenApi = axios.create({
    baseURL: 'http://localhost:8000/examen/Examen'
})

export const getAllexamen = () => examenApi.get('/')
export const sendexamen = (examen) => examenApi.post("/", examen)