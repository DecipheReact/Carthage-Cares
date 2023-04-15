import Product from "../product/product"
import background from "./backgrounDd.png"
import "./products.css"
import "../section1/section1.css"
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../productredux/productaction";
function Products(){
        const dispatch = useDispatch();
        const products = useSelector((state) => state.productGetReducer.products);
        const bestProducts = products
        ?.sort((a, b) => b.rating - a.rating)
        ?.slice(0, 4);

        useEffect(() => {
                dispatch(getProducts());
              }, [dispatch ]);
              console.log("ena el products" + Array.isArray(bestProducts) );


    
     return(
        <>
        <div className="products">
<h1 align="center" className="SectionTitle-light">BEST SELLERS</h1>
            <p  align="center" className="paragraph2-light">Explore our variety of products</p> 
            <div className="listofproducts Aboutus">
                

            {Array.isArray(bestProducts) && bestProducts.map((p) => (
          <Product product={p} >

          </Product>
        ))}
</div>
        </div> 
        </>
     )
}
export default Products;