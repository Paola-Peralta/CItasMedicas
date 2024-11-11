import React, { useEffect, useState } from "react";
import { getAllConsultas } from '../api/consulta.api';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const ConsultaTabla = () => {
    const [consultas, setConsultas] = useState([]);
    const [ search, setSearch ] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);

    const fetchConsultas = async () => {
        try {
            const response = await getAllConsultas();
            setConsultas(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? consultas 
    : consultas.filter(dato => dato.codigo?.includes(search));

    useEffect(() => {
        fetchConsultas();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);
    
    return(
        <div>
            <h2>Lista de consultas</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Diagnostico</th>
                        <th>Sintomas</th>
                        <th>Cita</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((consultas) => (
                            <tr key={consultas.id}>
                                <td>{consultas.codigo}</td>
                                <td>{consultas.diagnostico}</td>
                                <td>{consultas.sintomas}</td>
                                <td>{consultas.cita}</td>
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
                <Link to="/agregar-consulta"  className="submit">Agregar Consulta</Link >
            </div>

        </div>
    );

}

export default ConsultaTabla;