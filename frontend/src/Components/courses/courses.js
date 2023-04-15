import "./courses.css"
import Event from "../event/event"
import "../event/event.css"

import imageonTop from "../imageontop/Imageontop";
 function Courses() {
    return (
      <div >

        <div className="coursebg container-fluid  py-4 mb-4">
          <div className="container py-2">
            <div className="row row-cols-auto mb-3 g-3">
              <div className="col">
                <span className="badge bg-dark rounded-pill border border-warning text-warning me-1">HANDMADE </span>
              </div>
              <div className="col">
                <span className="badge bg-dark rounded-pill border border-warning text-warning me-1">COURSE</span>
              </div>
              <div className="col">
                <span className="badge bg-dark rounded-pill border border-warning text-warning me-1">CLAY MAKING </span>
              </div>
            </div>
            <div className="mb-2">
              <h2 className="mb-1">CLAY MAKING</h2>
              <div className="row row-cols-auto text-muted">
                <div className="col">
                  <i className="zmdi zmdi-calendar me-1" />
                  <span className="detailcolor">45 weeks</span>
                </div>
                <div className="col">
                  <i className="zmdi zmdi-collection-text me-1" />
                  <span className="detailcolor" >120 lessons</span>
                </div>
                <div className="col">
                  <i className="zmdi zmdi-account-o me-1" />
                  <span className="detailcolor" >40 Enrollments</span>
                </div>
              </div>
            </div>
            <p className="mb-3">The Japanese-Language Proficiency Test, or JLPT, is a standardized criterion-referenced test to evaluate and certify Japanese language proficiency for non-native speakers, covering language knowledge, reading ability, and listening ability...</p>
            <div className="progress mb-3">
              <div className="progress-bar bg-warning" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>60%</div>
            </div>
            <div className>
              <button className="btn btn-sm btn-warning me-1">Continue</button>
              <button className="btn btn-sm btn-secondary me-1">Review</button>
              <button className="btn btn-sm btn-secondary me-1">Notes</button>
            </div>
          </div>
        </div>
        <html align="center" className="eventbackground">
        <body >
            <h1 className="SectionTitle">OTHER COURSES THAT MAY INTEREST YOU</h1>
        <div className="site__wrapper">
        <Event/>
        <Event />
        <Event />
        <Event/>
        <Event />
        <Event />

        
        </div> </body>
    </html>
    
       </div>
    );
  }

  export default Courses;