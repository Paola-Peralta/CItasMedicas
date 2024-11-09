import { useEffect, useState } from "react"
import { Collapse, Layout } from 'antd';
import { Button, theme } from 'antd';
import MenuList from './components/MenuList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'; // Cambia MenufoldOutlined a MenuFoldOutlined
import Inicio from './pages/Inicio.jsx';
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
import BusquedaPacientes from './components/BusquedaPacientes.jsx';

const { Header, Sider } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState (false)
  return (
      <Router>
        <Layout>
          <Sider className='sidebar' collapsed={collapsed} collapsible>
            <MenuList />
          </Sider>
          <Layout>
            <Header className="head">
              <Button 
                type='text'
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
            
            <Layout.Content className="content">
              <Routes>
                <Route path="/inicio" element={<Inicio />} />
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
                <Route path="/busqueda" element={<BusquedaPacientes />} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Router>
    
  )
}

export default App
