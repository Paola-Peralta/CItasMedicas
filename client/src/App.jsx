import { useState } from "react"
import { Button, Layout } from 'antd';
import MenuList from './components/MenuList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'; // Cambia MenufoldOutlined a MenuFoldOutlined
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from './pages/Inicio.jsx';
import AgregarMedicos from './pages/AgregarMedicos.jsx'
import ListaPacientes from './pages/ListPacientes.jsx';
import Citas from './pages/Citas.jsx';
import AgregarCitas from './pages/AgregarCitas.jsx'
import AgregarPacientes from './pages/AgregarPacientes.jsx'
import Consultas from './pages/Consultas.jsx';
import AgregarConsultas from './pages/AgregarConsultas.jsx';
import Examenes from './pages/Examenes.jsx';
import AgregarExamenes from './pages/AgregarExamenes.jsx';
import Resultados from './pages/Resultados.jsx';
import AgregarResultado from './pages/AgregarResultados.jsx';
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
//                                  <Route path="/agregar-medicos" element={<AgregarMedicos />} />
                                    <Route path="/agregar-pacientes" element={<AgregarPacientes />} />
                                    <Route path="/pacientes" element={<ListaPacientes />} />
                                    <Route path="/citas" element={<Citas />} />
                                    <Route path="/agregar-citas" element={<AgregarCitas />} />
                                    <Route path="/consultas" element={<Consultas />} />
                                    <Route path="/agregar-consulta" element={<AgregarConsultas />} />
                                    <Route path="/examenes" element={<Examenes />} />
                                    <Route path="/agregar-examen" element={<AgregarExamenes />} />
                                    <Route path="/resultados" element={<Resultados />} />
                                    <Route path="/agregar-resultado" element={<AgregarResultado />} />
                                    <Route path="/paciente/:id" element={<AgregarCitas />} />
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