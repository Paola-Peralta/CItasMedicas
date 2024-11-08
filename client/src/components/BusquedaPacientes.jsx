import React, {useState, useEffect} from 'react'
import { getAllTasks } from '../api/farmacia.api';
import Pagination from "./Pagination.jsx";
const SearchComponent = () => {
  //setear los hooks useState
  const [ users, setUsers ] = useState([])
  const [ search, setSearch ] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);


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
                        <td>{user.primerApellido}</td>
                        <td>{user.cedula}</td>
                    </tr>                    
                ))}
            </tbody>
        </table>
        <Pagination
                totalPosts={results.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
    </div>
  )
}
export default SearchComponent