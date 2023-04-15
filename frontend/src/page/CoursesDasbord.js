import NavBar from "../Components/Dashboard/NavBar";
import Header from "../Components/Dashboard/Header";
import Footer from "../Components/Dashboard/Footer";
import { DashboardHTML } from "../Components/dashboard";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCourses} from "../coursereduc/courseActions";
import { Route  , Link, NavLink, Navigate, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'



 function CoursesDasbord  (props) {
  const [refresh, setRefresh] = useState(false);
  const [details,setDetails]= useState(true);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseDisplay.courses);
/*   const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (key) => {
    try {
      const response = await  fetch(`http://localhost:5000/api/user/search/${key}`, { method: 'GET' }); 
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  }; */

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  
  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  if (Array.isArray(course)) {
    currentPageData = course.slice(offset, offset + itemsPerPage);
  }  
//for the nagivation between pages Sponssor and Coach
let navigate =useNavigate()
const userLogin =useSelector(state =>state.userLogin)
const {userInfo} =userLogin
  console.log(course);
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch ]);

 


  

  // If the user is not an admin, redirect to the homepage
  
   // handle page change
   const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
 
 const Lesson=( id )=>{
  let path =`/lessondashboard/${id}`
        navigate(path)
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
            //   onChange={(e) => handleSearch(e.target.value)}
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
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> List Courses</h4>
        <div className="card">
       
                <h5 className="card-header">Courses</h5>
               
      <FontAwesomeIcon icon={faSync} /> 
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Course Description</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Lesson</th>
                      </tr>
                    </thead>
                    <div>

      </div>
                    <tbody className="table-border-bottom-0">
        
                        {currentPageData.map((i) => {
                          
                          return(
                              
                            <tr key={i.id}>
                            
                          <td><i className="fab fa-angular fa-lg text-danger me-3"></i>{i.titleCourse}</td>
                          <td> {i.descriptionCourse}</td> 
                        <td>
                        {i.category}
                        </td>
                        <td>
                        <img style={{width:"200px",height:"auto"}} src={`${process.env.PUBLIC_URL}/images/${i.thumbnailCourse}`} alt="My Image" />
                        </td>
                        <td>
                            <lord-icon
                                src="https://cdn.lordicon.com/qvbrkejx.json"
                                trigger="morph"
                                style={{ width:'50px' , height:'50px' }}
                                onClick={() => Lesson( i._id)}

                            />
                          
                        </td>
                        </tr>
                          )
                        })} 

                        
                                            
                    </tbody>
                  </table>
                  <ReactPaginate
        previousLabel={<span className="icon-prev"></span>}
        nextLabel={<span className="icon-next"></span>}
        breakLabel={<span className="break"></span>}
        pageLinkClassName={'page-link'}
        pageCount={Math.ceil(course?.length / itemsPerPage)}
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
export default CoursesDasbord

