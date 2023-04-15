import "./CoachDashboard.css"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SpecialButton from "../../Components/Button/button";
import { useDispatch , useSelector , } from "react-redux";
import {updateCourse} from "../../coursereduc/courseActions"
import { ArrowWrapperLeft, ArrowWrapperRight } from "../../Components/Arrows/Arrows";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function UpdateCourses(){
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin
    const [ titleCourse, setTitleCourse] = useState(""); 
    const [ descriptionCourse, setDescriptionCourse] = useState(""); 
    const [ category, setCategory] = useState(""); 

    const [thumbnailCourse, setThumbnailCourse] = useState(""); 
    /////////////////////
    const [course_id, setcourse_id] = useState(null);
    const [step, setStep] = useState(1);
    const [lessonQty, setLessonQty] = useState(3);

    const { id } = useParams();
    const [course, setCourse] = useState(null);
useEffect(() => {
  axios.get(`http://localhost:5000/course/${id}`).then((response) => {
    const { titleCourse, descriptionCourse, category, thumbnailCourse } = response.data;
    setTitleCourse(titleCourse);
    setDescriptionCourse(descriptionCourse);
    setCategory(category);
    setThumbnailCourse(thumbnailCourse);
    setCourse(response.data);
  });
}, [id]);
console.log(course);



    const dispatch = useDispatch();

console.log(thumbnailCourse);


    const submitHandler=async(e)=>{
      e.preventDefault();


const coach=userInfo._id

      dispatch(
        updateCourse(
         { titleCourse ,
          descriptionCourse , 
          category , 
          coach ,
          thumbnailCourse,
          id
         }
        )
      );
      navigate("/coachdashboard");

    

    };



    
  const handleCreateClick = () => {
    navigate("/coachdashboard");
  };

  const handleListClick = () => {
    navigate("/coachdashboard");
  };
 
//console.log(course?.lessons?.titleLesson)
  console.log(lessonQty)
    return(

        <><body  className="coach">
        <main align="center" className="mp_maincoach">
            <div style={{marginTop:"500px"}}>
           
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
<lord-icon
    src="https://cdn.lordicon.com/mrdiiocb.json"
    trigger="hover" colors="primary:#ffffff"
    onClick={handleCreateClick} 
  />
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
    </div>
   
    <div
        id="create"
        className={ " library_trending_coach_create" }
      >   

        <h3 align="center" className="library_trending_title">Update A Course </h3>
         <>
 
 <h3 align="center" className="library_trending_title">Step 1 : Course description </h3>
<input type="text" placeholder="Course name"  value={titleCourse}  onChange={(e) => setTitleCourse(e.target.value)}  ></input>
 <input type="text" placeholder=" Category" value={category}  onChange={(e) => setCategory(e.target.value)} ></input>
                
<input type="text" placeholder="What is this course about?"  value={descriptionCourse}   onChange={(e) => setDescriptionCourse(e.target.value)}></input>
                <input type="file"  name="thumbnailCourse" 
                onChange={(e) => setThumbnailCourse(e.target.files[0])}></input>
                <SpecialButton name="Update" onClick={submitHandler} type="submit"/> 
                </> 

                
 </div>




  </div>
  
      <hr />
      </div>
</main> </body>
        </>
    )
}
export default UpdateCourses;