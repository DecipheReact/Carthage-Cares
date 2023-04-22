import "./UserDashboard.css"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SpecialButton from "../../Components/Button/button";
import { useDispatch , useSelector , } from "react-redux";
import { productadd,deleteProduct } from "../../productredux/productaction";
import {getOrderByIdAndUserId, approveOrder , getDetailsDashboardProductsOrder, removeProductFromOrder} from '../../orderRedux/orderActions';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Loader from "../../Components/Loader";
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { TablePagination  } from '@material-ui/core';
import {  Table, TableHead, TableRow, TableCell, TableBody,Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Swal from 'sweetalert2';

function UserDashboard(){
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin
    const productAdd = useSelector((state) => state.productAdd);
    const { loading, error,messageSuccess } = productAdd;

    const [showCreate, setShowCreate] = useState(false);
    const [showOrders, setShowOrders] = useState(false);

    const [product, setProduct] = useState([]);
    
  const orderList = useSelector((state) => state.orderdashboard);
  const { loading : loadingList , error : errorList , orders } = orderList;
  
  const [page, setPage] = useState(0);
  
  const [pageApproved, setPageApproved] = useState(0);
  const [pageUnapproved, setPageUnapproved] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const navigate = useNavigate();

    const orderApprove = useSelector((state) => state.orderApprove);
    const { loading: loadingOrderApprove, error: errorOrderApprove, success: successOrderApprove } = orderApprove;



        const deleteHandler = (id) => {
              dispatch(deleteProduct(id));
          
        };
        
//details 

const [openDialog, setOpenDialog] = React.useState(false);
const selectedOrderItems = useSelector((state) => state.orderProductDashboard.products);
const handleOpenDialog = (id,order) => {
  dispatch(getDetailsDashboardProductsOrder(userInfo._id, order._id));
  console.log("id user :" , id);
  console.log("id order :" , order._id);
  setOpenDialog(true);
};
const deleteProductOrder = (id,order,product) => {
  if (window.confirm('Are you sure you want to delete this product from the order?')) {
  dispatch(removeProductFromOrder(id, order,product));
  handleRefreshOrder();
  console.log("id user :" , id);
  console.log("id order :" , order);
  console.log("id product :" , product);
  }
};
//end details

        
        const handleRefresh = () => {
          setTimeout(() => {
            dispatch(getProduct());
          }, 1000); 
          console.log("after 1 second");// Refresh after 1 seconds (adjust the number as needed)
        };
        const handleRefreshOrder = () => {
          dispatch(ListOrder());
          setPage(page => page); 
        }


        const getProduct = async () => {
          try {
            const response = await fetch(`http://localhost:5000/product/productById/${userInfo._id}`, { method: 'GET' });
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.error(error);
          }
        };
        //getcourse

    useEffect(() => {
      getProduct();
      //getcourse()
    }, [userInfo._id , successDelete ]);


    const [productName,setName]=useState("");
    const [imageProduct,setImageProduct]=useState("");

    const [description, setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [countInStock,setCountInStock]=useState("")
    const[user,setUser]=useState("");
    const dispatch = useDispatch();

    const handleApprove = (id) => {
      dispatch(approveOrder(id));
    };
    

 const {
     loading: loadingUpdate,
     error: errorUpdate,
     success: successUpdate,
   } = useSelector((state) => state.productUpdate) || {};


console.log(imageProduct);
const submitHandlerj = (e) => {
    e.preventDefault();
    dispatch(
      productadd(
       {  productName,
        price ,
        imageProduct,
        user:userInfo,
        category , 
        countInStock ,
        description}
        
      )
    );
    console.log(productName,price,user,category,countInStock,description,imageProduct)
    navigate("/userdashboard");
  };

  
  const handleCreateClick = () => {
    setShowCreate(true);
    setShowOrders(false);
  };

  const handleListClick = () => {
    setShowCreate(false);
    setShowOrders(false);
  };

  const ListOrder = () => {
    setShowOrders(true);
    setShowCreate(false);
    dispatch(getOrderByIdAndUserId(userInfo._id));
  }

    return(

        <><body className="yoo">
        <main className="mp_main">
            <div style={{marginTop:"500px"}}>
            {error && <div className="alert">{error}</div>}
          {messageSuccess && <div className="alertgreen">{messageSuccess}</div>}
          
          {loading && <Loader />}


  <div className="mp_sidebar">
    <div className="sidebar_logo">
      <img src={process.env.PUBLIC_URL + "/images/logo.png"}/>
    </div>

    <div className="sidebar_menu">
    <lord-icon
    src="https://cdn.lordicon.com/slduhdil.json"
    trigger="hover" colors="primary:#ffffff"
    onClick={handleListClick} 
    />
            {/* <img onClick={handleListClick} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABEElEQVRIie2TMUqDQRCF34T8hdgELYVYpdAmnY05QTyCpLHzBJZioTdIo50B7YWkUSzVIs1/nghfCkdYAstOfkkh+mCbnXnvzczOSn8KwAgYbULYgHOg9nMBtCJcC4hXkq4knUha+HUlaSrp0swWOW4RwBYw9qrfgWPgCHjzuztgu6l4B5i40CtwkMR6wLPHHoHddcX3gCcXmALdQs4M2I+K94AXJz4AO4Uu75MuD0vi6XxvI/NdeacPYJBLHALzZBXbJfGE2054c2D4HWt5wqmka32tnyTJzD6jBiu5laQb4CxXTQ3UUfESLzSGnKGZ9Uvc0Hf/CdYyMLN+pOrGBk3w+w2yWxRZ1UjOxjv4RxFLW3QYbNPY/+0AAAAASUVORK5CYII=" /> */}
<lord-icon
    src="https://cdn.lordicon.com/mrdiiocb.json"
    trigger="hover" colors="primary:#ffffff"
    onClick={handleCreateClick} 
  />
<lord-icon
    src="https://cdn.lordicon.com/ogkplaef.json"
    trigger="hover" colors="primary:#ffffff"
    onClick={ListOrder} 
  />

      {/* <img onClick={handleCreateClick} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAQElEQVRIiWNgGAXUBIcPHz5y+PDhI6ToYaKVY0YtGLWAeoARmUNqGscFbG1tbWBsmvuAJDCak0ctGKYWjAKCAAB8yhBUbF/pJwAAAABJRU5ErkJggg==" /> */}
    </div>
    <div className="sidebar_logout">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACAklEQVRoge2ZP2tUQRTFfydEwfULJCpY5ANYqa1FlECwUhArIU0QrG1SaKG9RZZ0EWtBUEQQBC39A8GPYCEkRYqNkigYcizegMsSzMzbu3nN/JrLwpvzzr0zs+++eVCpVCqVMVCUkO0p4AZwAZhuIbEPfAVeSDqI8pWFbdl+5Rhe2s4ubMgM2F4EXgObQJ+mmqVMA/eAGWBR0psIb1nYXknVezSmzuOks5I7ZmqcGw5xIsU2lR/mz4jekUQl0Bk1ga6pCST2UtwN0sumzRPzMNaAbeB5kF42IQlI+gmsR2iV0noJ2T5r+6HtmUhDpbSaAdvngA/AHDAAnkSaKqF4BkbMfwGeRpsqoSiBZP49jfkNYEHSziSM5ZK9hGyf4V/lD2iqf992rsQ+sCppq9Tk/yjZA7dozEMzc8st7rdN8H4pSWAduA1cTL9Xge8F43eBZwXXZ5GdgKQd21eBt8Bl4DpwRdK3aFMlFG3itGEXaNb/eeCd7dlJGMul+G9U0gC4RpPEHM3e6IxWDzJJA9vzwE066H+Gad0LSfpBR/3PMCHttO3ZrvqiqPeBJeBBisdK9KnEySC9bOorZdfUBLomKoHfKZ4aU6eX4q/cAVGnEh9TvGu7R7vjldPAnRG948N2P+j7QL/kvmFfaFISl2ha7d5R1x7CHvBJ0udIT5VKpTJZ/gIArCTzj9YnhAAAAABJRU5ErkJggg==" />
    </div>
  </div>
  <div className="mp_library">
    <div className="library_search">
      <div className="searchbar">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABxElEQVRIidWUv27UQBCHv1m7ubsUpCf0EY9wXh/HKyBFugaq0PAEFKmQ8gKIhj9NhHSRDvEKR7y+gheAPtCeghRSIMs7FLeGBBzbR4IQv2bs0fzm2x2vF/53SV3SObcpIjtAoqpbIX0cRVFeluXMWnvyx4DFYnHXe78H9GsNImfAkyRJ5msDQvP9VR858t4fxnH8MTTeLopiIiKpiHhVfWytfdcZ4JzbBN4CfWPM0+Fw+LrO4Jy7DzwSka9FUdwbj8dfmgDmB2k1876IHF3WHMBaewA4Vd2I43inbQfm3LMF8N4ftpmAaYhJZ4Cq3gSoZt6kXq9X1Ww1FnJxB9pWXGm5XNYe70aAiHwOcbvNNBgMqppPnQHGGAdQFMWkzaSqkxBdZ0BZljMRORORNBzFWuV5/oDVxz0VkTdtgAuzzPN8DOyrqgEcMI2i6AOA9/52WHkS3p+PRqNXawEAnHN3RGRPVTcu8Zx676fGmIcAqvoyTdMXnQEA8/n8RviJEuBWSB8DOTCz1p44595X9U2QzsftV1VXxrnUgbX22bUBukKuBOgCuTKgDWLqLesp3LA/Vy3y7Tr6/qYsy3azLNv9K83/mb4D+s23Z1Qya+gAAAAASUVORK5CYII=" />
      </div>
      
                {loadingUpdate && <div style={{backgroundColor: 'yellow', padding: '10px', borderRadius: '5px'}}>Loading...</div>}
{errorUpdate && <div style={{backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px'}}> Please add all fields </div>}
{successUpdate && <div style={{backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px'}}>Product updated successfully!</div>}

          

    </div>
    
    <div
        id="create"
        className={`create ${showCreate ? "show" : "hide"} ${showCreate ? "library_trending" : ""}`}
      > 
       <div class="video-containerproductadd">
        <iframe width="500" height="340" src="https://www.youtube.com/embed/ie5NdWCXK3A" title="YouTube video player" frameborder="0" allowfullscreen loop mute ></iframe>
      </div>     
       <h3 className="library_trending_title">Create your product    &  get inspired with our video on Making products </h3>

          <input type="text" placeholder="Product name" id="name"   value={productName}
                onChange={(e) => setName(e.target.value)}></input>
          <input type="text" placeholder="Category"  value={category}
                onChange={(e) => setCategory(e.target.value)}></input>
          <input type="text" placeholder="Description"  value={description}
                onChange={(e) => setDescription(e.target.value)}></input>
          <input type="text" placeholder="How many are you going to sell ?"  value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}></input>
          <input type="text" placeholder="Price "  value={price} 
                onChange={(e) => setPrice(e.target.value)}></input>
                 <input type="file" placeholder="Price " id="imageProduct" name="imageProduct" 
                onChange={(e) => setImageProduct(e.target.files[0])}></input> 
<SpecialButton name="Create" onClick={submitHandlerj}  type="submit"/>

 
</div>
{
 <div
            id="create"
            className={`create ${showOrders ? "show" : "hide"} ${showOrders ? "library_trending" : ""}`}
          >

            <div className="library_album">
              <h1>Welcome {userInfo.firstName} to Your User Dashboard!</h1>




            </div>
            {orders && orders.length > 0 ? (
                   <table style={{ marginTop : '40px'}}>
              {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                return (
                  <tr key={order.id}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td className="song"> 
                      <h4>DATE </h4>
                      <p > {order.createdAt.substring(0, 10)}</p>
                    </td>
                    <td style={{ marginRight : '50px'}}>
                      <h4 className="song"> TOTAL </h4>
                      <p style={{color : 'black'}}>${order.totalPrice.toFixed(2)}</p>
                    </td>
                    <td>
                      <h4  className="song"> PAID</h4>
                      <p style={{color : 'black'}}>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</p>
                    </td>
                    <td>
                      <h4 className="song">DELIVERED</h4>
                      <p style={{color : 'black'}}> {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</p>
                    </td>
                    <td>
                      <h4 className="song">Status</h4>
                      <p style={{color : 'black'}}> {order.statusOrder ? 'Approved' : 'Not approved'}</p>
                    </td>
                    <td>
  {!order.statusOrder && (
    <button
      onClick={() => {
        Swal.fire({
          title: 'Do you want to Approve this Order?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Approve',
          denyButtonText: `Don't Approve`,
        }).then((result) => {
          if (result.isConfirmed) {
            handleApprove(order._id);
            handleRefreshOrder();
            Swal.fire('Order Approved!', '', 'success');
          } else if (result.isDenied) {
            Swal.fire('Course is not Approved', '', 'info');
          }
        });
      }}
    >
      Approve
    </button>
  )}
</td>

                    <td>
                           
<Button style={{ fontSize: 'smaller', marginLeft:'10px' }} onClick={() => handleOpenDialog(userInfo._id, order)}>
                                    Details
                                  </Button>
                    </td>
                    
                  </tr>
                )
              })}
            </table> 
            
            ) : (
              <p>You have no orders.</p>
            )}
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle style={{ backgroundColor: '#b3b3b3' ,fontWeight: 'bold', fontSize: '1.2rem', paddingBottom: '0.5rem' }}>
            <Typography variant="h6" style={{ color: '#fff' }}>Order Items</Typography>
                  </DialogTitle>

  <DialogContent>
  <Table>
  <TableHead style={{  }}>
    <TableRow>
      <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}> 
      </TableCell>
      
      <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' ,backgroundColor: '#d9d9d9', color: '#fff'}}>
        <Typography  style={{ color: '#fff' }}>Product Name</Typography>
      </TableCell>
      <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' ,backgroundColor: '#d9d9d9', color: '#fff' }}>
        <Typography  style={{ color: '#fff' }}>Category</Typography>
      </TableCell>
      <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' ,backgroundColor: '#d9d9d9', color: '#fff' }}>
        <Typography  style={{ color: '#fff' }}>Quantity</Typography>
      </TableCell>
      <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#d9d9d9', color: '#fff' }}>
  <Typography style={{ color: '#fff' }}>Delete</Typography>
</TableCell>

    </TableRow>
  </TableHead>

  <TableBody>
  {selectedOrderItems &&
  selectedOrderItems.map((orderItem) => (
    <TableRow key={orderItem._id}>
      <TableCell>
        <img style={{width:"70px",height:"auto"}} src={`${process.env.PUBLIC_URL}/images/${orderItem.imageProduct}`} alt="My Image" className="song_cover" />
      </TableCell>
      <TableCell>{orderItem.productName}</TableCell>
      <TableCell>{orderItem.category}</TableCell>
      <TableCell>{orderItem.qty}</TableCell>
      <TableCell>
  <Button
    variant="contained"
    color="secondary"
    onClick={() => deleteProductOrder(userInfo._id, orderItem.idOrder, orderItem.id)}

  >
    Delete
  </Button>
</TableCell>
    </TableRow>
))}

  </TableBody>
</Table>

  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Close</Button>
  </DialogActions>
</Dialog>
                  {  <TablePagination
                rowsPerPageOptions={[5, 10, 25]} 
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(event, newPage) => setPage(newPage)}
                onChangeRowsPerPage={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              /> }

  

          </div>

 }

          <div id="list" className={`create ${!showOrders ? "show" : "hide"}  ${!showCreate ? "show" : "hide"} ${!showCreate ? "library_trending" : ""} ${!showOrders ? "library_trending" : ""}`}
          >  <div className="library_album">
      <h1>Welcome {userInfo.firstName} to Your User Dashboard!</h1>


      

      {loadingList && <div className="alertgreen"> && <p>Loading...</p> </div>}

{errorList && <div className="alertgreen"> && <p>{errorList}</p> </div>}   

 {loadingDelete && <div className="alertgreen"> && <p>Loading...</p> </div>} 

{errorDelete  && <div className="alertgreen"> && <p>{errorDelete}</p> </div>}
{successDelete  && <div className="alertgreen"> && <p>{successDelete}</p> </div>}
            
<h3 className="library_trending_title">Review Your products</h3>
</div>
      <table>
     {product && product.map((i , index) => {
           return(
        <tr key={i.id}>
          <td>
            <p>{index + 1}</p>
          </td>
          <td>
          <img style={{width:"70px",height:"auto"}} src={`${process.env.PUBLIC_URL}/images/${i.imageProduct}`} alt="My Image" className="song_cover" />
          </td>
          <td className="song">
            <h4>{i.productName}</h4>
            <p> {i.description}</p>
          </td>
          <td>
            <p>{i.category}</p>
          </td>
          <td>
            <p>{i.price}</p>
          </td>
          <td>
            <p>{i.countInStock}</p>
          </td>
          <td>
          <lord-icon src="https://cdn.lordicon.com/jmkrnisz.json"
                              trigger="hover" colors="primary:#ffffff" onClick={() => {
                                Swal.fire({
                                  title: 'Do you want to Delete this Product?',
                                  showDenyButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: 'Delete',
                                  denyButtonText: `Don't Delete`,
                                }).then((result) => {
                                  if (result.isConfirmed ) {
                                    deleteHandler(i._id);
                                    handleRefresh();
                                    Swal.fire('Product Deleted!', '', 'success');
                                  } else if (result.isDenied) {
                                    Swal.fire('Product is not Deleted', '', 'info');
                                  }
                                });
                              }}>                   
            </lord-icon>
          
                 </td>
          <td>
             <Link to={`/updateProduct/${i._id}`}>
                <FontAwesomeIcon icon={faEdit} size="xl" />
            </Link>           
            </td>
          </tr>
     )})}
      </table>
    </div>
  </div>
 
      <hr />
      </div>
</main> </body>
        </>
    )
}
export default UserDashboard;