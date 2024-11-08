import React, {useState, useEffect} from 'react'
import { getAllTasks } from '../api/farmacia.api';
const SearchComponent = () => {
  //setear los hooks useState
  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")

  const showData = async () => {
    const response = await getAllTasks();
    //console.log(data)
    setUsers(response.data)
  }   
   //función de búsqueda
  const searcher = (e) => {
      setSearch(e.target.value)
  }

   const results = (search ?? '').trim() === '' 
  ? users 
  : users.filter(dato => dato.cedula?.includes(search));
  
   useEffect( ()=> {
    showData()
  }, [])
  
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
                { results.map( (user) => (
                    <tr key={user.id}>
                        <td>{user.primerApellido}</td>
                        <td>{user.cedula}</td>
                    </tr>                    
                ))}
            </tbody>
        </table>
    </div>
  )
}
export default SearchComponent