import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {getAllEspecialidad, getEspecialidad } from "../api/medicos.api";


const EspecialidadSelect = ({ onEspecialidadSelect }) => {
    const [especialidad, setEspecialidad] = useState([]);

    // Cargar la lista completa de médicos al montar el componente
    useEffect(() => {
        const fetchEspecialidad = async () => {
            try {
                const response = await getAllEspecialidad();
                setEspecialidad(response.data.map(especialidad => ({
                    label: especialidad.nombre ,
                    value: especialidad.id
                })));
            } catch (error) {
                console.error("Error al cargar médicos:", error);
            }
        };
        fetchEspecialidad();
    }, []);

    // Manejar la selección de un médico
    const handleChange = async (selectedOption) => {
        onEspecialidadSelect(selectedOption.value) // Actualiza el médico seleccionado
        try {
            const response = await getEspecialidad(selectedOption.value);
            console.log("Detalles de la especialidad:", response.data);
        } catch (error) {
            console.error("Error al cargar detalles de la especialidad:", error);
        }
    };

    return (
        <div className="medico-select">
            <Select
                options={especialidad} // Usa la lista completa para las opciones
                onChange={handleChange}
                placeholder="Busca un médico..."
                noOptionsMessage={() => "No se encontraron médicos"}
            />
        </div>
    );
};

export default EspecialidadSelect;