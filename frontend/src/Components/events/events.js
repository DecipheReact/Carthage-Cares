import "./events.css"
import Event from "../event/event";

function Events()
{
    return( <html className="eventbackground">
        <body>
            <h1 className="SectionTitle">EVENTS HAPPENING NEAR YOU</h1>
            <p className="paragraph2">events happening this time around</p>
        <div className="site__wrapper">
        <Event />
        <Event />
        <Event />

        
        </div> </body>
    </html>

    )
}
export default Events;