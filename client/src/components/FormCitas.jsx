import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormCitas = () => {
    const validationSchema = Yup.object({
        codigo_cita: Yup.string()
            .required('El código de cita es requerido')
            .min(3, 'El código debe tener al menos 3 caracteres')
            .max(30, 'El código no debe exceder 30 caracteres'),
        Fecha: Yup.date()
            .required('La fecha es requerida')
            .typeError('La fecha debe ser válida'),
        Hora_cita: Yup.date()
            .required('La hora de la cita es requerida')
            .typeError('La hora de la cita debe ser válida'),
        Dia_cita: Yup.string()
            .required('El día de la cita es requerido')
            .max(20, 'El día de la cita no debe exceder 20 caracteres'),
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

    

    return(
        <Formik
            initialValues={{ codigo_cita: '', Fecha: '', Hora_cita: '', Dia_cita: '', motivo: '', Paciente: '', Medico: ''}}
            validationSchema={validationSchema}
            //on Submit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="codigo_cita">Código de Cita:</label>
                        <Field type="text" id="codigo_cita" name="codigo_cita" />
                        <ErrorMessage name="codigo_cita" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="Fecha">Fecha:</label>
                        <Field type="date" id="Fecha" name="Fecha" />
                        <ErrorMessage name="Fecha" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="Hora_cita">Hora de la Cita:</label>
                        <Field type="datetime-local" id="Hora_cita" name="Hora_cita" />
                        <ErrorMessage name="Hora_cita" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="Dia_cita">Día de la Cita:</label>
                        <Field type="text" id="Dia_cita" name="Dia_cita" />
                        <ErrorMessage name="Dia_cita" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="motivo">Motivo:</label>
                        <Field as="textarea" id="motivo" name="motivo" />
                        <ErrorMessage name="motivo" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="Paciente">Paciente:</label>
                        <Field type="number" id="Paciente" name="Paciente" />
                        <ErrorMessage name="Paciente" component="p" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="Medico">Médico:</label>
                        <Field type="number" id="Medico" name="Medico" />
                        <ErrorMessage name="Medico" component="p" style={{ color: 'red' }} />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </button>
                </Form>
            )}
      </Formik>
    );
};

export default FormCitas;