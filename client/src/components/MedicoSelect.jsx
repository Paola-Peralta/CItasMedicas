import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {getAllmedicos, getmedico } from "../api/medicos.api";


const MedicoSelect = ({ onMedicoSelect }) => {
    const [medicos, setMedicos] = useState([]);

    // Cargar la lista completa de médicos al montar el componente
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await getAllmedicos();
                setMedicos(response.data.map(medico => ({
                    label: medico.nombres + ' ' + medico.primerApellido + ' ' + medico.segundoApellido,
                    value: medico.id
                })));
            } catch (error) {
                console.error("Error al cargar médicos:", error);
            }
        };
        fetchMedicos();
    }, []);

    // Manejar la selección de un médico
    const handleChange = async (selectedOption) => {
        onMedicoSelect(selectedOption.value) // Actualiza el médico seleccionado
        try {
            const response = await getmedico(selectedOption.value);
            console.log("Detalles del médico:", response.data);
        } catch (error) {
            console.error("Error al cargar detalles del médico:", error);
        }
    };

    return (
        <div className="medico-select">
            <Select
                options={medicos} // Usa la lista completa para las opciones
                onChange={handleChange}
                placeholder="Busca un médico..."
                noOptionsMessage={() => "No se encontraron médicos"}
            />
        </div>
    );
};

export default MedicoSelect;
