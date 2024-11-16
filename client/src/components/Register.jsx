
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/usuario';

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== password2) {
//       alert("Las contraseñas no coinciden");
//       return;
//     }

//     try {
//       await api.post("register/", {
//         email,
//         username,
//         password,
//         password2
//       });
//       alert("Registro exitoso");
//       navigate('/login'); // Redirigir al login después de un registro exitoso
//     } catch (error) {
//       console.error("Error de registro", error.response);
//       alert("Error al registrar el usuario");
//     }
//   };

//   return (
//     <div>
//       <h2>Registro</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Nombre de usuario"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirmar contraseña"
//           value={password2}
//           onChange={(e) => setPassword2(e.target.value)}
//           required
//         />
//         <button type="submit">Registrar</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
