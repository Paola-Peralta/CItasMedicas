import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DiffOutlined, FileDoneOutlined, HeartOutlined, UserSwitchOutlined,HomeOutlined, ReconciliationOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
// import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';


const MenuList = () =>{
    // const { user, logout } = useContext(AuthContext);
    
    return(
        <Menu className='menu-bar' style={{ backgroundColor: "#BFACC8", color: "#000" }}>
            <Menu.Item key="medicos" icon={<UserSwitchOutlined/>}> 
                <Link to="/medicos">Medicos</Link>
            </Menu.Item>
            <Menu.Item key='pacientes' icon={<UsergroupAddOutlined/>}>
                <Link to="/pacientes">Pacientes</Link>
            </Menu.Item>
            <Menu.Item key='citas' icon={<HeartOutlined/>}>
                <Link to="/citas">Citas</Link>
            </Menu.Item>
            <Menu.Item key='consultas' icon={<DiffOutlined/>}>
                <Link to="/consultas">Consultas</Link>
            </Menu.Item>
            <Menu.Item key='examenes' icon={<ReconciliationOutlined/>}>
                <Link to="/examenes">Examenes</Link>
            </Menu.Item>
            <Menu.Item key='resultados' icon={<FileDoneOutlined/>}>
                <Link to="/resultados">Resultados</Link>
            </Menu.Item>
            {/* <Menu.Item key='perfil' icon={<SettingOutlined/>}>
                Perfiles
            </Menu.Item>
            <Menu.Item key='setting' icon={<SettingOutlined/>}>
                Configuraciones
            </Menu.Item> */}
        </Menu>
    );
};

export default MenuList