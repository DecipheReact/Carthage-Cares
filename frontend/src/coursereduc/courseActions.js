import axios from "axios";
import { useState } from "react";

import { COURSE_ADD_FAIL, COURSE_ADD_REQUEST, COURSE_ADD_SUCCESS, COURSE_GET_SUCCESS, DELETE_COURSE_FAIL, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS, DELETE_LESSON_FAIL, DELETE_LESSON_REQUEST, DELETE_LESSON_SUCCESS, DELETE_TEST_FAIL, DELETE_TEST_REQUEST, DELETE_TEST_SUCCESS ,ENROLL_ADD_REQUEST,ENROLL_ADD_SUCCESS,LESSON_ADD_REQUEST, LESSON_ADD_SUCCESS, SET_COURSE_ID, TEST_ADD_FAIL, TEST_ADD_REQUEST, TEST_ADD_SUCCESS, UPDATE_COURSE_FAIL, UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS, UPDATE_LESSON_REQUEST } from "./courseConstants";


export const addCourse = ({ titleCourse ,
    descriptionCourse , 
    category ,thumbnailCourse,
    coach,course_id }) => async (dispatch)=>{

          dispatch({
              type:COURSE_ADD_REQUEST
          })
          const config = {
              headers:{
                  'Content-Type' : 'multipart/form-data'
              }
          }
  
          const { data } = await axios.post(
              'http://localhost:5000/course/createcourse',
              { titleCourse ,
                descriptionCourse , 
                category ,thumbnailCourse,
                coach },
              config
            );
  
          dispatch({
              type : COURSE_ADD_SUCCESS,
              payload : data
          })        
          return data._id=course_id;

          // localStorage.setItem('userInfo', JSON.stringify(data))
  
         
      }
    
  
export const addLesson = ({ titleLesson,
    descriptionLesson,
     contentLesson,typeLesson,course}) => async (dispatch)=>{
    
          dispatch({
              type:LESSON_ADD_REQUEST
          })
          const config = {
              headers:{
                  'Content-Type' : 'application/json'
              }
          }
  
          const { data } = await axios.post(
              'http://localhost:5000/course/createlesson',
              { titleLesson,
                descriptionLesson,
                 contentLesson,typeLesson,course},
              config
            );
  
          dispatch({
              type : LESSON_ADD_SUCCESS,
              payload : data
          }) ;
       
         // localStorage.setItem('userInfo', JSON.stringify(data))
  
         
      }
      export const addTest = ({course,questions}) => async (dispatch)=>{
        try {
              dispatch({
                  type:TEST_ADD_REQUEST
              })
              const config = {
                  headers:{
                      'Content-Type' : 'application/json'
                  }
              }
      
              const { data } = await axios.post(
                  'http://localhost:5000/course/createTest',
                  { course,questions},
                  config
                );
      
              dispatch({
                  type : TEST_ADD_SUCCESS,
                  payload : data
              })  }
              catch(error){
                if (error.response && error.response.data.message === 'A test already exists for this course') {
                    dispatch({
                        type: TEST_ADD_FAIL,
                        payload: error.response.data.message
                    });
                } else {
                dispatch({
                    type: TEST_ADD_FAIL,
                    payload: error.response && error.response.data.message
                        ? error.response.data.data.message
                        : error.message
                });}
            
            console.log(error.response.data.message);
        }}
    

      export const updateCourse = ({ titleCourse, descriptionCourse, category, coach, thumbnailCourse, id }) => async (dispatch) => {
        try {
          dispatch({
            type: UPDATE_COURSE_REQUEST
          })
      
          const formData = new FormData()
          formData.append('thumbnailCourse', thumbnailCourse)
          formData.append('titleCourse', titleCourse)
          formData.append('descriptionCourse', descriptionCourse)
          formData.append('category', category)
          formData.append('coach', coach)
      
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      
          const { data: { updatedCourse } } = await axios.put(`http://localhost:5000/course/updateCourse/${id}`, formData, config)
      
          dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: updatedCourse
          })
        } catch (error) {
          dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: error.response && error.response.data.message
              ? error.response.data.data.message
              : error.message
          })
      
          console.log(error.response.data.message)
        }
      }
      
      
      
      export const updateLesson = ({id,lessonId,titleLesson, descriptionLesson,contentLesson,typeLesson}) => async (dispatch)=>{
        try {
              dispatch({
                  type:UPDATE_LESSON_REQUEST
              })
              const config = {
                  headers:{
                      'Content-Type' : 'application/json'
                  }
              }
      
              const { data } = await axios.put(
                `http://localhost:5000/course/updateLesson/${id}/${lessonId}`,
                  {titleLesson, descriptionLesson,contentLesson,typeLesson},
                  config
                );
      
              dispatch({
                  type : UPDATE_COURSE_SUCCESS,
                  payload : data
              })
           
      
             } catch(error){

            
            console.log(error);
        }
      }
      
  

    
      export const getCourses = () => async (dispatch) => {
        try {
          const response = await fetch('http://localhost:5000/course/getCourses', {
            method: 'GET',
            headers: {
              accept: 'multipart/form-data',
            },
          });
      
          const data = await response.json();
          dispatch({ type: COURSE_GET_SUCCESS, payload: data });
        } catch (error) {
          console.log(error);
        }
      };
     
  export const deleteCourse = (id) => async (dispatch)=>{
    try {
        dispatch({
            type:DELETE_COURSE_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.delete(
            `http://localhost:5000/course/delete/${id}`,
            config
        )
  
        dispatch({
            type : DELETE_COURSE_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: DELETE_COURSE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }
  export const deleteLesson = (idCourse,idLesson) => async (dispatch)=>{
    try {
        dispatch({
            type:DELETE_LESSON_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.delete(
            `http://localhost:5000/course/deleteLesson/${idCourse}/${idLesson}`,
            config
        )
  
        dispatch({
            type : DELETE_LESSON_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: DELETE_LESSON_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }


  export const deleteTest = (id) => async (dispatch)=>{
    try {
        dispatch({
            type:DELETE_TEST_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.delete(
            `http://localhost:5000/course/deleteTest/${id}`,
            config
        )
  
        dispatch({
            type : DELETE_TEST_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: DELETE_TEST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }
  export const addEnroll = ({ learner, course ,completionStatus}) => async (dispatch)=>{
    
    dispatch({
        type:ENROLL_ADD_REQUEST
    })
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }

    const { data } = await axios.post(
        'http://localhost:5000/course/createnroll',
        { learner, course ,completionStatus},
        config
      );

    dispatch({
        type : ENROLL_ADD_SUCCESS,
        payload : data
    }) ;
 
   // localStorage.setItem('userInfo', JSON.stringify(data))

   
}






