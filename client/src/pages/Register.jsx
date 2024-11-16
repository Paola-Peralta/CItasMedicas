import React, { useState } from 'react';
import { register } from '../api/usuario';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ email, username, password, password2 });
            alert('Usuario registrado con éxito');
            navigate('/login');
        } catch (error) {
            alert('Error en el registro: ' + error.response.data.detail);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Registro</h2>
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Repetir Contraseña" value={password2} onChange={(e) => setPassword2(e.target.value)} />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;