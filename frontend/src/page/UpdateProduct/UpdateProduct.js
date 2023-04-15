import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { productByID, productUpdate } from '../../productredux/productaction';
import SpecialButton from "../../Components/Button/button";
import { useNavigate } from 'react-router-dom';
import "../UserDashboard/UserDashboard.css";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo } = userLogin

   const navigate = useNavigate();


  const [description, setDescription]=useState("")
  const [price,setPrice]=useState(0)
  const [category,setCategory]=useState("")
  const [countInStock,setCountInStock]=useState(0);
    const [productName, setProductName] = useState('');
    const [imageProduct,setImageProduct]=useState("");
 const [successUpdateLink, setSuccessUpdateLink] = useState(false);

    const [showCreate, setShowCreate] = useState(false);

  const dispatch = useDispatch();
  //const { productById } = useSelector((state) => state.productById);
  //const {productInfo} =productById

  

const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate) || {};
  
const handleBackClick = () => {
  navigate(`/userdashboard`);
};
  
const [prod, setPRod] = useState(null);
useEffect(() => {
    axios.get(`http://localhost:5000/product/productByIdProduct/${id}`).then((response) => {
    setPRod(response.data);
});
}, [id]);

console.log(prod);

  const submitHandler=async(e)=>{
     e.preventDefault();



      dispatch(
        productUpdate(
         { id, 
          productName,
          price,
          description,
          category,
          countInStock,
          imageProduct
         }
        )
      );
setSuccessUpdateLink(true);
   


};
if (successUpdateLink) {
  navigate('/userdashboard')
}
            
            const handleCreateClick = () => {
              setShowCreate(true);
            };
          
            const handleListClick = () => {
              setShowCreate(false);
              navigate('/userdashboard')
            };



    return(
          
                  <><body className="yoo">
                  <main className="mp_main">
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
            {/* <img onClick={handleListClick} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABEElEQVRIie2TMUqDQRCF34T8hdgELYVYpdAmnY05QTyCpLHzBJZioTdIo50B7YWkUSzVIs1/nghfCkdYAstOfkkh+mCbnXnvzczOSn8KwAgYbULYgHOg9nMBtCJcC4hXkq4knUha+HUlaSrp0swWOW4RwBYw9qrfgWPgCHjzuztgu6l4B5i40CtwkMR6wLPHHoHddcX3gCcXmALdQs4M2I+K94AXJz4AO4Uu75MuD0vi6XxvI/NdeacPYJBLHALzZBXbJfGE2054c2D4HWt5wqmka32tnyTJzD6jBiu5laQb4CxXTQ3UUfESLzSGnKGZ9Uvc0Hf/CdYyMLN+pOrGBk3w+w2yWxRZ1UjOxjv4RxFLW3QYbNPY/+0AAAAASUVORK5CYII=" /> */}

      {/* <img onClick={handleCreateClick} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAQElEQVRIiWNgGAXUBIcPHz5y+PDhI6ToYaKVY0YtGLWAeoARmUNqGscFbG1tbWBsmvuAJDCak0ctGKYWjAKCAAB8yhBUbF/pJwAAAABJRU5ErkJggg==" /> */}
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
                >     <h3 className="library_trending_title">EDIT YOUR PRODUCT </h3>
                {loadingUpdate && <div style={{backgroundColor: 'yellow', padding: '10px', borderRadius: '5px'}}>Loading...</div>}
{errorUpdate && <div style={{backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px'}}> Please add all fields </div>}
{successUpdate && <div style={{backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px'}}>Product updated successfully!</div>}

          
  <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , maxWidth: '600px'}}>


              {/* Name */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' , marginTop: '1rem'}}>
          <label htmlFor="name" style={{ marginLeft: '4rem',width: '120px',
                                 fontWeight: 'bold', color: 'white', fontSize: '1.2rem'  }}>
            Name
          </label>
          <input
          type="text"
          id="name"
          defaultValue={prod?.productName}
          placeholder='Enter product name...'
                    onChange={(e) => setProductName(e.target.value)}

                    style={{ padding: '1rem',marginLeft: '3rem', borderRadius: '5px', border: '1px solid white', width: '500px', 
                    backgroundColor: 'transparent',marginBottom: '0.5rem', fontSize: '1rem' }}
        />


        </div>

              {/* Category */}
          <div style={{ display: 'flex',  alignItems: 'center',marginBottom: '1rem' }}>
            <label htmlFor="category" style={{marginLeft: '4rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'white'
          , fontSize: '1.2rem'  }}>Category</label>
            <input
              type="text"
              id="category"
              defaultValue={prod?.category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Enter  product category...'
              style={{ padding: '1rem',marginLeft: '5rem', borderRadius: '5px', border: '1px solid white', width: '500px', 
                backgroundColor: 'transparent',marginBottom: '0.5rem', fontSize: '1rem' }}
            />
          </div>

              {/* description */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

            <label htmlFor="description" 
                  style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: 'white',marginLeft: '4rem', fontSize: '1.2rem' }}>
              Description
            </label>

            <textarea
              id="description"
              placeholder='Enter product description...'
                  defaultValue={prod?.description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: '1rem',marginLeft: '3.7rem', borderRadius: '5px', border: '1px solid white', width: '500px',
              height: '100px', resize: 'none', marginBottom: '0.5rem', fontSize: '1rem', backgroundColor: 'transparent', }}
            />
          </div>

              {/* count in Stock */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <label htmlFor="countInStock"
                  style={{marginLeft: '4rem', marginBottom: '0.5rem', fontWeight: 'bold', color: 'white' , fontSize: '1.2rem' }}>
              Stock
            </label>
            <input
              type="number"
              id="countInStock"
              defaultValue={prod?.countInStock}
              placeholder='Enter product sotck...'
              onChange={(e) => setCountInStock(e.target.value)}
              style={{ padding: '1rem',marginLeft: '7.2rem', borderRadius: '5px', backgroundColor: 'transparent',
                  border: '1px solid white',
                          width: '500px', marginBottom: '0.5rem', fontSize: '1rem' }}
              />
          </div>

                          {/* price */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <label htmlFor="price" 
                  style={{marginLeft: '4rem', marginBottom: '0.5rem', fontWeight: 'bold', color:'white', fontSize: '1.2rem'  }}>
                    Price
                </label>
            <input
              type="number"
              id="price"
              defaultValue={prod?.price}
              placeholder='Enter product price...'
              onChange={(e) => setPrice(e.target.value)}
              style={{ padding: '1rem',marginLeft: '7.5rem', borderRadius: '5px', border: '1px solid white', width: '500px', 
              marginBottom: '0.5rem', fontSize:'1rem' ,   backgroundColor: 'transparent',}}
            />
          </div>
                      {/* Image */}
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <label htmlFor="Image" 
                  style={{marginLeft: '4rem', marginBottom: '0.5rem', fontWeight: 'bold', color:'white', fontSize: '1.2rem'  }}>
                    Image
                </label>
            <input
              id="Image"
              name="imageProduct" 
              type="file" placeholder="Image "
              onChange={(e) => setImageProduct(e.target.files[0])}
              style={{ padding: '1rem',marginLeft: '7rem', borderRadius: '5px', border: '1px solid white', width: '500px', 
              marginBottom: '0.5rem', fontSize:'1rem' ,   backgroundColor: 'transparent',}}
            />
          </div>

                        {/* //buttons */}

                        
          <div style={{ display: 'flex',justifyContent: 'space-between', width: '100%' , marginLeft:'17rem'}}>
           
            <SpecialButton name="SAVE" onClick={submitHandler} type="submit" style={{ marginRight: '1rem' }}/>
            <SpecialButton name="BACK TO LIST" onClick={handleBackClick} type="submit" style={{ backgroundColor: 'gray', color: 'white' }}/>
        </div>
   


        </form>

           </div>
          
            </div>
            
                <hr />
                </div>
          </main> </body>
                  </>
              );


              }


export default UpdateProduct;
