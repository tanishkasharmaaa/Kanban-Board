import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"

function Register(){
    let[form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })
    let navigate=useNavigate()


     function handleForm(e){
e.preventDefault();
let{name,value}=e.target;
setForm((prev)=>({...prev,[name]:value}));

    }


   async function handleFormSubmit(e){
        e.preventDefault()
        try {
            if(form.email===''||form.name===''||form.password===''){
alert('Some fields are empty')
            }
            else{
let res=await fetch('https://kanban-board-1-5b37.onrender.com/user/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:form.name,
                email:form.email,
                password:form.password
            })
          })  
         
     if(res.ok){
        alert('User registered successfully');
navigate('/login')
     }
                
            }
          
        } catch (error) {
            console.log(error)
        }

    }
   
    return(
        <>
        <h1>Register</h1>
        <form action="" onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="name" value={form.name} onChange={handleForm} /><br />
            <input type="email" name="email" placeholder="email" value={form.email} onChange={handleForm} /><br />
            <input type="password" name="password" placeholder="password" value={form.password} onChange={handleForm} /><br />
            <input type="submit" /><br />
            <Link to={'/login'}>Already registered ? Go to login</Link>
        </form>
        </>
    )
}

export {Register}

/* */