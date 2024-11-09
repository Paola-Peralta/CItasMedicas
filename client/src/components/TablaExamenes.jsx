import React, { useEffect, useState } from "react";
import { getAllexamen } from '../api/examen.api';
import { Link } from 'react-router-dom';

const ExamenesTabla = () => {
    const [examenes, setExamenes] = useState([]);

    const fetchExamenes = async () => {
        try {
            const response = await getAllexamen();
            setExamenes(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    useEffect(() => {
        fetchExamenes();
    }, []);

    return(
        <div>
            <h2>Lista de Examenes</h2>
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
                    {examenes.map((examenes) => (
                            <tr key={examenes.id}>
                                <td>{examenes.codigo}</td>
                                <td>{examenes.nombre}</td>
                                <td>{examenes.fechaEntrega}</td>
                                <td>{examenes.consulta}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="menu-btn">
                <Link to="/agregar-examen"  className="submit">Agregar Examen</Link >
            </div>

        </div>
    );

}
export default ExamenesTabla;