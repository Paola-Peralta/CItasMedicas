import { useEffect, useState } from "react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllTasks } from './api/farmacia.api'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([]);
    useEffect(() => {
        // Fetch tasks from API
        async function loadTasks(){
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, [])

  return (
    <div className="grid grid-cols-3 gap-3">
        {tasks.map(task =>(
            <div key={task.id}>{task.fecha_nacimiento}</div>
        ))}
    </div>
  )
}

export default App
