import NavBar from "../../Components/Dashboard/NavBar";
import Footer from "../../Components/Dashboard/Footer";
import { DashboardHTML } from "../../Components/dashboard";
import ReactHtmlParser from 'react-html-parser';
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route  , Link, NavLink, Navigate, useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { getProducts } from "../../productredux/productaction";



 function ProductDashboard  ({match}) {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productGetReducer.products);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (key) => {
    
    try {
      const response = await  fetch(`http://localhost:5000/product/search/${key}`, { method: 'GET' }); 
      const data = await response.json();
            // Check if data array is empty
            if (data.length === 0) {
              setSearchResults([]);
            } else {
              setSearchResults(data);
            }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products)

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  
  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  if (Array.isArray(products)) {
    currentPageData = products.slice(offset, offset + itemsPerPage);
  }  


// const userLogin =useSelector(state =>state.userLogin)
// const {userInfo} =userLogin
  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch ]);

 
 const handleRefresh = () => {
   setTimeout(() => {
     dispatch(getProducts());
   }, 1000); 
   console.log("after 1 second");// Refresh after 1 seconds (adjust the number as needed)
 };




  

  // If the user is not an admin, redirect to the homepage
  
   // handle page change
   const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
 

 

    return ( <>
    
<div>    <div>
  {ReactHtmlParser(DashboardHTML)}   </div>
</div>;        <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
          <NavBar />
          <div className="layout-page">
          <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <Link className="nav-item nav-link px-0 me-xl-4" to="">
            <i className="bx bx-menu bx-sm"></i>
          </Link>
        </div>
      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              
              <input type="text" 
              onChange={(e) => handleSearch(e.target.value)}
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />

              
            </div>
          </div>
          </div>
          </nav>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> List Products</h4>
        <div className="card">
       
                <h5 className="card-header">Products</h5>
                <button className="btn btn-primary" onClick={handleRefresh}>
      <FontAwesomeIcon icon={faSync} /> 
    </button>
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Product Name</th>
                        <th>Categorye</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <div>

      </div>
                    <tbody className="table-border-bottom-0">
                    { Array.isArray(searchResults) && searchResults?.length > 0 ? (
                         <>
                    {searchResults.map((i) => {
                              return(
                            <tr key={i.id}>
                            
                          <td><i className="fab fa-angular fa-lg text-danger me-3"></i>{i?.user?.firstName ?? 'No First Name'}</td>
                          <td> {i.name}</td> 
                          <td> {i.category}</td> 
                        <td>
                        {i.description}
                        </td>
                        <td>
                        {i.price}
                        </td>
                        <td>
                        {i.countInStock}
                        </td>
                        <td>
                        <img style={{width:"200px",height:"auto"}} src={`${process.env.PUBLIC_URL}/images/${i.imageProduct}`} alt="My Image" />
                        </td>
                        
                       
                       </tr>
                          
                        )})} 
                        </> 
                        ): (
                        
                       
<>
                        {currentPageData.map((i) => {
                          
                          return(
                              
                            <tr key={i.id}>
                            
                            <td><i className="fab fa-angular fa-lg text-danger me-3"></i>{i?.user?.firstName ?? 'No First Name'}</td>
                            <td> {i.name}</td> 
                          <td> {i.category}</td> 
                        <td>
                        {i.description}
                        </td>
                        <td>
                        {i.price}
                        </td>
                        <td>
                        {i.countInStock}
                        </td>
                        <td>
                        <img style={{width:"200px",height:"auto"}} src={`${process.env.PUBLIC_URL}/images/${i.imageProduct}`} alt="My Image" />
                        </td>
                        <td><Link to={`/productdetail/${i._id}`} key={i._id} > detail </Link>
                        </td>
                        </tr>
                        )
                      })} 
</>
                      )}
                                            
                    </tbody>
                  </table>
                  <ReactPaginate
        previousLabel={<span className="icon-prev"></span>}
        nextLabel={<span className="icon-next"></span>}
        breakLabel={<span className="break"></span>}
        pageLinkClassName={'page-link'}
        pageCount={Math.ceil(products?.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
                </div>
              </div> 
                
        </div>
        <Footer/>  
         </div> </div>
        
        </div> </div>
      
        
</>
     );
}
export default ProductDashboard

