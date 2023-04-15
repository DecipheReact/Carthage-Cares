import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CoachDashboard.css"
import {
  VictoryChart,
  VictoryAxis,
  VictoryPie,
  VictoryStack
} from 'victory';

function TEST() {
  const [popularCourseData, setPopularCourseData] = useState([]);
  const colorScale = ['#c43a31', '#ff9933', '#669999', '#666699', '#993366', '#663399'];

  useEffect(() => {
    axios.get('http://localhost:5000/course/getPopularCat')
      .then(res => {
        const data = res.data.map(item => ({ label: item.category, value: Number(item.count) }));
        console.log(data);
        setPopularCourseData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
        <h3> Popular Course Categories</h3>
    {popularCourseData.length > 0 ? (
        
  <VictoryPie  animate={{
    easing:"bounceInOut",
    duration: 2000,
    onLoad: { duration: 1000 }
  }}
  data={popularCourseData}          colorScale={colorScale}

  x="label"
  y="value"
  labelRadius={70}
  height={400}
/>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}

export default TEST;
