import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllresultado, sendresultado, updateResultado } from '../api/resultado.api';
import {getAllEstados, getEstado } from "../api/estado.api";
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';

const FormResultados = () => {
        const [estados, setEstados] = useState([]); // Estado para almacenar la lista de estados
        const { id } = useParams(); // Obtener ID del resultado desde la URL
        const [initialValues, setInitialValues] = useState({
            descripcion: '',
            examen: '',
            estado: ''
        });

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await getAllEstados();
                setEstados(response.data);
            } catch (error) {
                console.error("Error al cargar los estados:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudieron cargar los estados disponibles.",
                });
            }
        };

        const fetchResultado = async () => {
            if (id) {
                try {
                    const response = await getAllresultado();
                    const resultado = response.data.find(res => res.id === parseInt(id, 10));
                    if (resultado) {
                        setInitialValues({
                            descripcion: resultado.descripcion || '',
                            examen: resultado.examen || '',
                            estado: resultado.estado || '',
                        });
                    }
                } catch (error) {
                    console.error("Error al cargar el resultado:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se pudieron cargar los datos del resultado.",
                    });
                }
            }
        };

        fetchEstados();
        fetchResultado();
    }, [id]);

    const validationSchema = Yup.object({
        descripcion: Yup.string()
        .required('La descripción es requerida')
        .min(5, 'La descripción debe tener al menos 5 caracteres')
        .max(50, 'La descripción no debe superar los 50 caracteres'),
        examen: Yup.number()
        .required('El examen es requerido')
        .typeError('Debe seleccionar un examen válido'),
        estado: Yup.number()
        .required('El estado es requerido')
        .typeError('Debe seleccionar un estado válido')
    });

    
    const handleSubmit = async (values, { resetForm }) => {
        try {
            let response;
            if (id) {
                // Actualizar resultado existente
                response = await updateResultado(id, values);
            } else {
                // Crear nuevo resultado
                response = await sendresultado(values);
            }
    
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "Excelente!",
                    text: id ? "El resultado ha sido actualizado!" : "El resultado ha sido registrado!",
                    icon: "success"
                });
                resetForm();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un problema al enviar el formulario."
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: id ? "No se pudo actualizar este resultado!" : "No se pudo registrar este resultado!",
            });
        }
    };
    
    return(
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

        >
            {({ isSubmitting }) => (
                <Form className="form">

                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="descripcion">Descripción:</label>
                        <Field type="text" id="descripcion" name="descripcion" className="input-text" />
                        <ErrorMessage name="descripcion" component="p" className="error" />
                    </div>
                </div>

                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="examen">Examen:</label>
                        <Field type="number" id="examen" name="examen" className="input-text" />
                        <ErrorMessage name="examen" component="p" className="error"/>
                    </div>
                </div>

                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="estado">Estado del Resultado:</label>
                        <Field as="select" id="estado" name="estado" className="input-text">
                            <option value="" disabled>Seleccione un estado</option>
                            {estados.map((estado) => (
                                <option key={estado.id} value={estado.id}>
                                    {estado.tipoEstado} {/* Ajusta según el atributo que contiene el nombre del estado */}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="estado" component="p" className="error" />
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="submit">
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </Form>
            )}
      </Formik>
    );
};

export default FormResultados;