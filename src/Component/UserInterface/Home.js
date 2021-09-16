import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Button,Divider } from '@material-ui/core'
import { getData, ServerURL } from "../FetchNodeServices";
import ProductComponent from "./ProductComponent";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
   
}));

export default function Home(props) {
    const classes = useStyles();
        const [list,setList] = useState([])
        const [products,setProducts] = useState([])

   const fetchAllMainPage = async () => {
    var result = await getData("mainpage/fetchallmainpage");
    setList(result.data);
  };

  const fetchAllProducts = async () => {
    var result = await getData("product/fetchallproducts");
    setProducts(result.data);
  };

  const handleClick = () => {
      //if(event.target.value ){
        return products.map((product) =>{
          return(
            <div>
            {product.status == "New Arrivals"?
            <ProductComponent product={product}/>:null
            }
            </div>
          )
        })
     // }
  }

 

  const displayMainPageImage = () => {
    return list.map((item) => {
      return (
       <div>
           {item.position==1?<div><div><img src={`${ServerURL}/images/${item.picture}`} width="100%"/>
           <div style={{position:'absolute',top:265,left:780,right: '8%',bottom: '40%',lineHeight:1.2,color:'#404040',display:'block',textAlign:"center"}}>
                <div style={{fontSize:30}}>Stylish Eyewear That<br/>
                <span style={{fontSize:30}}>Is Premium, Not Expensive!</span>
                </div>
                
                <div >
                <div style={{listStyle:'none'}}>
                  <li style={{listStyle:'none',display: 'block',background: '#50526e',color: '#fff',padding: 10,textAlign: 'center',marginTop: 15,fontFamily: 'Helvetica', fontSize: 20,letterSpacing: 1,cursor: 'pointer'}}>
                      Shop Eyeglasses
                  </li>
                  <li style={{listStyle:'none',display: 'block',background: '#50526e',color: '#fff',padding: 10,textAlign: 'center',marginTop: 5,fontFamily: 'Helvetica', fontSize: 20,letterSpacing: 1,cursor: 'pointer'}}>
                      Shop Sunglasses
                  </li>
                </div>
                <div>
                  <a style={{color: '#50526e',fontWeight: 700,marginTop: 15,fontFamily: 'Helvetica',fontSize: 20,display: 'block'}}>
                    Take our style quiz
                    <span style={{display: 'inline-block',verticalAlign: 'middle',width: '12%'}}>
                      <img src="https://cdn.shopify.com/s/files/1/1276/5299/files/Untitled-1_1.png?v=1616576831" alt="take our style"/>
                    </span></a>
                </div>
                </div>
           </div>
                     </div>
           <div style={{textAlign:'center'}}>
               <h1 style={{fontSize:45,letterSpacing:1}}>New This Week!</h1>
               <p style={{color: '#9a9a9a',
                          fontSize: 20,
                          letterSpacing: 1,
                          fontFamily:'Montserrat',
                          fontWeight:'bold',
                          paddingLeft:20,
                          paddingRight:20,
                          lineHeight:2,}}
               >This summer, we’re bringing back the cat-eye trend with a colourful twist! Transform your look with these trendy tinted tonics in fresh colour options!</p>
           </div>
           </div>:
                <div style={{padding:10}}>
                <div>
                  {item.position==3?<div style={{padding:20}}><img src={`${ServerURL}/images/${item.picture}`} width="100%"/>
                    <div style={{textAlign:'center'}}>
                      <h1>Our Recommendations</h1>
                      <div  style={{
                                    marginTop: 30,
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    
                                  }}>
                      <Button style={{textTransform: "capitalize",fontSize:20}} onClick={()=>handleClick()} >New Arrivals</Button>
                      <Button style={{textTransform: "capitalize",fontSize:20}} onClick={()=>handleClick()} >Best Sellers</Button>
                      </div>
                      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                      {handleClick()}
                      </div>
                    </div>
                  </div>:<div style={{padding:20}}><img src={`${ServerURL}/images/${item.picture}`} width="100%"/></div>}
                </div>
                
                </div>}
        </div>
      );
    });
  };

  useEffect(function () {
    fetchAllMainPage();
    fetchAllProducts();
  }, []);

  return (
    <div>
      <Header history={props.history}/>
      <div style={{}}>
     {displayMainPageImage()}
      </div>
      
      <Footer history={props.history}/>
      </div>
  )
}