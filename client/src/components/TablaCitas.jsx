import React, { useEffect, useState } from "react";
import { getAllCitas } from '../api/cita.api';
import { Link } from 'react-router-dom';

const CitaTabla = () => {
    const [citas, setCitas] = useState([]);

    const fetchCitas = async () => {
        try {
            const response = await getAllCitas();
            setCitas(response.data);
        } catch (error) {
            console.error("Error fetching citas:", error);
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    return (
        <div>
            <h2>Lista de citas</h2>
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
                    {citas.map((citas) => (
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

            <div className="menu-btn">
                <Link to="/agregar-citas"  className="submit">Agregar Cita</Link >
            </div>

        </div>

    );
}
export default CitaTabla;