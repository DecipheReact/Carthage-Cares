import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardHTML } from "../Components/dashboard";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import NavBar from "../Components/Dashboard/NavBar";
import Header from "../Components/Dashboard/Header";
import Footer from "../Components/Dashboard/Footer";



const LessonDashboard = () => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id  } = useParams();
  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await fetch(`http://localhost:5000/course/${id}/lessons`, { method: 'GET' });
        const data = await response.json();
        setLesson(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    getLesson();
  }, [id ]);
  if (loading) {
    return <p>Loading...</p>;
  }


  return ( <>
  
    <div>    <div>{ReactHtmlParser(DashboardHTML)}   </div>
    </div>
  
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
          <NavBar />
          <div className="layout-page">
      <Header/>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Details Lesson</h4>
        <div className="card">
       
                <h5 className="card-header">Details</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                    
                      <tr>
                        <th>Lesson Title</th>
                        <th>Lesson Description</th>
                        <th>Lesson Content</th>
                        <th>Lesson Type</th>
                      </tr>
                   
                    </thead>
                    
                    <tbody className="table-border-bottom-0">   
                    {lesson?.map((i) => {
                          
                          return(              
                            <tr key={i.id}>
                          <td><i className="fab fa-angular fa-lg text-danger me-3"></i> {i.titleLesson}</td> 
                        <td>
                        {i.descriptionLesson}
                        </td>
                        <td>
                        {i.contentLesson}
                        </td>
                        <td>
                        {i.typeLesson}
                        </td>
                        
                        </tr> 
                          )})} 
                            
                           
                    </tbody>
                  </table>
                 
                </div>
              </div> 
                
        </div>
        <Footer/>  
         </div> </div>
        
        </div> </div>
   
      </>   
  );
};

export default LessonDashboard;