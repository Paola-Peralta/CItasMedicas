import axios from 'axios';

const resultadoApi = axios.create({
    baseURL: 'http://localhost:8000/examen/Resultado'
})

export const getAllresultado = () => resultadoApi.get('/')
export const sendresultado = (resultado) => resultadoApi.post("/", resultado)
export const updateResultado = (id, resultado) => resultadoApi.put(`/${id}/`, resultado);