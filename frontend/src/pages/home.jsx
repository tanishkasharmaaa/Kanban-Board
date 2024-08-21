import { useNavigate } from "react-router-dom"

function Home(){
    let navigate=useNavigate()

    return(
        <>
        <button onClick={()=>navigate('/register')}>Start Kanban Board </button>
        </>
    )
}
export {Home}