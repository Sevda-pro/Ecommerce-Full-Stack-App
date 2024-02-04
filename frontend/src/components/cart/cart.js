import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Total} from '../home/home'
import './cart.css'
export default function CartOverlay({ show, onClose, onDecreaseQuantity,increaseQuantity }) {
  const [amount1,amount2]=React.useContext(Total);
  return (
    <div className='cartdiv'>

<Modal show={show} onHide={onClose} style={{ width: '100%' , height: '500%' }}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Total items:{amount1 + amount2}</h3>
        <h4>Total Price:${amount1 * 199 + amount2 * 399}</h4>
        {amount1 > 0 && <span>Nike Shoes1: {amount1}<Button className='cartprocessbtn' onClick={() => onDecreaseQuantity(1)}>
          -
        </Button><Button className='cartprocessbtnadd' onClick={() => increaseQuantity(1)}>
          +
        </Button></span>}<br />
        {amount2 > 0 && <span>Nike Shoes2: {amount2}<Button className='cartprocessbtn' onClick={() => onDecreaseQuantity(2)}>
          -
        </Button><Button className='cartprocessbtnadd' onClick={() => increaseQuantity(2)}>
          +
        </Button></span>}<br />
      </Modal.Body>
      <Modal.Footer>
        <Button className='cartprocessbtnclose' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
    
  );
}

