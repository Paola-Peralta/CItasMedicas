import React from "react";
import { useEffect, useState } from "react"
import { getAllTasks, sendPaciente } from '../api/farmacia.api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2'
import '../App.css'

const FormPacientes = () => {
    // Definir el esquema de validación con Yup
    const validationSchema = Yup.object({
    // codigo: Yup.string()
    // .required('El codigo es requerido')
    // .min(3, 'El codigo debe tener al menos 3 caracteres'),
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
        <Form className="form">

          <div className="item-group">
          {/* <div className="item-input">
            <label htmlFor="codigo" className="label"> Código: </label>
            <Field type="text" id="codigo" name="codigo" className="input-text" />
            <ErrorMessage name="codigo" component="p" className="error" />
          </div> */}

          <div className="item-input">
            <label htmlFor="cedula" className="label" >Cédula:</label>
            <Field type="text" id="cedula" name="cedula" className="input-text"/>
            <ErrorMessage name="cedula" component="p" className="error" />
          </div>
          </div>

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
            <label htmlFor="fecha_nacimiento" className="label"> Fecha de Nacimiento :</label>
            <Field type="date" id="fecha_nacimiento" name="fecha_nacimiento" className="input-date "/>
            <ErrorMessage name="fecha_nacimiento" component="p" className="error" />
          </div>
          </div>

          <div className="item-group">
          <div className="item-input">
            <label htmlFor="direccion" className="label"> Dirección :</label>
            <Field type="text" id="direccion" name="direccion" className="input-text" />
            <ErrorMessage name="direccion" component="p" className="error" />
          </div>

          <div className="item-input">
            <label htmlFor="telefono" className="label"> Teléfono :</label>
            <Field type="text" id="telefono" name="telefono" className="input-text" />
            <ErrorMessage name="telefono" component="p" className="error" />
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

export default FormPacientes;