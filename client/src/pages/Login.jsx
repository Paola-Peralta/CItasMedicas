import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/usuario";
import { AuthContext } from "../context/AuthContext";
import "../pages/login.css";
import imagen from '../utils/salud.jpeg';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      loginUser(data);
      navigate("/medicos"); // Redirige al menú después de iniciar sesión
    } catch (error) {
      alert("Error al iniciar sesión: " + error.response?.data?.detail || error.message);
    }
  };

  return (
    <section className="vh-100 login-background">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card login-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imagen}
                    alt="login form"
                    className="img-fluid login-img"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3 login-icon" />
                        <span className="h2 fw-bold mb-0">Bienvenido 👋</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                        Iniciar sesión con tú cuenta
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Correo electrónico"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Contraseña"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Iniciar sesión
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        No tienes cuenta?{" "}
                        <a href="/register" style={{ color: "#393f81" }}>
                          Registrate aquí
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
