import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormConsulta = () => {
    const validationSchema = Yup.object({
        codigo: Yup.string()
        .required('El código es requerido')
        .max(30, 'El código no debe superar los 30 caracteres'),
        diagnostico: Yup.string()
        .nullable()
        .min(5, 'El diagnóstico debe tener al menos 5 caracteres')
        .max(300, 'El diagnóstico no debe superar los 300 caracteres'),
        sintomas: Yup.string()
        .nullable(),
        cita: Yup.number()
        .required('La cita es requerida')
        .typeError('Debe seleccionar una cita válida')
    });

    

    return(
        <Formik
            initialValues={{ codigo: '', diagnostico: '', sintomas: '', cita: ''}}
            validationSchema={validationSchema}
            //on Submit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                <div>
                    <label htmlFor="codigo">Código de la Consulta:</label>
                    <Field type="text" id="codigo" name="codigo" />
                    <ErrorMessage name="codigo" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="diagnostico">Diagnóstico:</label>
                    <Field type="text" id="diagnostico" name="diagnostico" />
                    <ErrorMessage name="diagnostico" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="sintomas">Síntomas:</label>
                    <Field as="textarea" id="sintomas" name="sintomas" />
                    <ErrorMessage name="sintomas" component="p" style={{ color: 'red' }} />
                </div>

                <div>
                    <label htmlFor="cita">Cita:</label>
                    <Field type="number" id="cita" name="cita" />
                    <ErrorMessage name="cita" component="p" style={{ color: 'red' }} />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </Form>
        )}
      </Formik>
    );
};

export default FormConsulta;