import React, { useEffect, useState } from "react";
import { getAllTasks } from '../api/farmacia.api';
import { Link } from 'react-router-dom';

const PacienteTable = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await getAllTasks();
                setPacientes(response.data);
            } catch (error) {
                console.error("Error fetching pacientes:", error);
            }
        };
        fetchPacientes();
    }, []);

    return (
        <div >
            <h2>Lista de Pacientes</h2>
            <table className="tabla-pacientes">
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
                    {pacientes.map((paciente) => (
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

            <div className="menu-pacientes">
                <Link to="/agregar-pacientes"  className="submit">Agregar</Link >
            </div>
        </div>

        
    );
};

export default PacienteTable;