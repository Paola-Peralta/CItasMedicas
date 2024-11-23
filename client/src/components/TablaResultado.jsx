import React, { useEffect, useState } from "react";
import { getAllresultado, updateResultado } from '../api/resultado.api';
import { getAllexamen } from '../api/examen.api';
import { getAllEstados } from '../api/estado.api.js';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const ResultadoTabla = () => {
    const [resultado, setResultado] = useState([]);
    const [ search, setSearch ] = useState("");
    const [examenes, setExamenes] = useState([]);
    const [estado, setEstado] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const fetchResultado = async () => {
        try {
            const response = await getAllresultado();
            setResultado(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    const fetchExamenes = async () => {
        try {
            const response = await getAllexamen();
            setExamenes(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    const fetchEstado = async () => {
        try {
            const response = await getAllEstados();
            setEstado(response.data);
        } catch (error) {
            console.error("Error fetching estado:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? resultado 
    : resultado.filter(dato => dato.codigo?.includes(search));

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        fetchResultado();
        fetchExamenes();
        fetchEstado();
    }, []);

    const getExamen = (examenesId) => {
        const examen = examenes.find(e => e.id === examenesId);
        return examen ? examen.nombre : "Desconocido"; // Si no se encuentra, retorna "Desconocida"
    };

    const getEstado = (estadoId) => {
        const estados = estado.find(e => e.id === estadoId);
        return estados ? estados.tipoEstado : "Desconocido"; // Si no se encuentra, retorna "Desconocida"
    };

    return(
        <div>
            <h2>Lista de Resultados</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="medicos">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Nombre del Examen</th>
                        <th>Estado</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((resultado) => (
                            <tr key={resultado.id}>
                                <td>{resultado.codigo}</td>
                                <td>{resultado.descripcion}</td>
                                <td>{getExamen(resultado.examen)}</td>
                                <td>{getEstado(resultado.estado)}</td>
                                <td>
                                <Link to={`/editar-resultado/${resultado.id}`} className="btn btn-primary">Editar</Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Pagination
                totalPosts={results.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            
            <div className="menu-btn">
                <Link to="/agregar-resultado"  className="submit">Agregar Examen</Link >
            </div>

        </div>
    );

}

export default ResultadoTabla;