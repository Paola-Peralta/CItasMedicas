import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {getAllCitas, getCita } from "../api/cita.api";

const CitaSelect = ({ onCitaSelect }) => {
    const [citas, setCitas] = useState([]);

    // Cargar la lista completa de médicos al montar el componente
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await getAllCitas();
                setCitas(response.data.map(citas => ({
                    label: citas.codigo_cita + ' ',
                    value: citas.id
                })));
            } catch (error) {
                console.error("Error al cargar citas:", error);
            }
        };
        fetchCitas();
    }, []);

    const handleChange = async (selectedOption) => {
        onCitaSelect(selectedOption.value) // Actualiza el médico seleccionado
        try {
            const response = await getCita(selectedOption.value);
            console.log("Detalles de la cita:", response.data);
        } catch (error) {
            console.error("Error al cargar detalles de la cita:", error);
        }
    };


    return (
        <div className="medico-select">
            <Select
                options={citas} // Usa la lista completa para las opciones
                onChange={handleChange}
                placeholder="Busca una cita..."
                noOptionsMessage={() => "No se encontro cita"}
            />
        </div>
    );
};

export default CitaSelect;