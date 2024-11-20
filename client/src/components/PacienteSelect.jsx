import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {getAllTasks, getpaciente}from "../api/farmacia.api";

const PacienteSelect = ({ onPacienteSelect }) => {
    const [paciente, setPaciente] = useState([]);

    // Cargar la lista completa de médicos al montar el componente
    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await getAllTasks();
                setPaciente(response.data.map(paciente => ({
                    label: paciente.cedula + ' ' + paciente.nombres + ' ' + paciente.primerApellido + ' ' + paciente.segundoApellido,
                    value: paciente.id
                })));
            } catch (error) {
                console.error("Error al cargar médicos:", error);
            }
        };
        fetchPaciente();
    }, []);

    // Manejar la selección de un médico
    const handleChange = async (selectedOption) => {
        onPacienteSelect(selectedOption.value) // Actualiza el médico seleccionado
        try {
            const response = await getpaciente(selectedOption.value);
            console.log("Detalles del pacientes:", response.data);
        } catch (error) {
            console.error("Error al cargar detalles del paciente:", error);
        }
    };

    return (
        <div className="medico-select">
            <Select
                options={paciente} // Usa la lista completa para las opciones
                onChange={handleChange}
                placeholder="Busca un paciente..."
                noOptionsMessage={() => "No se encontraron pacientes"}
            />
        </div>
    );
};

export default PacienteSelect;