
// const { Header, Sider, Content } = Layout;

// function App() {
//   const [collapsed, setCollapsed] = useState (false)

//   return (
//       <Router>
//         <Layout>
//           <Sider className='sidebar' collapsed={collapsed} collapsible>
//             <MenuList />
//           </Sider>
//           <Layout>

//             <Header className="head">
//               <Button 
//                 type='text'
//                 className='toggle'
//                 onClick={() => setCollapsed(!collapsed)}
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               />
//             </Header>

//             <Layout.Content className="content">
//               <Routes>
//                 <Route path="/medicos" element={<Inicio />} />
//                 <Route path="/agregar-medicos" element={<AgregarMedicos />} />
//                 <Route path="/agregar-pacientes" element={<AgregarPacientes />} />
//                 <Route path="/pacientes" element={<ListaPacientes />} />
//                 <Route path="/citas" element={<Citas />} />
//                 <Route path="/agregar-citas" element={<AgregarCitas />} />
//                 <Route path="/consultas" element={<Consultas />} />
//                 <Route path="/agregar-consulta" element={<AgregarConsultas />} />
//                 <Route path="/examenes" element={<Examenes />} />
//                 <Route path="/agregar-examen" element={<AgregarExamenes />} />
//                 <Route path="/resultados" element={<Resultados />} />
//                 <Route path="/agregar-resultado" element={<AgregarResultado />} />
//                 <Route path="/paciente/:id" element={<AgregarCitas />} />
//               </Routes>
//             </Layout.Content>
//           </Layout>
//         </Layout>
//       </Router>
    
//   )
// }

// export default App



import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/PrivateRoute";
import MenuList from "./components/MenuList";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import AgregarMedicos from "./pages/AgregarMedicos";
import ListaPacientes from "./pages/ListPacientes";
import Citas from "./pages/Citas";
import AgregarCitas from "./pages/AgregarCitas";
import Consultas from "./pages/Consultas";
import AgregarConsultas from "./pages/AgregarConsultas";
import Examenes from "./pages/Examenes";
import AgregarExamenes from "./pages/AgregarExamenes";
import Resultados from "./pages/Resultados";
import AgregarResultados from "./pages/AgregarResultados";

import "./index.css";

const { Header, Sider, Content } = Layout;

function AppLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider className="sidebar" collapsed={collapsed} collapsible>
                <MenuList />
            </Sider>
            <Layout>
                <Header className="head">
                    <Button
                        type="text"
                        className="toggle"
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    />
                </Header>
                <Content className="content">{children}</Content>
            </Layout>
        </Layout>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <Routes>
                                        <Route path="/medicos" element={<Inicio />} />
                                        <Route path="/agregar-medicos" element={<AgregarMedicos />} />
                                        <Route path="/pacientes" element={<ListaPacientes />} />
                                        <Route path="/citas" element={<Citas />} />
                                        <Route path="/agregar-citas" element={<AgregarCitas />} />
                                        <Route path="/consultas" element={<Consultas />} />
                                        <Route path="/agregar-consultas" element={<AgregarConsultas />} />
                                        <Route path="/examenes" element={<Examenes />} />
                                        <Route path="/agregar-examenes" element={<AgregarExamenes />} />
                                        <Route path="/resultados" element={<Resultados />} />
                                        <Route path="/agregar-resultados" element={<AgregarResultados />} />
                                    </Routes>
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
