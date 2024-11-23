import React, { createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Nuevo estado de carga

        useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));  // Cargar datos del usuario
            }
            setLoading(false); // Dejar de cargar después de intentar obtener el usuario
        }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar en localStorage
  };

  // Manejar cierre de sesión
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Eliminar del localStorage
  };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};