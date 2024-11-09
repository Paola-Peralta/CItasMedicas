import React, { useEffect, useState } from "react";
import { getAllresultado } from '../api/resultado.api';
import { Link } from 'react-router-dom';

const ResultadoTabla = () => {
    const [resultado, setResultado] = useState([]);

    const fetchResultado = async () => {
        try {
            const response = await getAllresultado();
            setResultado(response.data);
        } catch (error) {
            console.error("Error fetching consultas:", error);
        }
    };

    useEffect(() => {
        fetchResultado();
    }, []);

    return(
        <div>
            <h2>Lista de Resultados</h2>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Examen</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {resultado.map((resultado) => (
                            <tr key={resultado.id}>
                                <td>{resultado.codigo}</td>
                                <td>{resultado.descripcion}</td>
                                <td>{resultado.examen}</td>
                                <td>{resultado.estado}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="menu-btn">
                <Link to="/agregar-resultado"  className="submit">Agregar Examen</Link >
            </div>

        </div>
    );

}

export default ResultadoTabla;