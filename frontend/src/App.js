import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/login/login';
import Home from './components/home/home';
import ContactUs from './components/contact/contact';
import About from './components/about/about';
import Signup from './components/signup/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const PrivateRoute = (props) => {
    return token ? (
      props.val
    ) : (
      <Navigate to="/" />
    );
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path="/home" element={<PrivateRoute val={<Home />} />}/>
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
