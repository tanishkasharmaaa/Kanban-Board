import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Home } from './pages/home'
import {Register} from './pages/register'
import {Login} from './pages/login'
import {Dashboard} from './pages/dashboard'
import {AddTasks} from './pages/addTask'
import { TaskList } from './pages/taskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/addTasks' element={<AddTasks/>}/>
<Route path='/taskList' element={<TaskList/>}/>
</Routes>
    </>
  )
}

export default App
