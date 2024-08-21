import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'

function AddTasks(){
    let[form,setForm]=useState({
        title:"",
        category:"",
        description:"",
        status:"",
        taskDeadline:""
    })
let token=localStorage.getItem('accessToken')
let navigate=useNavigate()

    function handleForm(e){
        let{name,value}=e.target;
setForm((prev)=>({...prev,[name]:value}))
    }


   async function handleFormSubmit(e){
e.preventDefault();
try {
    let res=await fetch('https://kanban-board-1-5b37.onrender.com/task/addTask',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            title:form.title,
            category:form.category.toLowerCase(),
            description:form.description,
            status:form.status,
            taskDeadline:form.taskDeadline
        })
    })
    let data=await res.json();
   
    if(res.ok){
        alert('Task added successfully')
    }
} catch (error) {
    console.log(error)
    alert(error)
}

    }
return(
    <>
    <h1>Add tasks</h1>
    <form action="" onSubmit={handleFormSubmit}>
    <input type="text" place='true' placeholder="title" name="title" value={form.title} onChange={handleForm} required/><br />
            <input type="text" place='true' placeholder="category"  name="category" value={form.category} onChange={handleForm} required/><br />
            <textarea type="text" place='true' placeholder="description"  name="description"  value={form.description} onChange={handleForm} required/><br />
            <select name="status" id="" place='true' aria-placeholder="Select status" value={form.status} onChange={handleForm} required>
            <option value="">Select Status</option>
                <option value="progress">Progress</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
            </select><br />
        
            <input type='date' place="true" placeholder="DD/MM/YYYY" name="taskDeadline" value={form.taskDeadline} onChange={handleForm} required/><br />
            <input type="submit" /><br />
            <Link to={'/taskList'}>See the tasks</Link>
    </form>
    </>
)
}
export {AddTasks}