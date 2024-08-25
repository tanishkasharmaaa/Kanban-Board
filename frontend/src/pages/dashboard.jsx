import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { AllTodos } from "./AllTodos"

function Dashboard(){
    let navigate=useNavigate()
    let token=localStorage.getItem('accessToken');
    let user=localStorage.getItem('user');
    if(!token&&!user){
        navigate('/register')
    }
    return(
        <>
        <Navbar/>
        <AllTodos/>
      
        </>
    )
}
export {Dashboard}