import { Link } from "react-router-dom";
import "./event.css";
import miel from"./miel.png"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {addEnroll} from "../../coursereduc/courseActions"
import Swal from 'sweetalert2';





function Event({coursee}){
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
    const dispatch = useDispatch();

  const handleEnroll = () => {
    dispatch(addEnroll({ learner:userInfo._id, course : coursee._id, completionStatus:"Not started" }));
    setIsEnrolled(true);
    navigate(`/coursedetail/${coursee._id}`);
  };

  useEffect(() => {
    // fetch the enrollments data
    axios.get(`http://localhost:5000/course/getEnroll`)
      .then((response) => {
        setEnrollments(response.data);
        setIsEnrolled(response.data.some((enrollment) => enrollment.course === coursee._id && enrollment.learner === userInfo._id));
      })
      .catch((error) => console.log(error));
  }, [coursee, userInfo]);

  const imageClasses = ` ${isEnrolled ? "" : "card__image--disabled"}`;


    return(<>
    
      <Link  to={isEnrolled ? `/coursedetail/${coursee._id}` : "#"}
          key={coursee._id}  className={imageClasses} >

    <div className="grid">
    <div className="card">
      <div className="card__image">
        <img src={`${process.env.PUBLIC_URL}/images/${coursee.thumbnailCourse}`} alt="">
</img>
        <div className="card__overlay card__overlay--blue">
          <div className="card__overlay-content">
            <ul className="card__meta">
              <li><a href="#0"><i className="fa fa-tag"></i> {coursee.category}</a></li>
              <li><a href="#0"><i className="fa fa-clock-o"></i> 22 nov</a></li>
            </ul>

            <a href="#0" className="card__title"> {coursee.titleCourse}</a>

            <ul className="card__meta card__meta--last">
              <li><a href="#0"><i className="fa fa-user"></i> {coursee?.coach?.firstName}</a></li>
              <li><a href="#0"><i className="fa fa-facebook-square"></i> Share</a></li>
                   {userInfo && !isEnrolled && (
                      <button 
                      onClick={() => {
                        Swal.fire({
                          title: 'Are you sure you want to Enroll to this Course?',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Enroll',
                          denyButtonText: `Don't Enroll`,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleEnroll()
                            Swal.fire('You are now Enrolled to this Course ', '', 'success');
                          } else if (result.isDenied) {
                            Swal.fire('Not Enrolled', '', 'info');
                          }
                        });
                      }}
                      >Enroll</button>
                    )}
            </ul>
          </div>
        </div>
      </div>
    </div>
</div> </Link> </>)
}
export default Event;