
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutSteps from '../../Components/CheckoutSteps/CheckoutSteps'
import { createOrder } from '../../orderRedux/orderActions'
import { useNavigate } from 'react-router-dom';
import {  removeFromCart} from '../../cartredux/cartaction';



const PlaceOrder = () => {
    
   
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderCreate = useSelector(state =>state.orderCreate)
    const {order , success , error} = orderCreate
    
    useEffect(()=>{
      if(success){
        navigate(`/order/${order._id}`)
      }
    })
    const cart = useSelector((state)=>state.cart)
    const { cartItems } = cart
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)

    const updateItemStock = async (itemId, newCountInStock) => {
      try {
        const response = await fetch(`http://localhost:5000/product/updateStock/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ countInStock: newCountInStock })
        });
        const data = await response.json();
    
        return data;
      } catch (error) {
        throw error;
      }
    };
      
    const placeOrderHandler=()=>{
        dispatch(createOrder({
          orderItems: cart.cartItems,
          shippingAddress : cart.shippingAddress,
          paymentMethod : cart.paymentMethod,
          itemsPrice : cart.itemsPrice,
          shippingPrice : cart.shippingPrice,
          taxPrice : cart.taxPrice,
          totalPrice : cart.totalPrice
        }
        ))

        cart.cartItems.forEach((item) => {
         
          const newCountInStock = item.countInStock - item.qty;
             updateItemStock(item.product, newCountInStock);
             dispatch(removeFromCart(item.product));
        });


      }
     
  return (
    
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <strong>Your cart is empty</strong>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.imageProduct}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/productDetail/${item.product}`}>
                            {item.productName}
                            
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
            </Row>


    </>
  )
}

export default PlaceOrder