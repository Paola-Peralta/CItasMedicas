import React from "react";
import { useEffect, useState } from "react"
import { getAllTasks, sendPaciente } from '../api/farmacia.api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2'

const FormPacientes = () => {
    // Definir el esquema de validación con Yup
    const validationSchema = Yup.object({
    codigo: Yup.string()
    .required('El codigo es requerido')
    .min(3, 'El codigo debe tener al menos 3 caracteres'),
    cedula: Yup.string()
    .required('La cédula es requerido')
    .min(15, 'La cédula debe tener al menos 15 caracteres'),
    nombres: Yup.string()
    .required('El nombre es requerido')
    .min(5, 'El nombre debe tener al menos 5 caracteres'),
    primerApellido: Yup.string()
    .required('El apellido es requerida')
    .min(5, 'El apellido debe tener al menos 5 caracteres'),
    segundoApellido: Yup.string()
    .required('El apellido es requerida')
    .min(5, 'El apellido debe tener al menos 5 caracteres'),
    fecha_nacimiento: Yup.date()
    .required('La fecha de nacimiento es requerida'),
    direccion: Yup.string()
    .required('La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
    telefono: Yup.string()
    .required('El télefono es requerida')
    .min(8, 'El teléfono debe tener al menos 5 caracteres'),
    });
      
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await sendPaciente(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "El paciente ha sido registrado!",
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
              text: "No se pudo registrar a este paciente!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };
        
    return(

    <Formik
      initialValues={{ nombres: '', primerApellido: '', segundoApellido: '', fecha_nacimiento:'', direccion:'',telefono:''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >

      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="codigo">Código:</label>
            <Field type="text" id="codigo" name="codigo" />
            <ErrorMessage name="codigo" component="p" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="cedula">Cédula:</label>
            <Field type="text" id="cedula" name="cedula" />
            <ErrorMessage name="cedula" component="p" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="nombre">Nombres:</label>
            <Field type="text" id="nombre" name="nombres" />
            <ErrorMessage name="nombre" component="p" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="primerApellido">Primer Apellido:</label>
            <Field type="text" id="primerApellido" name="primerApellido" />
            <ErrorMessage name="primerApellido" component="p" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="segundoApellido"> Segundo Apellido:</label>
            <Field type="text" id="segundoApellido" name="segundoApellido" />
            <ErrorMessage name="segundoApellido" component="p" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="fecha_nacimiento"> Fecha de Nacimiento :</label>
            <Field type="date" id="fecha_nacimiento" name="fecha_nacimiento" />
            <ErrorMessage name="fecha_nacimiento" component="p" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="direccion"> Dirección :</label>
            <Field type="text" id="direccion" name="direccion" />
            <ErrorMessage name="direccion" component="p" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="telefono"> Teléfono :</label>
            <Field type="text" id="telefono" name="telefono" />
            <ErrorMessage name="telefono" component="p" style={{ color: 'red' }} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </Form>
      )}
    </Formik>

    );
};

export default FormPacientes;