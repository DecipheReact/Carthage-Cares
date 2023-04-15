import "./CoachDashboard.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SpecialButton from "../../Components/Button/button";
import { useDispatch, useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

import {
  addCourse,
  addLesson,
  addTest,
  deleteCourse,
  deleteLesson,
  deleteTest,
} from "../../coursereduc/courseActions";
import {
  ArrowWrapperLeft,
  ArrowWrapperRight,
} from "../../Components/Arrows/Arrows";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import {
  COURSE_ADD_REQUEST,
  COURSE_ADD_SUCCESS,
} from "../../coursereduc/courseConstants";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CoachDashboard() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const addCourses = useSelector((state) => state.addCourse);
  //const { loading, error,messageSuccess } = addCourses;

  const testadd = useSelector((state) => state.addTest);
  const { loading, error, messageSuccess } = testadd;
  const { userInfo } = userLogin;
  const [showCreate, setShowCreate] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [showTestAdd, setShowTestAdd] = useState(false);

  const [titleCourse, setTitleCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const [category, setCategory] = useState("");

  const [titleLesson, setTitleLesson] = useState("");
  const [descriptionLesson, setDescriptionLesson] = useState("");
  const [contentLesson, setContentLesson] = useState("");
  const [typeLesson, setTypeLesson] = useState("");
  const [thumbnailCourse, setThumbnailCourse] = useState("");

  /////////////////////test
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [test, setTest] = useState({});

  /////////////////////
  const [course_id, setcourse_id] = useState(null);
  const [step, setStep] = useState(1);
  const [lessonQty, setLessonQty] = useState(3);
  const [create, setCreate] = useState(true);
  const [add, setAdd] = useState(false);

  const [details, setDetails] = useState(true);
  const [lesson_id, setLesson_id] = useState(0);


const [validOptions,setValidOptions]= useState(false);
const [validAnswer,setValidAnswer]= useState(false);
const ANSWER_REGEX = /^(?=.*\b([a-zA-Z]+)\b)(?=.*\b([a-zA-Z]+)\b)(?=.*\b([a-zA-Z]+)\b)(?=.*\b(o[0-9]*\b|[a-zA-Z]+\b))[\s\S]*$/
const OPTION_REGEX = /^[^,]+,[^,]+,[^,]+$/
const [popularCourseData, setPopularCourseData] = useState([]);




  const courseDelete = useSelector((state) => state.courseDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = courseDelete;

  const deleteHandler = (id) => {
    dispatch(deleteCourse(id));
  };

  const TestdeleteHandler = (id) => {
    dispatch(deleteTest(id));
  };

  //Lesson delete
  const lessonDelete = useSelector((state) => state.deleteLesson);

  const lessondeleteHandler = (idCourse, idLesson) => {
    dispatch(deleteLesson(idCourse, idLesson));
  };

  

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQuestion = {
      text: questionText,
      options: questionOptions.split(",").map((option) => option.trim()),
      answer: questionAnswer,
    };
  ;

    console.table(questions);
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setQuestionOptions("");
    setQuestionAnswer("");
  };
  useEffect(() => {
    axios.get('http://localhost:5000/course/getPopularCat')
      .then(res => {
        // Convert count property to numeric value
        const data = res.data.map(item => ({ ...item, count: Number(item.count) }));
        setPopularCourseData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const result1 = OPTION_REGEX.test(questionOptions);
    if (questionOptions.includes(questionAnswer)) {
      setValidAnswer(true);
    } else {
      setValidAnswer(false);
    }
    setValidOptions(result1);
  }, [questionOptions, questionAnswer]);

  //=Course=
  const [course, setCourse] = useState([]);
  const getCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/course/courseById/${userInfo._id}`,
        { method: "GET" }
      );
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourse();
  }, [userInfo._id]);

  const dispatch = useDispatch();
  const coursse = course.find((p) => p._id === details);
  const gettest = async () => {
    try {    if (!coursse) return; // check if coursse is null or undefined

      const response = await fetch(

        `http://localhost:5000/course/getTest/${coursse._id}`,
        { method: "GET" }
      );
      const data = await response.json();
console.log(data);
      setTest(data);
      console.log("////////////// test fi west el function ")
      console.log(test);
    } catch (error) {
      console.error(error);
    }
  };
 
  
  console.log(coursse);
  console.log(test);


  const handlePrevStep = () => {
    if (step === 4) {
      setStep(1);
    } else if (step === 3) {
      setStep(1);
      if (step === 5) setStep(1);
    } else setStep((prevStep) => prevStep - 1);
  };
  //Fonction Onclick taa el next step

  const handleNextStep = () => {
    if (step === 4) {
      setStep(5);
    } else if (step === 3) {
      setStep(5);
    } else setStep((prevStep) => prevStep + 1);
  };
  const submitNew = async (e) => {
    e.preventDefault();
    setContentLesson("");
    setDescriptionLesson("");
    setTitleLesson("");
    setTypeLesson("");
    setCreate(true);
  };
  const submitHandlerCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleCourse", titleCourse);
    formData.append("descriptionCourse", descriptionCourse);
    formData.append("category", category);
    formData.append("thumbnailCourse", thumbnailCourse);
    formData.append("coach", userInfo._id);
    try {
      console.log("awel" + thumbnailCourse);
      dispatch({
        type: COURSE_ADD_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/course/createcourse",

        formData
      );
      console.log(JSON.stringify(data));

      // define course_id and set it to the _id of the newly created course
      dispatch({
        type: COURSE_ADD_SUCCESS,
        payload: data,
      });
      setcourse_id(data.course._id);
      // define course_id and set it to the _id of the newly created course
    } catch (error) {
      console.error(error);
    }
  };


  const addlesson = () => {
    setStep(2);
    console.log("step dekhel" + step);
  };
  console.log("step lbara" + step);
  const submitHandlerLesson = async (e) => {
    e.preventDefault();
    dispatch(
      addLesson({
        titleLesson,
        descriptionLesson,
        contentLesson,
        typeLesson,
        course: course_id,
      })
    );
    setCreate(false);
  };
  const submitHandlerTest = async (e) => {
    e.preventDefault();
    dispatch(
      addTest({
        questions,
        course: coursse,
      })
    );
  };

  const submitHandlerLessonadd = async (e) => {
    e.preventDefault();
    dispatch(
      addLesson({
        titleLesson,
        descriptionLesson,
        contentLesson,
        typeLesson,
        course: details,
      })
    );
    setCreate(false);
  };

  const handleCreateClick = () => {
    setShowCreate(true);
    setShowList(false);
    setShowDetail(false);
    setShowTestAdd(false);

    setAdd(false);
  };

  const handleListClick = () => {
    setShowCreate(false);
    setShowList(true);
    setShowDetail(false);
    setAdd(false);
    setShowTestAdd(false);

    handleRefresh();
  };

  const handleRefresh = () => {
    setTimeout(() => {
      dispatch(getCourse());
    }, 1000);
    console.log("after 1 second"); // Refresh after 1 seconds (adjust the number as needed)
  };
  //console.log(course?.lessons?.titleLesson)
  console.log(lessonQty);

  const updateCourses = (id) => {
    let path = `/updatecourses/${id}`;
    navigate(path);
  };
  const updateLesson = (id, idCourse) => {
    let path = `/updatelessons/${idCourse}/${id}`;
    navigate(path);
  };
  useEffect(() => {
    gettest();
    console.log("////////////////");

    console.log(test.existingTest );

  }, [details]);
  return (
    <>
      <body className="coach">
        <main align="center" className="mp_maincoach">
          <div style={{ marginTop: "500px" }}>
            <div className="mp_sidebar">
              <div className="sidebar_logo">
                <img src={process.env.PUBLIC_URL + "/images/logo.png"} />
              </div>

              <div className="sidebar_menu">
                <lord-icon
                  src="https://cdn.lordicon.com/slduhdil.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  onClick={handleListClick}
                />
                <lord-icon
                  src="https://cdn.lordicon.com/mrdiiocb.json"
                  trigger="hover"
                  colors="primary:#ffffff"
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
              {loading && <Loader style={{ marginLeft: "600px" }} />}
              <div
                id="create"
                className={`create ${showCreate ? "show" : "hide"} ${
                  showCreate ? " library_trending_coach_create" : ""
                }`}
              >
                <div style={{ marginLeft: "300px" }}>
                  {" "}
                  <ArrowWrapperLeft
                    onClick={handlePrevStep}
                    disabled={step === 1}
                  />
                </div>
                <div style={{ marginLeft: "500px" }}>
                  <ArrowWrapperRight onClick={handleNextStep} />
                </div>
                <h3 align="center" className="library_trending_title">
                  Add A Course In three Simple Steps!
                </h3>
                {step === 1 && (
                  <>
                    <h3 align="center" className="library_trending_title">
                      Step 1 : Course description{" "}
                    </h3>
                    <input
                      type="text"
                      placeholder="Course name"
                      id="Cname"
                      value={titleCourse}
                      onChange={(e) => setTitleCourse(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      placeholder=" Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>

                    <input
                      type="text"
                      placeholder="What is this course about?"
                      value={descriptionCourse}
                      onChange={(e) => setDescriptionCourse(e.target.value)}
                    ></input>
                    <input
                      type="file"
                      name="thumbnailCourse"
                      onChange={(e) => setThumbnailCourse(e.target.files[0])}
                    ></input>
                    <SpecialButton
                      name="Create"
                      onClick={submitHandlerCourse}
                      type="submit"
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    {loading && <Loader style={{ marginLeft: "600px" }} />}
                    <h3 align="center" className="library_trending_title">
                      Step 2 : Add A lesson !{" "}
                    </h3>
                    <input
                      type="text"
                      placeholder="Lesson name"
                      id="Lname"
                      value={titleLesson}
                      onChange={(e) => setTitleLesson(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      placeholder=" Lesson type"
                      value={typeLesson}
                      onChange={(e) => setTypeLesson(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      placeholder="Content"
                      value={contentLesson}
                      onChange={(e) => setContentLesson(e.target.value)}
                    ></input>
                    {/* <Editor
      editorState={contentLesson}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleContentLessonChange}
    /> */}
                    <input
                      type="text"
                      placeholder="What is this course about?"
                      value={descriptionLesson}
                      onChange={(e) => setDescriptionLesson(e.target.value)}
                    ></input>
                    {create ? (
                      <SpecialButton
                        name="Create"
                        onClick={submitHandlerLesson}
                        type="submit"
                      />
                    ) : (
                      <SpecialButton
                        name="Add another one"
                        onClick={submitNew}
                        type="submit"
                      />
                    )}{" "}
                  </>
                )}
              </div>
            </div>
            <hr />{" "}
            <div
              id="list"
              style={{ marginLeft: "100px" }}
              className={`create ${showList ? "show" : "hide"} ${
                showList ? "library_trending" : ""
              }`}
            >
            
                        <h3 className="library_trending_title">Your Courses</h3>

              <table>
                {course &&
                  course.map((i, index) => {
                    return (
                      <tr key={i._id}>
                        <td>
                          <p>{index + 1}</p>
                        </td>
                        <td>
                          <img
                            style={{ width: "70px", height: "auto" }}
                            src={`${process.env.PUBLIC_URL}/images/${i.thumbnailCourse}`}
                            alt="My Image"
                            className="song_cover"
                          />
                        </td>
                        <td className="song">
                          <Link
                            onClick={() => (
                              setDetails(i._id),
                              setShowDetail(true),
                              setShowCreate(false),
                              setShowList(false)
                            )}
                          >
                            <h4>{i.titleCourse}</h4>{" "}
                          </Link>
                          <p> {i.descriptionCourse}</p>
                        </td>
                        <td>
                          <p>{i.category}</p>
                        </td>
                        <td>
                          <p>{i.DateCourse}</p>
                        </td>

                        <td>
                          <lord-icon
                            src="https://cdn.lordicon.com/jmkrnisz.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            onClick={() => {
                              Swal.fire({
                                title: "Do you want to Delete this Course?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Delete",
                                denyButtonText: `Don't Delete`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteHandler(i._id);
                                  handleRefresh();
                                  Swal.fire("Course Deleted!", "", "success");
                                } else if (result.isDenied) {
                                  Swal.fire(
                                    "Course is not Deleted",
                                    "",
                                    "info"
                                  );
                                }
                              });
                            }}
                          ></lord-icon>
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="xl"
                            onClick={() => updateCourses(i._id)}
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
            <div
              style={{ marginLeft: "100px" }}
              id="listDetail"
              className={`create ${showDetail ? "show" : "hide"} ${
                showDetail ? "library_trending" : ""
              }`}
            >
              <h3 className="library_trending_title">
                Lessons{" "}
                <lord-icon
                  src="https://cdn.lordicon.com/mrdiiocb.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  onClick={() => (setAdd(true), setShowDetail(false))}
                />{" "}
                
              </h3>

              <table>
                {coursse &&
                  coursse.lessons.map((i, index) => {
                    return (
                      <tr key={i._id}>
                        <td>
                          <p>{index + 1}</p>
                        </td>

                        <td className="song">
                          <h4>{i.titleLesson}</h4>
                          <p> {i.descriptionLesson}</p>
                        </td>
                        <td>
                          <p>{i.typeLesson}</p>
                        </td>
                        <td>
                          <p>{i.DateCourse}</p>
                        </td>

                        <td>
                          <lord-icon
                            src="https://cdn.lordicon.com/jmkrnisz.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            onClick={() => {
                              Swal.fire({
                                title: "Do you want to Delete this Product?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Save",
                                denyButtonText: `Don't save`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  lessondeleteHandler(coursse._id, i._id); // Pass i._id as an argument
                                  handleRefresh();
                                  Swal.fire("Product Deleted!", "", "success");
                                } else if (result.isDenied) {
                                  Swal.fire(
                                    "Product is not Deleted",
                                    "",
                                    "info"
                                  );
                                }
                              });
                            }}
                          ></lord-icon>
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="xl"
                            onClick={() =>
                              updateLesson(
                                i._id,
                                coursse._id,
                                setLesson_id(index)
                              )
                            }
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
                   </table> 
                   <h3 className="library_trending_title">
                The Test : Questions <lord-icon
                  src="https://cdn.lordicon.com/mrdiiocb.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  onClick={() => (
                    setShowTestAdd(true), setAdd(false), setShowDetail(false)
                  )}
                />
                 <lord-icon
                            src="https://cdn.lordicon.com/jmkrnisz.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            onClick={() => {
                              Swal.fire({
                                title: "Do you want to Delete this Test?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                                denyButtonText: `Cancel`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                 TestdeleteHandler(test.existingTest._id); // Pass i._id as an argument
                                  handleRefresh();
                                  Swal.fire("Test Deleted!", "", "success");
                                } else if (result.isDenied) {
                                  Swal.fire(
                                    "Product is not Deleted",
                                    "",
                                    "info"
                                  );
                                }
                              });
                            }}
                          ></lord-icon>
                
                </h3>
                             <table>
            {test.existingTest && test.existingTest.questions.map((question,i) => (
  <tr key={question._id}>
     <td>
                          <p>{i+ 1}</p>
                        </td>
    <td> Question {i+ 1}: {question.text}</td>
    <td>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}> Possible Options: {option}</li>
        ))}
      </ul>
    </td>
    <td>Answer: {question.answer}</td>
  </tr>
))}
             </table>
            </div>
           
            {console.log("enaaaaaa" + showDetail)}
          </div>{" "}
          <div
            id="lists"
            style={{ marginLeft: "100px" }}
            className={`create ${add ? "show" : "hide"} ${
              add ? "library_trending" : ""
            }`}
          >
            <h3 align="center" className="library_trending_title">
              {" "}
              Add A lesson{" "}
            </h3>

            <input
              type="text"
              placeholder="Lesson name"
              id="Lname"
              value={titleLesson}
              onChange={(e) => setTitleLesson(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder=" Lesson type"
              value={typeLesson}
              onChange={(e) => setTypeLesson(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Content"
              value={contentLesson}
              onChange={(e) => setContentLesson(e.target.value)}
            ></input>

            <input
              type="text"
              placeholder="What is this course about?"
              value={descriptionLesson}
              onChange={(e) => setDescriptionLesson(e.target.value)}
            ></input>

            {create ? (
              <SpecialButton
                name="Create"
                onClick={submitHandlerLessonadd}
                type="submit"
              />
            ) : (
              <SpecialButton
                name="Add another one"
                onClick={submitNew}
                type="submit"
              />
            )}
          </div>
          {/* test ajout  */}
          <div
            id="lists"
            style={{ marginLeft: "100px" }}
            className={`create ${showTestAdd ? "show" : "hide"} ${
              showTestAdd ? "library_trending" : ""
            }`}
          > <ToastContainer/>
            {error && toast.error("There is already a test for this course")}
            {messageSuccess && (
              toast.success("Test added!")
            )}

            {loading && <Loader />}
            <h3 className="library_trending_title">Test </h3> 
            {questions &&
              questions.map((question, index) => (
                <div key={index}>
                  <label> Question : {question.text}</label>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>
                        {" "}
                        Option {index + 1}: {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            <input
              type="text"
              placeholder="the question Exp: What is lye? "

              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Three options separated each by a comma "

              value={questionOptions}
              onChange={(e) => setQuestionOptions(e.target.value)}
            /> <p
            id="options" style={{color: "white"}}
            className={questionOptions && !validOptions ? "none" : "hide"}
          >
            Enter 3 options separated by a comma{" "}
          </p>
            <input
              type="text"
              value={questionAnswer}
              placeholder="the answer  "
              onChange={(e) => setQuestionAnswer(e.target.value)}
            /><p
            id="answers" style={{color: "white"}}
            className={questionAnswer && !validAnswer? "none" : "hide"}
          >
           the answer needs to be one of the options{" "}
          </p>
            <button type="submit" onClick={(e) => handleAddQuestion(e)}>
              Add Question
            </button>
            <button type="submit" onClick={(e) => submitHandlerTest(e)}>
              Submit Test
            </button>
          </div>
        </main>{" "}
      </body>
    </>
  );
}
export default CoachDashboard;
