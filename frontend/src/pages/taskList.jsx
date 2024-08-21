import { useEffect, useState } from "react"

function TaskList(){
    let[tasks,setTasks]=useState([]);
    let [display,setDisplay]=useState(false);
    let [currentTask,setCurrentTask]=useState(null);
    let [form,setForm]=useState({
        title:"",
        category:"",
        description:"",
        status:"",
        taskDeadline:""
    })
let token=localStorage.getItem('accessToken')
   async function getTasks(){
try {
    let res=await fetch('https://kanban-board-1-5b37.onrender.com/task/allTasks',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    });
let data=await res.json();
setTasks(data)
} catch (error) {
    console.log(error);
  
}
    }

async function deleteTask(ele,id){
try {
    let res=await fetch(`https://kanban-board-1-5b37.onrender.com/task/deleteTask/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    let data=await res.json();
    if(res.ok){
        getTasks()
        alert('Task deleted successfully');
        
    }
} catch (error) {
    console.log(error)
}
}
function handleChange(e){
    setForm((prev)=>({...prev,[e.target.name]:e.target.value}))
}
function handleUpdateTask(ele){
setDisplay(true)
  setCurrentTask(ele)
  setForm({
    title:ele.title,
    category:ele.category,
    description:ele.description,
    status:ele.status,
    taskDeadline:new Date(ele.taskDeadline).toISOString().split("T")[0]

  })
}

async function handleUpdateSubmit(e){
e.preventDefault();
if(currentTask){
    try {
        let res=await fetch(`https://kanban-board-1-5b37.onrender.com/task/updateTask/${currentTask._id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(form)
        })
        let data=await res.json();
        if(res.ok){
            getTasks()
            setDisplay(false)
            alert('Task updated successfully')
        }
    } catch (error) {
        console.log(error)
    }
}
}
    useEffect(()=>{
getTasks()
    },[])
return(
    <>
    <h1>Task list</h1>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)',columnGap:'10px', rowGap:'10px'}}>
        {tasks.map((ele)=>(
            <div key={ele._id} style={{border:'solid 1px pink', padding:'10px'}}>
               
             <h3> {ele.title}</h3>
              <div style={{ 
    backgroundColor: ele.status === 'pending' ? 'orange' : 
                    ele.status === 'progress' ? 'yellow' : 
                    ele.status === 'complete' ? 'green' : 'transparent' 
,color:'black'}}>{ele.status}</div>
             <button>{ele.category}</button>
<p><span style={{color:'green'}}>Description : </span>{ele.description}</p>
<p><span style={{color:'green'}}>Deadline : </span>{new Intl.DateTimeFormat('en-GB').format(new Date(ele.taskDeadline))}</p>

<button onClick={()=>handleUpdateTask(ele)}>update</button>
{display&&currentTask._id===ele._id?(
    <form action="" onSubmit={handleUpdateSubmit}>
         <input type="text" place='true' placeholder="title" name="title" value={form.title}  onChange={handleChange} required/><br />
            <input type="text" place='true' placeholder="category"  name="category" value={form.category} onChange={handleChange}  required/><br />
            <textarea type="text" place='true' placeholder="description"  name="description" value={form.description} onChange={handleChange} required/><br />
            <select name="status" id="" place='true' aria-placeholder="Select status" value={form.status} onChange={handleChange} required>
            <option value="">Select Status</option>
                <option value="progress">Progress</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
            </select><br />
        
            <input type='date' place="true" placeholder="DD/MM/YYYY" name="taskDeadline" value={form.taskDeadline} onChange={handleChange} required/><br />
            <input type="submit" /><br />
    </form>
):(<></>)}
<button onClick={()=>deleteTask(ele,ele._id)}>delete</button>
            </div>
        ))}
    </div>
    </>
)
}
export{TaskList}