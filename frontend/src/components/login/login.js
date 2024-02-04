import { useState, useEffect } from 'react';
import '../signup/signup.css'
import {useNavigate} from 'react-router-dom'
import {FloatingLabel,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
export default function Login() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    async function signin(e){
        e.preventDefault();
        let obj={
            email:email,
            password:password
        }
        let res=await axios.post('http://localhost:5000/login',obj)
        if(res.status==200)
        {
           localStorage.setItem('token',res.data.token)
           localStorage.setItem('name',res.data.name)
            setEmail('');
            setPassword('');
            navigate('/home')
        }
    }
    function signup(){
     navigate('/');
    }
    return (
        
        <div className="signup">
            <div className='formdiv'>
            <FloatingLabel controlId="floatingInput"  label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button className='btn2' onClick={signup}>Sign Up</Button>
            <Button className='btn' onClick={signin}>Sign In</Button>
            </div>
            
        </div>

    )
}