import React, { useEffect, useState } from "react";
import { getAllCitas } from '../api/cita.api';
import {getAllTasks} from '../api/farmacia.api';
import {getAllmedicos} from '../api/medicos.api.js';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination.jsx";

const CitaTabla = () => {
    const [citas, setCitas] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
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

    const fetchMedicos = async () => {
        try {
            const response = await getAllmedicos();
            setMedicos(response.data);
        } catch (error) {
            console.error("Error fetching pacientes:", error);
        }
    };

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
    ? citas 
    : citas.filter(dato => dato.codigo_cita?.includes(search));

    useEffect(() => {
        fetchCitas();
        fetchMedicos();
        fetchPacientes();
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = results.slice(firstPostIndex, lastPostIndex);

    const getMedicoNombre = (medicoId) => {
        const medico = medicos.find(e => e.id === medicoId);
        return medico ? medico.nombres + " " +  medico.primerApellido : "Desconocida"; // Si no se encuentra, retorna "Desconocida"
    };

    const getPacienteNombre = (personadId) => {
        const persona = pacientes.find(e => e.id === personadId);
        return persona ? persona.nombres : "Desconocida";  // Si no se encuentra, retorna "Desconocida"
    };

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
                                <td>{getPacienteNombre(citas.Paciente)}</td>
                                <td>{getMedicoNombre(citas.Medico)}</td>
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