import React, { useEffect, useState } from "react";
import { getAllTasks } from '../api/farmacia.api';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const PacienteTable = () => {
    const [pacientes, setPacientes] = useState([]);
    const [ search, setSearch ] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const fetchPacientes = async () => {
        try {
            const response = await getAllTasks();
            setPacientes(response.data);
        } catch (error) {
            console.error("Error fetching pacientes:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? pacientes 
    : pacientes.filter(dato => dato.cedula?.includes(search));

    useEffect(() => {
        fetchPacientes();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    return (
        <div >
            <h2>Lista de Pacientes</h2>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cédula</th>
                        <th>Nombres</th>
                        <th>Primer Apellido</th>
                        <th>Segundo Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((paciente) => (
                        <tr key={paciente.codigo}>
                            <td>{paciente.codigo}</td>
                            <td>{paciente.cedula}</td>
                            <td>{paciente.nombres}</td>
                            <td>{paciente.primerApellido}</td>
                            <td>{paciente.segundoApellido}</td>
                            <td>{paciente.fecha_nacimiento}</td>
                            <td>{paciente.direccion}</td>
                            <td>{paciente.telefono}</td>
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
                <Link to="/agregar-pacientes"  className="submit">Agregar</Link >
            </div>
        </div>

        
    );
};

export default PacienteTable;