import { useState, useEffect } from 'react';
import './signup.css'
import {useNavigate} from 'react-router-dom'
import {FloatingLabel,Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
export default function Signup() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    async function signup(e){
        e.preventDefault();
        let obj={
            name:name,
            email:email,
            password:password
        }
        let res=await axios.post('http://localhost:5000',obj)
        if(res.status==201)
        {
            alert(res.data.msg);
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login')
        }
    }
    function signin(){
      navigate('/login')
    }
    return (
        
        <div className="signup">
            <div className='formdiv'>
            <FloatingLabel controlId="floatingtext" label="Name" className="mb-3">
                <Form.Control type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput"  label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button className='btn' onClick={signup}>Sign Up</Button>
            <Button className='btn2' onClick={signin}>Sign In</Button>
            </div>
            
        </div>

    )
}