import { useState, useEffect } from "react";
import axios from "axios";
import { VictoryPie } from "victory";
import { useDispatch, useSelector } from "react-redux";

const CoursesChart = () => {
  const [notStartedCount, setNotStartedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [course, setCourse] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  const countNotStartedEnrollments = async (courseId) => {
    try {
      const res = await axios.get(`/enrollment/countNotStartedEnrollments/${courseId}`);
      return res.data.count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  const countInProgressEnrollments = async (courseId) => {
    try {
      const res = await axios.get(`/enrollment/countInProgressEnrollments/${courseId}`);
      return res.data.count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  const countCompletedEnrollments = async (courseId) => {
    try {
      const res = await axios.get(`/enrollment/countCompletedEnrollments/${courseId}`);
      return res.data.count;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const notStarted = await countNotStartedEnrollments(course._id);
      const inProgress = await countInProgressEnrollments(course._id);
      const completed = await countCompletedEnrollments(course._id);
      setNotStartedCount(notStarted);
      setInProgressCount(inProgress);
      setCompletedCount(completed);
    }
    fetchData();
  }, [course]);

  return (
    <div>
      {course.map((i,index) => {
        return (
          <div key={i._id}>
            <h2>{i.title}</h2>
            <VictoryPie
              data={[
                { x: "Not started", y: notStartedCount },
                { x: "In progress", y: inProgressCount },
                { x: "Completed", y: completedCount },
              ]}
              colorScale={["#F44336", "#FFC107", "#4CAF50"]}
              animate={{
                duration: 2000,
                easing: "bounce",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CoursesChart;
