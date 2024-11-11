import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllresultado, sendresultado } from '../api/resultado.api';
import Swal from 'sweetalert2'

const FormResultados = () => {
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
            const response = await sendresultado(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "El resultado ha sido registrado!",
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
              text: "No se pudo registrar este resultado!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };
    

    
    return(
        <Formik
            initialValues={{descripcion: '', examen: '',  motivo: '', estado: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="form">
                {/* <div>
                    <label htmlFor="codigo">Código del Resultado:</label>
                    <Field type="text" id="codigo" name="codigo" />
                    <ErrorMessage name="codigo" component="p" className="error" />
                </div> */}

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
                        <Field type="number" id="estado" name="estado" className="input-text" />
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