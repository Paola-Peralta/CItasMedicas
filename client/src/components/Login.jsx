//PRUEBA U


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/usuario';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await api.post("token/", {
//         email,
//         password
//       });
//       localStorage.setItem('token', response.data.access); // Guardar el token en el almacenamiento local
//       navigate('/medicos'); // Redirigir al usuario a una página protegida
//     } catch (error) {
//       console.error("Error de login", error.response);
//       alert("Error al iniciar sesión");
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Correo electrónico"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Iniciar sesión</button>
//       </form>
//     </div>
//   );
// };

// export default Login;