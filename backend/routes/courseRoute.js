
const express = require('express');

const { DisplayLesson, createCourse,createLesson,deleteCourse,updateCourse,
  SearchCourse,getCourseById,getCoursesById,getCoursesByIds, updateLesson,
  getLessonById,deleteLesson,deleteLessonFromCourse,GetLessons,createTest,createEnroll,DisplayEnrollment,deleteTest, updateCompletionStatus, countEnroll, countCompletedEnrollments, countinProgressEnrollments, countNotStartedEnrollments, popularCategory} = require('../Controllers/courseController');



const path = require("path")
const { v4 : uuid4 } = require('uuid');
const multer = require('multer')

const router = express.Router()

 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/public/images')); // use absolute path for uploaded files
  },
    filename: function(req, file, cb) {
      cb(null, uuid4()+ '-' + Date.now() + path.extname(file.originalname)); // specify the file name
    }
  });
  
  const fileFilter = (req,file,cb) =>{
    const allowedFileTypes = ['image/jpeg' , 'image/jpg' , 'image/png'];
    if(allowedFileTypes.includes(file.mimetype))
    {
        cb(null,true);
    } else {
        cb(null, false);
    }
  }
  // Create a new Multer upload instance
  let upload = multer({ storage, fileFilter});
  router.post('/createcourse',upload.single('thumbnailCourse'),createCourse),
router.get('/getCourses',DisplayLesson),
router.get('/getEnroll',DisplayEnrollment),
router.get('/getPopularCat',popularCategory),

router.post('/createlesson',createLesson),
router.post('/createnroll',createEnroll),
router.post('/createTest',createTest),
router.delete('/delete/:id' ,deleteCourse),
router.delete('/deleteTest/:id' ,deleteTest),
router.delete('/deleteLesson/:courseId/:lessonId' ,deleteLessonFromCourse),
router.put('/updateCourse/:id' ,upload.single('thumbnailCourse'),updateCourse),
router.put('/updateLesson/:courseId/:lessonId' ,updateLesson),
router.get('/search/:key',SearchCourse),
router.get('/:id',getCourseById),
router.get('/lesson/:id',getLessonById),
router.get('/lesson/:courseId/:lessonId',getLessonById),
router.get('/courseById/:userId',getCoursesById),
router.get('/courseByIds/:id',getCoursesByIds),
router.get('/:id/lessons',GetLessons)
router.get('/getTest/:course',findTestByCourse),
router.put('/updatestatus/:enrollment/:status',updateCompletionStatus),
router.get('/countCompletedEnrollments/:course',countCompletedEnrollments),
router.get('/countInProgressEnrollments/:course',countinProgressEnrollments),
router.get('/countNotStartedEnrollments/:course',countNotStartedEnrollments),
router.get('/countEnroll/:course',countEnroll),




module.exports = router
