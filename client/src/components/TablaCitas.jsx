// import React, { useEffect, useState } from "react";
// import { getAllCitas } from '../api/cita.api';

// const CitaTabla = () => {
//     const [citas, setCitas] = useState([]);

//     useEffect(() => {
//         const fetchCitas = async () => {
//             try {
//                 const response = await getAllCitas();
//                 setCitas(response.data);
//             } catch (error) {
//                 console.error("Error fetching pacientes:", error);
//             }
//         };
//         fetchCitas();
//     }, []);

//     return (

//     )