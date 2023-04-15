import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { getProducts, productDetails } from "../../productredux/productaction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form , Row ,Col, ListGroup, Button} from "react-bootstrap";
import { createProductReview } from '../../productredux/productaction';
import {CREATE_REVIEW_RESET} from '../../productredux/productconstant';
import Rating from "../../Components/Rating/Rating.js"
import backg from "./backg.jpg";

const ProductDetail=()=>{
  const navigate = useNavigate();
    const dispatch = useDispatch();
      const products = useSelector((state) => state.productGetReducer.products);
      const { id } = useParams();
      const [qty,setQty]= useState(1);
//initialise state
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')

const userLogin = useSelector((state)=>state.userLogin)
const {userInfo} = userLogin

const productReviewCreate = useSelector((state) => state.productReviewCreate) 
const successProductReview = productReviewCreate ? productReviewCreate.success : false;


    console.log("ena el products" + products);
    useEffect(() => {
      if(successProductReview){
        alert('Review Submitted !')
        setRating(0)
        setComment('')
        dispatch({type:CREATE_REVIEW_RESET})
      }
      dispatch(getProducts());
    }, [dispatch ,successProductReview]);
    console.table(products)
    const product = products.find((p) => p._id === id);
console.table(product);
// console.log(product.name);
const addtoCart=()=>{

  navigate(`/cart/${id}?qty=${qty}`)
}

const submitHandler = (e)=>{
  e.preventDefault()
  
  dispatch(createProductReview(id,{
    rating,
    comment,
  }))

}
    return (
        <>    <body style={{backgroundImage:`url(${backg})`}}>

         {product ? ( 
        <div className="containerdetail">
  <div className="images">
  <img className="imgdetail" src={`${process.env.PUBLIC_URL}/images/${product.imageProduct}`} />
  </div>
  <div className="product1"> 
  
    <p className="pdetail"> {product.category}- by {product?.user?.firstName} {product?.user?.lastName}</p>
    <h1 className="h1detail">{product.productName}</h1>
    <h2 className="h2detail">{product.price} Dt </h2>
    <p class="desc pdetail">{product.description}.</p>
    <ListGroup.Item> 
                  <Rating

                    value={product.rating}
                    text={`  ${product.numReviews} reviews`}

                  />
                </ListGroup.Item> <br />

    <div class="buttons">

   <h2 className="stock">{product.countInStock> 0 ? product.countInStock+' items left in stock ': 'OUT OF STOCK' } </h2>
    {product.countInStock> 0 ? (
     <><Form.Control required as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>{[
      ...Array(product.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}>{x+1}</option>))}
    </Form.Control>
    {userInfo ? (<div><button onClick={addtoCart}className="add">Add to Cart</button><button className="like"><span>♥</span></button></div>):('')}</>  ): ''}
    
    </div>
  </div>
  <Row>
        <Col style={{marginLeft:"50px"}}md={10}>
          <h2> Reviews({`${product.numReviews}`})
</h2>
          {product.reviews.length=== 0 && <p> No Reviews </p> }
          <ListGroup variant="flush">
            {product.reviews.map(review=>(
              <ListGroup.Item key={review._id} >
                <strong>{review.name}</strong> 
                <Rating
                    value={review.rating}
                    

                  />
                  <p>{review.createdAt?.substring(0,10)}</p>
                  <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating" >
                  <Form.Label>Rating</Form.Label>
                  
                  <Form.Control as='select' value={rating} onChange={(e)=>{
                    
                    setRating(+e.target.value)
                    ;}}>
                      <option value=''>Select...</option>
                      <option value='1'>1 -poor</option>
                      <option value='2'>2 -fair</option>
                      <option value='3'>3 -good</option>
                      <option value='4'>4 -veryGood</option>
                      <option value='5'>5 -Excellent</option>
                    </Form.Control>
                </Form.Group >

                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as='textarea' rows='3' value={comment} onChange={(e)=>setComment(e.target.value)} ></Form.Control>

                </Form.Group>
                   <Button type="submit" variant="primary"> submit</Button>
              </Form>): (<alert> please <Link to='/login'>sign in</Link> to write a review </alert>)}
            </ListGroup.Item>

          </ListGroup>
        </Col>
      </Row>
      
</div>

) : (
        <p>No product found</p>
      )} </body> </>
    )
}
export default ProductDetail;