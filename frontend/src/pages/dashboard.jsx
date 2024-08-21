import { useNavigate } from "react-router-dom"

function Dashboard(){
    let navigate=useNavigate()
    return(
        <>
        <h1>Dashboard</h1>
        <button onClick={()=>navigate('/addTasks')}>Add Tasks</button>
        <button onClick={()=>navigate('/taskList')}>List of tasks Folder</button>
        </>
    )
}
export {Dashboard}