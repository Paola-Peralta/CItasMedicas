import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormResultados = () => {
    const validationSchema = Yup.object({
        codigo: Yup.string()
        .required('El código es requerido')
        .max(30, 'El código no debe superar los 30 caracteres'),
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

    
    return(
        <Formik
            initialValues={{ codigo: '', descripcion: '', examen: '',  motivo: '', estado: ''}}
            validationSchema={validationSchema}
            //on Submit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                <div>
                    <label htmlFor="codigo">Código del Resultado:</label>
                    <Field type="text" id="codigo" name="codigo" />
                    <ErrorMessage name="codigo" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <Field type="text" id="descripcion" name="descripcion" />
                    <ErrorMessage name="descripcion" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="examen">Examen:</label>
                    <Field type="number" id="examen" name="examen" />
                    <ErrorMessage name="examen" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="estado">Estado del Resultado:</label>
                    <Field type="number" id="estado" name="estado" />
                    <ErrorMessage name="estado" component="p" style={{ color: 'red' }} />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </Form>
            )}
      </Formik>
    );
};

export default FormResultados;