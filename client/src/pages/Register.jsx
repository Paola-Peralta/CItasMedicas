import React, { useState } from "react";
import { register } from "../api/usuario";
import { useNavigate } from "react-router-dom";
import "../pages/register.css";
import imagen from "../utils/salud.jpeg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ email, username, password, password2 });
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      alert("Error en el registro: " + error.response?.data?.detail || error.message);
    }
  };

  return (
    <section className="vh-100 register-background">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card register-card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={imagen}
                    alt="register form"
                    className="img-fluid register-img"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleRegister}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-user-plus fa-2x me-3 register-icon" />
                        <span className="h2 fw-bold mb-0">Crea una cuenta</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                        Ingresa tus datos para registrarte
                      </h5>
                      <div className="form-outline mb-3">
                        <input
                          type="email"
                          placeholder="Correo electrónico"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <input
                          type="text"
                          placeholder="Usuario"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          placeholder="Contraseña"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          placeholder="Repetir Contraseña"
                          className="form-control form-control-lg"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                      </div>
                      <div className="pt-1 mb-3">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Registrar
                        </button>
                      </div>
                      <p className="mb-0 text-center" style={{ color: "#393f81" }}>
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" style={{ color: "#393f81" }}>
                          Inicia sesión aquí
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

export default Register;