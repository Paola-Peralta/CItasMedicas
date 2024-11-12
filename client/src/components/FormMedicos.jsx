import React from "react";
import { sendmedico } from '../api/medicos.api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import EspecilidadSelect from "./EspecialidadSelect.jsx";

const FormMedicos= () => {

    const validationSchema = Yup.object({
    nombres: Yup.string()
    .required('El nombre es requerido')
    .min(5, 'El nombre debe tener al menos 5 caracteres'),
    primerApellido: Yup.string()
    .required('El apellido es requerida')
    .min(5, 'El apellido debe tener al menos 5 caracteres'),
    segundoApellido: Yup.string()
    .required('El apellido es requerida')
    .min(5, 'El apellido debe tener al menos 5 caracteres'),
    telefono: Yup.string()
    .required('El télefono es requerida')
    .min(8, 'El teléfono debe tener al menos 5 caracteres'),
    especialidad: Yup.number()
    .required('La especialidad es requerida')
    .min(1, 'La especialidad debe tener al menos 1 caracter')

    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log("form values", values)
            const response = await sendmedico(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "El médico ha sido registrado!",
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
              text: "No se pudo registrar a este médico!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return(

        <Formik
          initialValues={{ nombres: '', primerApellido: '', segundoApellido: '',telefono:'', especialidad:''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
    
          {({ isSubmitting, setFieldValue, values }) => { 
            return(
            <Form className="form">
              <div className="item-group">
              <div className="item-input">
                <label htmlFor="nombre" className="label" >Nombres:</label>
                <Field type="text" id="nombre" name="nombres" className="input-text"/>
                <ErrorMessage name="nombre" component="p" className="error" />
              </div>
    
              <div className="item-input">
                <label htmlFor="primerApellido" className="label" >Primer Apellido:</label>
                <Field type="text" id="primerApellido" name="primerApellido" className="input-text" />
                <ErrorMessage name="primerApellido" component="p" className="error" />
              </div>
              </div>
    
              <div className="item-group">
              <div className="item-input">
                <label htmlFor="segundoApellido" className="label"> Segundo Apellido:</label>
                <Field type="text" id="segundoApellido" name="segundoApellido" className="input-text"/>
                <ErrorMessage name="segundoApellido" component="p" className="error" />
              </div>
    
              <div className="item-input">
                <label htmlFor="telefono" className="label"> Teléfono :</label>
                <Field type="text" id="telefono" name="telefono" className="input-text" />
                <ErrorMessage name="telefono" component="p" className="error" />
              </div>
              </div>

              <div>
                  <label htmlFor="Especialidad">Especialidad:</label>
                  <EspecilidadSelect onEspecialidadSelect={(especialidadId) => setFieldValue("especialidad", especialidadId)} />
                  <ErrorMessage name="Especialidad" component="p" className="error" />
                </div>
      
              <button type="submit" disabled={isSubmitting} className="submit">
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </Form>
            )
          }}
        </Formik>
    );
}

export default FormMedicos;