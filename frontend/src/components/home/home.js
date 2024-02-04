import './home.css';
import React,{ useState, useEffect } from 'react';
import { Container, Nav, Navbar, Spinner, Card, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Cart3, BoxArrowRight } from 'react-bootstrap-icons';
import CartOverlay from '../cart/cart';
import axios from 'axios';
import { IoLogOutOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
const Total=React.createContext()

const Home = () => {
    const [showCart, setShowCart] = useState(false);
    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [name, setName] = useState(localStorage.getItem('name'));
    const navigate = useNavigate();
    const increaseQuantity=async()=>{

    }
    const onDecreaseQuantity=async(a)=>{
        const token=localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/deleteproduct/${a}`,{ headers: { Authorization: token } });
        fetchData();
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const handleCartClick = () => {
        setShowCart(true);
    };

    const handleCloseCart = () => {
        setShowCart(false);
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/products", { headers: { Authorization: token } });
            const cartData = res.data.result;
            updateAmounts(cartData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const updateAmounts = (cartData) => {
        let count1 = 0;
        let count2 = 0;

        cartData.forEach((i) => {
            if (i.productid === '1') count1++;
            else if (i.productid === '2') count2++;
        });

        setAmount1(count1);
        setAmount2(count2);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postdata = async (a) => {
        var obj = {
            productid: a
        };

        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:5000/addproduct", obj, { headers: { Authorization: token } });
            fetchData();
        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    return (
        <div className='homediv'>
            <Total.Provider value={[amount1,amount2]}>
            <div className='navbody'>
                <Navbar bg="dark" data-bs-theme="dark">
                <Spinner animation="grow" size="sm" variant="light" />
                        <Spinner animation="grow" variant="light" />
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/home" className='curr'>Home</Nav.Link>
                            <Nav.Link href="/about">About Us</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                            <span id='spanid'>Signed in as : {name}</span>
                            <Nav.Link className='cbtn' onClick={handleCartClick}>
                            <FaCartShopping size={30}/>
                            </Nav.Link>
                            <Nav.Link className='logoutbtn' onClick={handleLogout}>
                                <IoLogOutOutline /> Logout
                            </Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
                <CartOverlay show={showCart} onClose={handleCloseCart} onDecreaseQuantity={onDecreaseQuantity} increaseQuantity={postdata}/>
                <div className='cardclass'>
                <Card className='card1' style={{ width: '15rem', height:'20rem' }}>
                    <Card.Img variant="top" src="air1.jpg" />
                    <Card.Body>
                        <Card.Title>Price:$199</Card.Title>
                        <Card.Text>
                            Nike Air Jordan 1
                        </Card.Text>
                        <Button className='cartbtn' onClick={() => postdata(1)}>Add to Cart</Button>
                    </Card.Body>
                </Card>
                <Card className='card2' style={{ width: '15rem' , height:'20rem' }}>
                    <Card.Img variant="top" src="air11.jpg" />
                    <Card.Body>
                        <Card.Title>Price:$399</Card.Title>
                        <Card.Text>
                            Nike Air Jordan 11
                        </Card.Text>
                        <Button className='cartbtn' onClick={() => postdata(2)} >Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123-456-7890</p>
                    </div>
                    <div className="footer-section">
                        <h3>Address</h3>
                        <p>123 Main Street</p>
                        <p>City, Country</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <p>Facebook | Twitter | Instagram</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
            </Total.Provider>
        </div>
    );
};

export default Home;
export {Total};
