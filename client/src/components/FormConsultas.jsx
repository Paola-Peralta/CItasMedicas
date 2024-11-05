import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllConsultas, sendConsultas } from '../api/consulta.api';
import Swal from 'sweetalert2'

const FormConsulta = () => {
    const validationSchema = Yup.object({
        // codigo: Yup.string()
        // .required('El código es requerido')
        // .max(30, 'El código no debe superar los 30 caracteres'),
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

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await sendConsultas(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "La consulta ha sido registrado!",
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
              text: "No se pudo registrar esta consulta!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };


    

    return(
        <Formik
            initialValues={{ diagnostico: '', sintomas: '', cita: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                {/* <div>
                    <label htmlFor="codigo">Código de la Consulta:</label>
                    <Field type="text" id="codigo" name="codigo" />
                    <ErrorMessage name="codigo" component="p" className="error" />
                </div> */}

                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="diagnostico">Diagnóstico:</label>
                        <Field type="text" id="diagnostico" name="diagnostico" className="input-text"/>
                        <ErrorMessage name="diagnostico" component="p" className="error" />
                    </div>
                </div>
                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="sintomas">Síntomas:</label>
                        <Field as="textarea" id="sintomas" name="sintomas" className="input-area"/>
                        <ErrorMessage name="sintomas" component="p" className="error" />
                    </div>
                </div>

                <div className="item-group">
                    <div className="item-input">
                        <label htmlFor="cita">Cita:</label>
                        <Field type="number" id="cita" name="cita" className="input-text" />
                        <ErrorMessage name="cita" component="p" className="error" />
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

export default FormConsulta;