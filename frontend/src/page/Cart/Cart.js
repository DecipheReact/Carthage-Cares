import { useEffect, useState } from 'react';
import "../ProductDetail/ProductDetail.css";
import { Row, Col, ListGroup, Image, Form, Button, Card,Message } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart , removeFromCart} from '../../cartredux/cartaction';
import "./Cart.css"
import { CART_LOAD_ITEMS, CART_SET_ITEMS } from '../../cartredux/cartconstant';
import { useNavigate } from 'react-router-dom';
import {createOrder} from '../../orderRedux/orderActions'
import backg from "./backg.jpg";


const Cart= () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
const { cartItems } = cart;

const location = useLocation(); // Get the location object from React Router
  
const [qty, setQty] = useState(() => {
  const params = new URLSearchParams(location.search);
  const qtyParam = params.get("qty");
  const defaultQty = qtyParam ? Number(qtyParam) : 9;
  return defaultQty;
});



const user = useSelector((state) => state.userLogin.userInfo._id); // Get the user ID from the store
const dispatch = useDispatch();
console.log(id);
console.log("ena quantity" + qty);
useEffect(() => {
  navigate("/cart");
 
  const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${user}`)) || [];
  if (storedCartItems.length > 0) {
    navigate("/cart");

    dispatch({
      type: CART_SET_ITEMS,
      payload: storedCartItems.filter((item) => item.qty > 0),
    });
  }
  if (location.search) {
    const qtyParam = new URLSearchParams(location.search).get('qty');
    if (qtyParam) {
      setQty(Number(qtyParam));
    }
  }
  if (id) {
    setQty(qty);
    dispatch(addToCart(id, qty,user));
  }
}, [dispatch, id, qty, user]);

const removeFromCartHandler = (id)=>{
  dispatch(removeFromCart(id));
  const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${user}`)) || [];
  const updatedCartItems = storedCartItems.filter((item) => item.product !== id);
  localStorage.setItem(`cartItems_${user}`, JSON.stringify(updatedCartItems));
}


const orderCreate = useSelector(state =>state.orderCreate)
const {order , success , error} = orderCreate

useEffect(()=>{
  if(success){
    navigate(`/order/${order._id}`)
  }
})

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
}

const checkoutHandler = () => {
  navigate('/shipping')
}

    return (
    <div style={{marginTop:"200px",marginLeft:"500px"}} classname="shoppingcart">
    <Row >
        <Col  md={8}>
          <h1 style={{marginLeft:"-120px"}}> Your Shopping Cart</h1>
            {cartItems.length===0?( <div style={{marginLeft:"140px"}}><img style={{width:"120px"}}src='http://cdn.onlinewebfonts.com/svg/img_290414.png'/> <p>Your cart is empty </p> </div>):(
            <ListGroup  variant='flush'>
              {cartItems.map(item =>
                <ListGroup.Item >
                  <Row>
                    <Col md={2}>
                      <Image src={`${process.env.PUBLIC_URL}/images/${item.imageProduct}`} alt={item.productName} fluid rounded />
                    </Col>
                    <Col md={3}>
                      {item.productName}
                    </Col>
                    <Col md={2}>{item.price} DT x {item.qty}</Col>
                   
                   
                    <Col md={1}>
          
                          <lord-icon
                              src="https://cdn.lordicon.com/jmkrnisz.json"
                              trigger="hover" onClick={() => {
                                removeFromCartHandler(item.product);
                          }}>                   
                          </lord-icon>
                   </Col>
                  </Row>
                </ListGroup.Item>)}
            </ListGroup>
          ) }
        </Col>
        <Col md={6}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              DT
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  type='button'
                  className='add'
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      
   
      
      </div>)
}
export default Cart;