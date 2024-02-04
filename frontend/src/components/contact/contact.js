import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Cart3, BoxArrowRight } from 'react-bootstrap-icons';
import axios from 'axios'
import './contact.css'
const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            email: email,
            message: message
        }
        console.log('Form submitted:', formData);
        let res = await axios.post('http://localhost:5000/contact', formData)
        console.log(res)
        if (res.status == 200) {
            alert(res.data.message)
            setName('')
            setEmail('')
            setMessage('')

        }
    };

    return (
        <div className='cbody'>
            <div className='backlink'>
                <Link to='/home' className='back' >Home</Link>
                <Link to='/about' className='back' >About</Link>
                <Link to='/login' className='back'>Logout</Link>

            </div>
            <form className="contactform">
                <label className='labelclass' htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className='forinput'
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label className='labelclass' htmlFor="email">Email address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className='forinput'
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className='labelclass' htmlFor='message'>Message</label>
                <textarea value={message} id='message' className='forinput' onChange={(e) => setMessage(e.target.value)} />

                <button type="submit" className='forb' onClick={handleSubmit}>Send Query</button>
            </form>

        </div>
    );
};

export default ContactUs;