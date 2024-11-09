import React, { useEffect, useState } from "react";
import { getAllexamen } from '../api/examen.api';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const ExamenesTabla = () => {
    const [examenes, setExamenes] = useState([]);
    const [ search, setSearch ] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const fetchExamenes = async () => {
        try {
            const response = await getAllexamen();
            setExamenes(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? examenes 
    : examenes.filter(dato => dato.codigo?.includes(search));

    useEffect(() => {
        fetchExamenes();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    return(
        <div>
            <h2>Lista de Examenes</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre Examen</th>
                        <th>Fecha entrega</th>
                        <th>Consulta</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((examenes) => (
                            <tr key={examenes.id}>
                                <td>{examenes.codigo}</td>
                                <td>{examenes.nombre}</td>
                                <td>{examenes.fechaEntrega}</td>
                                <td>{examenes.consulta}</td>
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
                <Link to="/agregar-examen"  className="submit">Agregar Examen</Link >
            </div>

        </div>
    );

}
export default ExamenesTabla;