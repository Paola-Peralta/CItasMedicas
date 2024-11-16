import React, { useState, useContext } from 'react';
import { login } from '../api/usuario';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password });
            loginUser(data);
            navigate('/medicos'); // Redirige al menú después de iniciar sesión
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.response.data.detail);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Ingresar</button>
        </form>
    );
};

export default Login;