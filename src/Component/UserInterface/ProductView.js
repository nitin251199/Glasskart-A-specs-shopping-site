import React, { useState, useEffect } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Button,Divider } from '@material-ui/core'
import { getData, postData, ServerURL } from "../FetchNodeServices";
import ProductComponent from "./ProductComponent";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Radio from '@material-ui/core/Radio';
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({}));

export default function ProductView(props) {
    var product = props.location.state.itemProps
    const [selected,setSelected] = useState(props.location.state.selected)
    var item = props.location.state.item
   // const [active,setActive] = useState(false)
   const [productPicture,setProductPicture] = useState([])

   const fetchAllProductPictures = async() => {
    var body = { "finalproductid":selected.finalproductid }
    var result = await postData("finalproduct/fetchallproductpictures",body)
    setProductPicture(result.data)
   }

   useEffect(function(){
       fetchAllProductPictures()
   },[])


    const classes = useStyles();

    const breadcrumbs = () => {
        return(
            <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" 
      //onClick={handleClick}
      style={{fontSize:12,letterSpacing:1}}
      >
        HOME
      </Link>
      <Link color="inherit" 
      //href="/getting-started/installation/" 
      //onClick={handleClick}
      style={{fontSize:12,letterSpacing:1}}
      >
        GLASSKART
      </Link>
      <Typography color="textPrimary" style={{fontSize:12,letterSpacing:1}}>{product.productname}</Typography>
    </Breadcrumbs>
        )
        
}

const handleChange = async(item) => {
    var {finalproductid,colorid,colorname,offerprice,price,productpicture} = item
    setSelected({finalproductid,colorid,colorname,offerprice,price,productpicture})
  }

// const handleRadioClick = () => {
//     active ? setActive(false) : setActive(true)
// }

const displayProduct = (props) => {
    return(
        <div style={{paddingInline:25}}>
        <Grid container spacing={3}>
            <Grid item xs={8}>
            <p style={{textAlign:'center'}}>Product View</p>
                <div style={{paddingTop:50,paddingBottom:50}}>
                <img src={`${ServerURL}/images/${selected.productpicture}`} width="50%"/>
                <img src="./pic2.jpg" width="50%"/>
                </div>
                <Grid item xs={12}>
                <div style={{display: 'flex',justifyContent: 'space-between',padding: 15,alignItems: 'center'}}>
                    <ul style={{listStyle: 'none',border: '1px solid #000',display: 'flex',padding: 3,borderRadius: 40,pointerEvents: 'none',left: 10}}>
                        <li style={{paddingLeft:4}}>4.6</li>
                        <li style={{paddingInline:4}}>
                            <a style={{color: '#434343'}}>★
                                </a>
                        </li>
                        <li style={{color: '#888',borderLeft: '1px solid #868686',paddingInline: 4}}>86</li>
                    </ul>
                
                <div style={{display: 'flex',justifyContent: 'space-around'}}>
                    <div style={{position: 'static'}} data-variant-id="34641931276">
                        <div style={{width: 25,height: 25,backgroundSize: '100%',backgroundImage: "url('./wishlist_heart.png')"}}>
                            </div></div></div></div>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <div style={{fontSize:20,letterSpacing:1}}>
                    {product.productname}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between',marginTop:20}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <span>{selected.colorname}</span>

                        <div style={{display: 'flex',justifyContent: 'center',flexDirection: 'row',alignItems: 'center',marginTop: 20}}>
              {item.details.map((finalitem)=>{
                return(<div>
                  <Radio
                  checked={selected.finalproductid === finalitem.finalproductid}
                  onChange={()=>handleChange(finalitem)}
                  //value="a"
                  style={{color:finalitem.colorname}}
                  name="radio-button-demo"
                  inputProps={{ 'aria-label': 'A' }}
                />
                </div>)
              })}

            </div>

                        {/* <li style={{listStyle:'none',}}>
                            <ul style={{
                                width: '100%',
                                listStyle:'none',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'start',
                                alignItems: 'center',
                                padding:0,
                                marginTop: 11
                            }}>
                                <li style={{listStyle:'none',}}>
                                    <span style={{
                                        display: 'block',
                                        padding: 2,
                                        borderRadius: '100%',
                                        border: '2px solid #666'
                                    }}>
                                        <div style={{
                                            color: "#404040",
                                            listStyle: "none",
                                            WebkitTapHighlightColor: "transparent",
                                            padding: 0,
                                            border: 0,
                                            font: "inherit",
                                            verticalAlign: "baseline",
                                            wordWrap: "break-word",
                                            boxSizing: "border-box",
                                            borderRadius: "100%",
                                            backgroundColor:'silver',
                                            width: 20,
                                            height: 20,
                                            margin: 0,
                                            display: "block",
                                            cursor: "pointer",
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                        }}>
                                        onClick={()=>handleRadioClick()}
                                            </div>
                                    </span>
                                </li>
                            <li >
                                <span style={{
                                    lineHeight: 'inherit',
                                    display: 'block',
                                    padding: 2,
                                    borderRadius: '100%',
                                    margin: 5
                                }}>
                                    <div style={{
                                        color: "#404040",
                                        listStyle: "none",
                                        WebkitTapHighlightColor: "transparent",
                                        padding: 0,
                                        border: 0,
                                        font: "inherit",
                                        verticalAlign: "baseline",
                                        wordWrap: "break-word",
                                        boxSizing: "border-box",
                                        borderRadius: "100%",
                                        width: 20,
                                        height: 20,
                                        margin: 0,
                                        display: "block",
                                        cursor: "pointer",
                                        backgroundColor:'pink',
                                        backgroundPosition: "center",
                                        backgroundSize: "contain",
                                    }}>
                                    </div>
                                </span>
                            </li>
                            </ul>
                        </li> */}
                    </div>
                    <div>
                        <div>
                        <div style={{textAlign:'start',fontSize:20}}>{selected.offerprice>0?<span style={{fontSize:18}}><s>&#8377;{selected.price}</s> &nbsp; <span style={{color:'#0984e3',fontSize:22}}>&#8377;{selected.offerprice}</span></span>:<span>&#8377;{selected.price}</span>}</div>
                        <div style={{display: 'flex',flexDirection:'row'}}>including premium<br/> anti-glare lenses
                        <div style={{
                            margin: 10,
                            width: 20,
                            height: 20,
                            textAlign: 'center',
                            borderRadius: '50%',
                            border: '1px solid #50526e',
                            cursor: 'pointer',
                            color: '#50526e'
                        }}>?
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingTop: 30,paddingBottom:50,display:'flex',transform: 'translate3d(0px, 0px, 0px)'}}>

                    {  productPicture?productPicture.map((picture)=>{
                          return (
                    <div style={{display:'inline-block',border:'1px solid #000',borderRadius:5,paddingTop:30,paddingBottom:30,margin:2}}>
                        <img src={`${ServerURL}/images/${picture.image}`} width='65px'/>
                    </div>
                          )
                    }):<></>

                    }
                </div>
                <div style={{paddingTop:0,paddingRight:50}}>
                <div style={{listStyle:'none'}}>
                  <li style={{listStyle:'none',display: 'block',background: '#50526e',color: '#fff',padding: 20,textAlign: 'center',marginTop: 5,fontFamily: 'Helvetica', fontSize: 16,letterSpacing: 1,cursor: 'pointer'}}>
                      Select Lenses
                  </li>
                  <li style={{listStyle:'none',display: 'block',background: '#FFF',color: '#000',padding: 20,textAlign: 'center',marginTop:10,fontFamily: 'Helvetica', fontSize: 16,letterSpacing: 1,cursor: 'pointer',border:'1px solid'}}>
                      <span style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                      <img src='./whatsapp.png' width="20px"/>
                      Lets Chat
                      </span>
                  </li>
                </div>   
                </div>
            </Grid>

        </Grid>
        </div>
    )
}


    return(
            <div>
      <Header history={props.history}/>
      <div style={{marginLeft:30,marginTop:30}}>
          {breadcrumbs()}
      </div>
      {displayProduct()}
      <div>
          <div style={{paddingInline:30}}>
              <img src="1.jpg" width="100%" />
          </div>
          <div style={{marginTop: 35,marginBottom: 35,}}>
               <ul style={{color: '#9a9a9a',
                           letterSpacing: 1,
                           lineHeight:1.5,
                           listStyle: 'disc',
                           fontSize: 18,
                           display: 'flex',
                           flexWrap: 'wrap',
                           justifyContent: 'center'}}
               >
                   <li style={{color:'#5f9595',marginLeft: 15,marginRight: 15}}>Best suited for powers upto -8 / +5</li>
                   <li style={{marginLeft: 15,marginRight: 15}}>Made in rich acetate from Italian powerhouse Mazzucchelli.</li>
                   <li style={{marginLeft: 15,marginRight: 15}}>Sophisticated Rounds for a classic look.</li>
                   <li style={{marginLeft: 15,marginRight: 15}}>Comes with a complimentary micro-fibre cloth and a classic JJ eyewear case.</li>
                   <li style={{marginLeft: 15,marginRight: 15}}>Alias - Rich Acetate JJ E11515 Unisex Transparent Eyeglasses</li>
               </ul>
           </div>
           <div style={{padding:20}}>
              <img src="2.jpg" width="100%" />
          </div>
          <div style={{textAlign:'center'}}>
                      <h1>Key Features</h1>
          </div>
          <div style={{display: 'flex',justifyContent:'center',flexWrap:'wrap'}}>
          <img src="3.jpg"  />
          <img src="4.jpg"  />
          <img src="5.jpg"  />
          <img src="6.jpg"  />
          <img src="7.jpg"  />
          <img src="8.jpg" width="594px" />
          </div>
          <div style={{textAlign:'center'}}>
                      <h1 style={{display: 'block',fontWeight:'bolder',fontSize: 32,color: '#404040',textAlign: 'center',margin: 17,letterSpacing: 0.5}}>Our Lenses</h1>
          </div>
          <div style={{paddingLeft:30,paddingRight:30,margin:0}}>
              <div style={{boxShadow: '0 0 3px',padding: 10,margin: '0 0 10px 0',position: 'relative',borderRadius: 6,textAlign: 'left'}}>
                  <div style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid #404040',
                      position: "absolute",
                      right: '4%',
                      top: '50%'
                  }}></div>
                  <div style={{color: '#404040',fontSize: 20,marginBottom: '0.3em',letterSpacing: 0,fontWeight:700}}>Single Vision</div>
                  <div style={{margin: 0,padding: '0 10% 0 0',color: '#9a9a9a',fontSize: 14}}>These lenses correct a single field of vision - near, intermediate, or distance</div>
              </div>
              <div style={{boxShadow: '0 0 3px',padding: 10,margin: '0 0 10px 0',position: 'relative',borderRadius: 6,textAlign: 'left'}}>
                  <div style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid #404040',
                      position: "absolute",
                      right: '4%',
                      top: '50%'
                  }}></div>
                  <div style={{color: '#404040',fontSize: 20,marginBottom: '0.3em',letterSpacing: 0,fontWeight:700}}>Multifocal</div>
                  <div style={{margin: 0,padding: '0 10% 0 0',color: '#9a9a9a',fontSize: 14}}>These lenses correct near, intermediate and distant fields of vision, eliminating the need to switch eyeglasses</div>
              </div>
              <div style={{boxShadow: '0 0 3px',padding: 10,margin: '0 0 10px 0',position: 'relative',borderRadius: 6,textAlign: 'left'}}>
                  <div style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '5px solid #404040',
                      position: "absolute",
                      right: '4%',
                      top: '50%'
                  }}></div>
                  <div style={{color: '#404040',fontSize: 20,marginBottom: '0.3em',letterSpacing: 0,fontWeight:700}}>Zero Power</div>
                  <div style={{margin: 0,padding: '0 10% 0 0',color: '#9a9a9a',fontSize: 14}}>These protect your eyes from harmful blue light emitted by digital screens and keep the glare off in style</div>
              </div>
          </div>
          <div style={{padding:30}}>
              <img src="9.jpg" width="100%" />
          </div>
          <div style={{textAlign:'center'}}>
                      <h1 style={{display: 'block',fontWeight:'bolder',fontSize: 32,color: '#404040',textAlign: 'center',margin: 17,letterSpacing: 0.5}}>Frame Size</h1>
          </div>
          <div style={{display: 'flex',justifyContent: 'space-between',alignItems:'start',flexFlow: 'wrap',padding:30}}>
            <div style={{display: 'flex',flexDirection:'column'}}>
                <img src="10.png" width="540px" />
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>Lens Width</span>
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>49 mm</span>
            </div>
            <div style={{display: 'flex',flexDirection:'column'}}>
                <img src="11.png" width="540px" />
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>Nose Bridge</span>
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>20 mm</span>
            </div>
            <div style={{display: 'flex',flexDirection:'column'}}>
                <img src="12.png" width="540px" />
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>Temple Length</span>
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>140 mm</span>
            </div>
            <div style={{display: 'flex',flexDirection:'column'}}>
                <img src="13.png" width="540px" />
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>Frame Size</span>
                <span style={{fontSize: 20,fontWeight: 700,lineHeight:1}}>135 mm</span>
            </div>
          </div>
      </div>
      <Footer history={props.history}/>
      </div>
    )
}