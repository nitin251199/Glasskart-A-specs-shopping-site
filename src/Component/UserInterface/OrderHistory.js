import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { getData,ServerURL, postData,postDataAndImage } from '../FetchNodeServices';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {useDispatch,useSelector} from 'react-redux'; 
import Header from './Header';
import Footer from './Footer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'react-image-resizer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  center:{
    display:'flex',justifyContent:'center',alignItems:'center'
  },
  hover: {
    "&:hover": {
      //background: "#de011b",
      background: "#FFC312",
      transform: "scale(1)",
      //transition: "all 0.5s ease 0s",
      color: "#000",
    },
  },
   gridStyle: {
    display: 'flex',
    padding:'0px 20px 0px 20px',
    flexDirection:'row'
  },
   filterStyleHeading: {
    display: 'flex', 
    fontSize: 20,
    fontFamily:'Calibri',
    color:'#000000',
    letterSpacing:1,
    fontWeight:600,
  },
  filterStyle: {
    fontSize: 14,
    fontFamily:'Calibri',
    border:'1px solid #dfe6e9',
    //letterSpacing:0.5, 
    borderRadius:1,
    padding: 10,
  },
  divider:{
    margin:'4px 4px 0px 4px',
    backgroundColor:'#ff4757',
    height:2,
    width:'99%',
  },
}));

export default function OrderHistory(props) {
    const classes = useStyles();
    const [getOrderHistory,setOrderHistory]=useState([])
    const [getProduct,setProduct]=useState([])
    const [getUser,setUser]=useState([])
    const [getStatus,setStatus]=useState(false)
    const [getAmount,setAmount]=useState(0)
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('');

    const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
   style: 'currency',
   currency: 'INR'
 }).format(value);

    const CheckSession=async()=>{
      if(!localStorage.getItem('user')){
        props.history.replace({pathname:`/UserLogin`})
        }
}

const fetchProducts=async(orderno)=>{
  var result=await postData('purchase/orderdetailsbyorderno',{'orderno':orderno})
  if(result.length!=0){
    setProduct(result)
    setStatus(true)
    setAmount(result[0].amountpaid)
    setOrder(result[0].orderno)
  }
}

 const fetchOrderHistory=async()=>{
  var user=JSON.parse(localStorage.getItem('user'))
    setUser(user)
   var body={mobileno:user.mobileno}
   var list=await postData('purchase/orderdisplaybymobileno',body)
   //console.log("list",list)
   setOrderHistory(list)
 }  
 
 const CancelOrder=async(orderno)=>{
  var result =await postData('purchase/cancelorder',{'orderno':orderno})
  if(result.result){
    fetchProducts(orderno)
  }
 setOpen(false)
}

useEffect(function(){
  CheckSession()
  window.scrollTo(0,0)
  fetchOrderHistory()
},[setStatus])
    
const OrderDetailsHeading=()=>{
  return(
    <div style={{paddingBottom:10,fontSize:16,fontWeight:'bold',fontFamily:'Calibri',color:'#212121'}}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3}>
          <div>Order Placed at</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div>Total Amount Paid</div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div>Order No</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Show Bill</div>
        </Grid>
      </Grid>
    </div>
  )
}

const OrderDetails=()=>{
return(
    getOrderHistory.map(function(item,key){
      let date=new Date(item.orderdate)
      let d = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      var t = date.getHours() + ':' + date.getMinutes()
      //console.log('time')
      return(
        <div>
          <div style={{fontSize:13,fontWeight:550,fontFamily:'Calibri',color:'#2c3e50'}}>
             <Grid container spacing={0}>
             <Grid item xs={12} sm={3} >
             <div>{d} at {item.ordertime}</div>
             </Grid>

             <Grid  item xs={12} sm={4}>
             <div><span>&#8377;</span> {item.amountpaid}</div>
             </Grid>
             
             <Grid  item xs={12} sm={3}>
             <div>{item.orderno}</div>
             </Grid>
             <Grid item xs={12} sm={2}>
             <ReceiptIcon style={{cursor:'pointer',color:'#212121',fontSize:16}} onClick={()=>fetchProducts(item.orderno)}/>
             {/* <Button 
              variant="contained"
              color="primary"
              startIcon={<ReceiptIcon />}
              onClick={()=>fetchProducts(item.orderno)}
              style={{ WebkitBoxShadow: '0 5px 19px 2px rgba(0,0,0,0)', }}>
              
             </Button> */}
               {/* <Button variant='contained' fullWidth onClick={()=>fetchProducts(item.orderno)} >
                   Show Bill 
               </Button> */}
             </Grid>
             </Grid>
             <Divider style={{marginBottom:10}}/>
        </div>
       </div>

      )

    })

)

 }

 const showProducts = () => {

  return (
    getProduct.map(function (item, key) {
      return (
        <>
          <Grid container spacing={0} className={classes.gridStyle} style={{ borderBottom: '1px solid #dcdde1', paddingBottom: 10, paddingTop: 5 }} >
            {/* <Grid item xs={12} sm={12}  > */}
            {/* <Grid container spacing={1}> */}
            <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', }} >

              {getProduct.length == getProduct.length - key ? <div style={{}}>
                {item.status != 'Delivered' ? <Button startIcon={<HighlightOffIcon />}  style={{backgroundColor:'#212121',color:'#fff'}} onClick={() => setOpen(true)} >Cancel Order </Button> : <></>}
              </div> : <></>}
            </Grid>
            <Grid item xs={12} sm={1} className={classes.center}  >
              <div style={{ width: 90, height: 135 }}>
                <Image src={`${ServerURL}/images/${item.picture}`} width={100} height={135} /></div>
            </Grid>
            <Grid item xs={12} sm={8} style={{ padding: '0px 0px 0px 35px' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.productname + " - " + item.color}</div>
              {item.size != "none" ? <div style={{ fontSize: 13 }} ><b>Size -</b>{item.size}</div> : <></>}
              <div style={{ fontSize: 13 }} ><b>Price</b>&nbsp;{numberFormat(item.discount)}
                &nbsp;&nbsp;<small><s> {numberFormat(item.price)}</s> &nbsp; &nbsp;<br />
                  <b><font color="green" >You Saved {numberFormat(item.price - item.discount)}</font></b></small></div>
              < div style={{ fontSize: 13, }}><small><b>Quantity</b> {item.quantity}</small></div>
              < div style={{ fontSize: 13, }}><small><b>{item.notesforitem}</b></small></div>
              < div style={{ fontSize: 13, }}><small><b>Delivery Charge&nbsp;</b>{numberFormat(item.deliverycharges)}</small></div>
              < div style={{ fontSize: 12, }} ><small><b>Status&nbsp; </b>{item.status}</small></div>
            </Grid>
            {item.status == 'Delivered' ? <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', }}>
              <Button startIcon={<StarIcon />}  style={{backgroundColor:'#212121',color:'#fff'}} onClick={() => props.history.push({ pathname: `/RatingnReviews/${item.productid}` })} >Rate this Product</Button>
            </Grid> : <></>}
            {/* </Grid> */}
            {/* </Grid> */}
            <Divider />

          </Grid>
        </>
      )
    })

  )
}


//  const showProducts=()=>{

//    return(
//   getProduct.map(function(item,key){
//    return(
//      <>
     
//       <Grid container spacing={0} className={classes.gridStyle}style={{ borderBottom: '1px solid #dcdde1',paddingBottom:10,paddingTop:5}} >
//         {/* <Grid item xs={12} sm={12}  > */}
//       {/* <Grid container spacing={1}> */}
//       <Grid item xs={12} sm={1} className={classes.center}  >
//        <div style={{width:90,height:135}}> 
//        <Image src={`${ServerURL}/images/${item.picture}`} width={100} height={135} /></div>
//       </Grid>
//        <Grid item xs={12} sm={8} style={{padding:'0px 0px 0px 35px'}}>
//         <div style={{fontSize:14,fontWeight:600}}>{item.productname+" - "+item.color}</div> 
//         {item.size !="none" ? <div style={{fontSize:13}} ><b>Size -</b>{item.size}</div> :<></> }
//         <div style={{fontSize:13}} ><b>Price</b>&nbsp;{numberFormat(item.discount)}
//         &nbsp;&nbsp;<small><s> {numberFormat(item.price)}</s> &nbsp; &nbsp;<br/>
//         <b><font color="green" >You Saved {numberFormat(item.price-item.discount)}</font></b></small></div> 
//         < div style={{fontSize:13,}}><small><b>Quantity</b> {item.quantity}</small></div>  
//         < div style={{fontSize:13,}}><small><b>{item.notesforitem}</b></small></div>    
//         < div style={{fontSize:13,}}><small><b>Delivery Charge&nbsp;</b>{numberFormat(item.deliverycharges)}</small></div>    
//         < div style={{fontSize:12,}} ><small><b>Status&nbsp; </b>{item.status}</small></div>
//        </Grid>
//        <Grid item xs={12} sm={3} >
       
//         {getProduct.length == key+1 ?  <div style={{}}>
//         {item.status!='Cancel Order'?<Button startIcon={<HighlightOffIcon/>} size="small" variant="contained" color="secondary" onClick={()=>setOpen(true)} >Cancel Order </Button>:<></>}
//       </div> :<></>}
//        </Grid>
//      {/* </Grid> */}
//      {/* </Grid> */}
//      <Divider />
     
//       </Grid>
//    </>
//    )
//   })

//    )
// }

const handleClose = () => {
  setOpen(false);
};

  const CancelOrderConfirm=(orderno)=>{
    return(
      <div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel Order </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'#747d8c'}}>
            No
          </Button>
          <Button onClick={()=>CancelOrder(orderno)} style={{color:'#747d8c'}}autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }

    return (
        <div>
            <Grid container spacing={1} className={classes.gridStyle} >
              {getOrderHistory.length && !getStatus ?  <> 
              <Grid item xs={12} sm={3} >
                <div className={classes.filterStyleHeading}>MY ORDER</div>
              </Grid>
              <Grid item xs={12} sm={9} >
                <div style={{float:'right',fontWeight:'bold',fontFamily:'Calibri'}}>{getOrderHistory.length} order had placed  from your account</div>
              </Grid>
              <Divider className={classes.divider}/>
              <Grid item xs={12} sm={12} >
                <div>{OrderDetailsHeading()}</div>
                <div>{OrderDetails()}</div>
              </Grid>
              </>: getStatus ? <>
               <Grid item xs={12} sm={4} >
                <div style={{fontWeight:'bold',fontFamily:'Calibri'}}>All Bill Products</div>
              </Grid>
              <Grid item xs={12} sm={8} >
                <div style={{float:'right',fontWeight:'bold',fontFamily:'Calibri'}}>Total Amount Paid {numberFormat(getAmount)}</div>
              </Grid>
              <Divider className={classes.divider}/>
               {/* <div style={{display:'flex',flexDirection:'row'}}>
               <div style={{fontWeight:'bold',width:'100%'}}>All Bill Products</div>
               <div style={{display:'flex',justifyContent:'flex-end',width:'100%'}}><b>Total Amount Paid<br/>{numberFormat(getAmount)}</b></div>
               </div>    */}
               <Grid item xs={12} sm={12} >
                {showProducts()}
              </Grid>
               
              <Button startIcon={<VisibilityIcon/>} style={{backgroundColor:'#212121',color:'#fff'}} fullWidth onClick={()=>setStatus(false)}>Show All Orders</Button>
            </>  :<div><h2>No Order has Placed from your Account</h2></div>}
            </Grid>
             {CancelOrderConfirm(order)}
        </div>

  
  );
}