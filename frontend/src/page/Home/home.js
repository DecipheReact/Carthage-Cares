
import HeroSection from "../../Components/HeroSection/HeroSection"
import Events from '../../Components/events/events';
import Section1 from '../../Components/section1/section1';
import Partenairec from '../../Components/partenairescarousel/partenairec';
import Products from '../../Components/Products/products';
import Crowdfunding from "../../Components/crowdfunding/crowdfunding";
function Home(){



return(

<>
<HeroSection />
{/* <div align="center" className="eventbackground">
<Events/> </div> */}


     <Section1 />
     <Products/>
     <div align="center">
     <Crowdfunding /></div>
<br />

     <Partenairec />
     <br />
     </>);
}
export default Home