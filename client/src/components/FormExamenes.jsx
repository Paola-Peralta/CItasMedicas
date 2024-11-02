import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from "react";

const FormExamenes = () => {
    const validationSchema = Yup.object({
        codigo: Yup.string()
            .required('El código es requerido')
            .max(30, 'El código no debe superar los 30 caracteres'),
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
    
    return(
        <Formik
            initialValues={{ codigo: '', nombre: '', fechaEntrega: '', consulta: ''}}
            validationSchema={validationSchema}
            //on Submit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="codigo">Código del Examen:</label>
                        <Field type="text" id="codigo" name="codigo" />
                        <ErrorMessage name="codigo" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="nombre">Nombre del Examen:</label>
                        <Field type="text" id="nombre" name="nombre" />
                        <ErrorMessage name="nombre" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="fechaEntrega">Fecha de Entrega:</label>
                        <Field type="date" id="fechaEntrega" name="fechaEntrega" />
                        <ErrorMessage name="fechaEntrega" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="consulta">Consulta:</label>
                        <Field type="number" id="consulta" name="consulta" />
                        <ErrorMessage name="consulta" component="p" style={{ color: 'red' }} />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormExamenes;