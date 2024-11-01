import { useEffect, useState } from "react"
import { Collapse, Layout } from 'antd';
import { Button, theme } from 'antd';
import MenuList from './components/MenuList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'; // Cambia MenufoldOutlined a MenuFoldOutlined
import { getAllTasks } from './api/farmacia.api'

import Inicio from './pages/Inicio.jsx';
import ListaPacientes from './pages/ListPacientes.jsx';
import Citas from './pages/Citas.jsx';
import Examenes from './pages/Examenes.jsx';
import Resultados from './pages/Resultados.jsx';

const { Header, Sider } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState (false)
  // const [count, setCount] = useState(0)
  // const [tasks, setTasks] = useState([]);
  //   useEffect(() => {
  //       // Fetch tasks from API
  //       async function loadTasks(){
  //           const res = await getAllTasks();
  //           setTasks(res.data);
  //       }
  //       loadTasks();
  //   }, [])

  return (
    
    // <div className="grid grid-cols-3 gap-3">
    //     {tasks.map(task =>(
    //         <div key={task.id}>{task.fecha_nacimiento}</div>
    //     ))}
    // </div>
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
                <Route path="/pacientes" element={<ListaPacientes />} />
                <Route path="/citas" element={<Citas />} />
                <Route path="/examenes" element={<Examenes />} />
                <Route path="/resultados" element={<Resultados />} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Router>
    
  )
}

export default App
