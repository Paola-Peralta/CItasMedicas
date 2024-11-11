import React, { useEffect, useState } from "react";
import { getAllCitas } from '../api/cita.api';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const CitaTabla = () => {
    const [citas, setCitas] = useState([]);
    const [ search, setSearch ] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);

    const fetchCitas = async () => {
        try {
            const response = await getAllCitas();
            setCitas(response.data);
        } catch (error) {
            console.error("Error fetching citas:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? citas 
    : citas.filter(dato => dato.codigo_cita?.includes(search));

    useEffect(() => {
        fetchCitas();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    return (
        <div>
            <h2>Lista de citas</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código de la cita</th>
                        <th>Fecha</th>
                        <th>Fecha y hora </th>
                        <th>Motivo</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((citas) => (
                            <tr key={citas.id}>
                                <td>{citas.codigo_cita}</td>
                                <td>{citas.Fecha}</td>
                                <td>{citas.Hora_cita}</td>
                                <td>{citas.motivo}</td>
                                <td>{citas.Paciente}</td>
                                <td>{citas.Medico}</td>
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
                <Link to="/agregar-citas"  className="submit">Agregar Cita</Link >
            </div>

        </div>

    );
}
export default CitaTabla;