import React, { useEffect, useState } from "react";
import { getAllConsultas } from '../api/consulta.api';
import { Link } from 'react-router-dom';

const ConsultaTabla = () => {
    const [consultas, setConsultas] = useState([]);

    const fetchConsultas = async () => {
        try {
            const response = await getAllConsultas();
            setConsultas(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    useEffect(() => {
        fetchConsultas();
    }, []);
    
    return(
        <div>
            <h2>Lista de consultas</h2>
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
                    {consultas.map((consultas) => (
                            <tr key={consultas.id}>
                                <td>{consultas.codigo}</td>
                                <td>{consultas.diagnostico}</td>
                                <td>{consultas.sintomas}</td>
                                <td>{consultas.cita}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="menu-btn">
                <Link to="/agregar-consulta"  className="submit">Agregar Consulta</Link >
            </div>

        </div>
    );

}

export default ConsultaTabla;