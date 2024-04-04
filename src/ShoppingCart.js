import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ShoppingCart.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from './actions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';



const ShoppingCart = () => {
    const cart = useSelector(state => state.cart);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.amount), 0);
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };


    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                const response = await fetch('https://boppotech-admin.github.io/react-task-json.github.io/reactjob.json');
                const data = await response.json();
                console.log('Data from API:', data); // Log the data received from the API
                const products = data;

                // Check if products is defined
                if (!products) {
                    throw new Error('Products data is undefined');
                }

                // Extract categories of items in the cart
                const categories = cart.map(item => item.tags[0]);
                console.log('Categories:', categories);

                // Filter products based on categories
                const recommendedProducts = products.filter(product => product.tags.some(tag => categories.includes(tag)));
                console.log('Recommended Products:', recommendedProducts);

                setRecommendedProducts(recommendedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommended products:', error);
            }
        };


        if (cart.length > 0) {
            fetchRecommendedProducts();
        } else {
            setLoading(false); // Set loading to false if cart is empty
            setRecommendedProducts([]); // Clear recommended products if cart is empty
        }
    }, [cart]);


    const handleIncrement = () => {
        const res = count + 1;
        setCount(res);
    };

    const handleDecrement = () => {
        const res = count - 1;

        if (count > 0) {
            setCount(0);
        } else {
            return;
        }
        setCount(res);

    };


    return (
        < >
            <div className=' mt-5 bg-lightbrown'>
                <div className='py-5 px-4' >
                    <h2>Shopping Cart</h2>
                    <ol className="list-group ">
                        {cart.map(item => (
                            <li className="list-group-item d-flex justify-content-between align-items-end border-0 bg-lightbrown" key={item.id}>
                                <div className="ms-2 me-auto d-flex align-item-center ">
                                    {/* <div> */}
                                    <div className="mx-2 d-flex align-item-center">
                                        <img width="100" height="auto" src={item.images.nodes[0].src} alt={item.title} />
                                    </div>
                                    {/* </div> */}
                                    <div>
                                        <div className="fw-bold">{item.title}</div>
                                        <p style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            lineHeight: '20px',
                                            maxHeight: '100px',
                                            maxWidth: '400px',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }} >{item.description}</p>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-sm btn-primary me-2  bg-lightbrown text-dark border fw-bold border-dark" onClick={() => handleDecrement()}>-</button>
                                            <span className='fw-bold' >{count}</span>
                                            <button className="btn btn-sm btn-primary ms-2 bg-lightbrown text-dark border fw-bold border-dark" onClick={() => handleIncrement()}>+</button>
                                        </div>
                                    </div>

                                </div>
                                <span className="">{`$${item.price.amount}`}</span>
                            </li>
                        ))}
                    </ol>
                    <hr />
                    <div className="mt-2 d-flex justify-content-between">
                        <div className='fw-bold' >Subtotal </div>
                        <div>${totalPrice.toFixed(2)}</div>
                    </div>

                    <div className='text-end my-3 rounded-0'>
                    <Button className="own-btn-1 fw-bold rounded-0 px-4">Check Out</Button>
                    </div>

                    <div className="mt-3">
                        <h4>Recommended Products</h4>
                        {/* <ol  className="list-group d-flex "> */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ol className=" d-flex justify-content-evenly flex-wrap" style={{ listStyle: 'none' }} >
                                {recommendedProducts.map(product => (
                                    <li className=''   >
                                        <Card style={{ width: '18rem' }} className='bg-none border-0 m-4' >
                                            <Card.Img height='auto' width='100' variant="top" src={product.images.nodes[0].src} />
                                            <Card.Title className='my-2' style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                lineHeight: '20px',
                                                maxHeight: '100px',
                                                maxWidth: '400px',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical'
                                            }}  >{product.title}</Card.Title>
                                            <Card.Text >$ {product.price.amount}</Card.Text>

                                            <OverlayTrigger
                                                key={product.id}
                                                placement="top"
                                                overlay={
                                                    <Tooltip id={`tooltip-${product.id}`} style={{ width: '300px', overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 12,
                                                    WebkitBoxOrient: 'vertical' }} >
                                                        {product.description}
                                                    </Tooltip>
                                                }
                                            >
                                            <Button className='own-btn' onClick={() => handleAddToCart(product)} >Add to Cart</Button>
                                            </OverlayTrigger>

                                        </Card>

                                        {/* 
                                            <div>{product.title}</div>
                                            <div>{product.description}</div>
                                            <div>{`$${product.price.amount}`}</div> */}
                                        {/* Add more product details as needed */}
                                    </li>
                                ))}
                            </ol>
                        )}
                        {/* </ol> */}
                    </div>

                </div>
            </div >
        </>

    );
};

export default ShoppingCart;
