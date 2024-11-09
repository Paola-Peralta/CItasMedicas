import React, {useState, useEffect} from 'react';
import { getAllConsultas } from '../api/consulta.api';

const SearchConsulta = () => {
    const [ users, setUsers ] = useState([])
    const [ search, setSearch ] = useState("")

    const showData = async () => {
        const response = await getAllConsultas();
        setUsers(response.data)
    } 

    //función de búsqueda
    const searcher = (e) => {
    setSearch(e.target.value)
    }

    const results = (search ?? '').trim() === '' 
    ? users 
    : users.filter(dato => dato.codigo_cita?.includes(search));

    useEffect( ()=> {
        showData()
      }, [])
    
        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;
        const currentPosts = results.slice(firstPostIndex, lastPostIndex);
      
      //renderizamos la vista
      return (
        <div className='container'>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className='bg-curso text-white'>
                        <th>NAME</th>
                        <th>USER NAME</th>
                    </tr>
                </thead>
                <tbody>
                    { currentPosts.map( (user) => (
                        <tr key={user.id}>
                            <td>{user.codigo}</td>
                        </tr>                    
                    ))}
                </tbody>
            </table>
        </div>
      )
}
export default SearchConsulta;