import React from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { sendCitas } from '../api/cita.api';
import Swal from 'sweetalert2'
import {useNavigate, useParams} from 'react-router-dom'
import MedicoSelect from "./MedicoSelect.jsx";
import '../App.css'

const FormCitas = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    const validationSchema = Yup.object({
        
        // Fecha: Yup.date()
        //     .required('La fecha es requerida')
        //     .typeError('La fecha debe ser válida'),
        Hora_cita: Yup.string()
            .required('La hora de la cita es requerida')
            .typeError('La hora de la cita debe ser válida'),
        motivo: Yup.string()
            .nullable()
            .max(500, 'El motivo no debe exceder 500 caracteres'),
        Paciente: Yup.number()
            .required('El paciente es requerido')
            .typeError('Debe seleccionar un paciente válido'),
        Medico: Yup.number()
            .required('El médico es requerido')
            .typeError('Debe seleccionar un médico válido'),
    });
    
    const handleSubmit = async (values, { resetForm }) => {
        try {
            console.log('Valores del formulario:', values)
            const response = await sendCitas(values);
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                  title: "Excelente!",
                  text: "La cita ha sido registrado!",
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
              text: "No se pudo registrar esta cita!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return(
        <Formik
            initialValues={{ Hora_cita: '', motivo: '', Paciente: `${id}`, Medico: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, isSubmitting, values}) => {
                return (

                <Form className="form">

                    {/* <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="Fecha">Fecha:</label>
                            <Field type="date" id="Fecha" name="Fecha" className="input-date "/>
                            <ErrorMessage name="Fecha" component="p" className="error" />
                        </div>                        
                    </div> */}


                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="Hora_cita">Hora de la Cita:</label>
                            <Field type="datetime-local" id="Hora_cita" name="Hora_cita" className="input-date " />
                            <ErrorMessage name="Hora_cita" component="p" className="error"  />
                        </div>
                    </div>

                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="motivo">Motivo:</label>
                            <Field as="textarea" id="motivo" name="motivo" className="input-area"/>
                            <ErrorMessage name="motivo" component="p" className="error"  />
                        </div>
                    </div>
                    <div className="item-group">
                        <div className="item-input">
                            <label htmlFor="Paciente">Paciente:</label>
                            <Field type="number" id="Paciente" name="Paciente" className="input-text"/>
                            <ErrorMessage name="Paciente" component="p" className="error"  />
                        </div>
                    </div>

                    <div className="item-group">
                        <div className="item-input">
                        <label htmlFor="Medico">Médico:</label>
                        <MedicoSelect onMedicoSelect={(medicoId) => setFieldValue("Medico", medicoId)} />
                        <ErrorMessage name="Medico" component="p" className="error" />
                        </div>
                    </div>
                
                    <button type="submit" disabled={isSubmitting} className="submit">
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </Form>
                );
            }}
      </Formik>
    );
};

export default FormCitas;