import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from './actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://boppotech-admin.github.io/react-task-json.github.io/reactjob.json')
            .then(response => {
                setProducts(response.data);
            })

            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    console.log(products)
    return (
        <div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container  >
                    <div className='d-flex justify-content-between w-100' >
                        <div>
                            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        </div>
                        <div>
                            <Nav className="me-auto">
                                <Nav.Link >Card</Nav.Link>
                            </Nav>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <h1 className='my-2' >Products</h1>
            <div className="product-list d-flex justify-content-evenly flex-wrap">
                {products.map(product => (
                    <Card key={product.id} style={{ width: '18rem' }} className='shadow my-2'>
                        <div className='m-4'>
                            <Card.Img variant="top" src={product.images.nodes[0].src} alt={product.images.nodes[0].altText} />
                            <Card.Title className='my-2'>{product.title}</Card.Title>
                            <Card.Text style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                lineHeight: '20px',
                                maxHeight: '100px',
                                padding: '4px 10px',
                                maxWidth: '400px',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}>{product.description}</Card.Text>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='text-primary fw-bold'>${product.price.amount}</div>
                                <Button className='rounded-0 fw-bold' variant="primary" onClick={() => handleAddToCart(product)}>ADD TO CART</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* <div className="product-list d-flex justify-content-evenly flex-wrap">
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p style={{
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  lineHeight: '20px',
  maxHeight: '100px',
  padding: '4px 10px',
  maxWidth: '400px',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
}} >{product.description}</p>
            <p>${product.price.amount}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div> */}
        </div>
    );
};

export default ProductPage;
