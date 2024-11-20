import React, { useEffect, useState } from "react";
import { getAllmedicos } from '../api/medicos.api';
import { getAllEspecialidad } from '../api/medicos.api';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const MedicoTabla = () => {
    const [medicos, setMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [ search, setSearch ] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const fetchMedicos = async () => {
        try {
            const response = await getAllmedicos();
            setMedicos(response.data);
        } catch (error) {
            console.error("Error fetching pacientes:", error);
        }
    };

    const fetchEspecialidades = async () => {
        try {
            const response = await getAllEspecialidad();
            setEspecialidades(response.data); // Asume que `response.data` contiene las especialidades
        } catch (error) {
            console.error("Error fetching especialidades:", error);
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value)
    }
    
    const results = (search ?? '').trim() === '' 
    ? medicos 
    : medicos.filter(dato => dato.codigo?.includes(search));
    
    useEffect(() => {
        fetchMedicos();
        fetchEspecialidades();
    }, []);
    
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    const getEspecialidadNombre = (especialidadId) => {
        const especialidad = especialidades.find(e => e.id === especialidadId);
        return especialidad ? especialidad.nombre : "Desconocida"; // Si no se encuentra, retorna "Desconocida"
    };

    return (
        <div >
            <h3>Lista de Médicos</h3>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className="medicos">
                <thead>
                    <tr >
                        <th>Código</th>
                        <th>Nombres</th>
                        <th>Primer Apellido</th>
                        <th>Segundo Apellido</th>
                        <th>Teléfono</th>
                        <th>Especialidad</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((medicos) => (
                        <tr key={medicos.codigo}>
                            <td>{medicos.codigo}</td>
                            <td>{medicos.nombres}</td>
                            <td>{medicos.primerApellido}</td>
                            <td>{medicos.segundoApellido}</td>
                            <td>{medicos.telefono}</td>
                            <td>{getEspecialidadNombre(medicos.especialidad)}</td>
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
                <Link to="/agregar-medicos"  className="submit">Agregar</Link>
            </div>
        </div>

        
    );
    
};
export default MedicoTabla;
