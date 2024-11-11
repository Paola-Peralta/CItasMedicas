import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllexamen, sendexamen } from '../api/examen.api';
import Swal from 'sweetalert2'

const FormExamenes = () => {
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre del examen es requerido')
            .min(5, 'El nombre debe tener al menos 5 caracteres')
            .max(100, 'El nombre no debe superar los 100 caracteres'),
        fechaEntrega: Yup.date()
            .required('La fecha de entrega es requerida')
            .typeError('Debe ser una fecha válida'),
        consulta: Yup.number()
            .required('La consulta es requerida')
            .typeError('Debe seleccionar una consulta válida')
    });
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await sendexamen(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "El examen ha sido registrado!",
                  icon: "success"
                });
                resetForm();
            } else {
                alert('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo registrar esta Examen!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return(
        <Formik
            initialValues={{nombre: '', fechaEntrega: '', consulta: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="form">

                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="nombre">Nombre del Examen:</label>
                            <Field type="text" id="nombre" name="nombre" className="input-text" />
                            <ErrorMessage name="nombre" component="p" className="error" />
                        </div>
                    </div>

                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="fechaEntrega">Fecha de Entrega:</label>
                            <Field type="date" id="fechaEntrega" name="fechaEntrega" className="input-date " />
                            <ErrorMessage name="fechaEntrega" component="p" className="error"/>
                        </div>
                    </div>

                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="consulta">Consulta:</label>
                            <Field type="number" id="consulta" name="consulta" className="input-text"/>
                            <ErrorMessage name="consulta" component="p" className="error" />
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

export default FormExamenes;