import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded"
import { TextField,Grid,Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import "./styles.css" 
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch,useSelector } from "react-redux";
import {postData} from '../FetchNodeServices'
import OtpInput from 'react-otp-input';
import { isEmpty,errorMessage, isDigits, isMobile, isEmail } from "../Checks";

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
    },
    subdiv:{
          width:'300',
          height:'auto',
          marginTop:10,
          
          borderRadius:5,
  }

}))
export default function Login(props)
{const classes = useStyles();
  const [mobileno,setMobileNo] = useState('')
  const [otp,setOtp]=useState("")
  const [gotp,setGotp]=useState("")
  const [showOtp,setShowOtp]=useState(false)
  const [refresh,setRefresh] = useState(false)

  var dispatch=useDispatch()
  var cart=useSelector(state=>state.cart)
  var key=Object.keys(cart)


  const handleSend=async()=>{
    var body = {mobileno:mobileno}
    var result = await postData('userdetails/checkusermobilenumber',body)

    if(result.result){
      setShowOtp(true) 
      var otpval=parseInt(8999*Math.random()+1000) 
      alert(otpval)
      setGotp(otpval)
      dispatch({type:'ADD_USER',payload:[result.data[0].mobileno,result.data[0]]})
      result = await postData('sendsms/sendotp',{otp:otpval,mobileno:mobileno})
    
    }
    else{
   var otpval=parseInt(8999*Math.random()+1000) 
    alert(otpval)
    result=await postData("sendsms/sendotp",{otp:otpval,mobileno:mobileno})
    props.history.push({pathname:'/signup'},{mobileno:mobileno,otp:otpval})
    }
  }

const handleProceed =() => {
  
  if(otp==gotp)
  {
    props.history.push({pathname:"/maincart"})

  }
  else
  { 
    errorMessage("Invalid otp")

  }

}


  const handleChangeOtp=(value)=>{

setOtp(value)

  }
return(
  <>
      <Header history={props.history} setRefresh={setRefresh}/>
    <div className={classes.root}>
    <div className={classes.subdiv}>
<div style={{display:'flex',flexDirection:'row'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:20}}>
        <img src="/login1.jpg" width='800' height='370' style={{borderRadius:20}}/>
        </div>

        <div style={{border:'1px solid #000',borderRadius:5,width:350,height:320,padding:20,margin:10}}>
        
      
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <AccountCircleRoundedIcon style={{fontSize:80}}/>
        </div>
        <div style={{fontSize:30}}>
         <b>Sign in</b>
        </div>
        <div style={{fontSize:15}}><font color="#95a5a6">Sign in to access your Orders, Offers and Wishlist.</font>
        </div>
         <br/>
        
        <Grid container spacing={2}>
        <Grid item sm={12}>
        
        <TextField 
        InputProps={{
            startAdornment: <InputAdornment position="start">+91 |</InputAdornment>,
          }}
        variant="outlined" label="Enter Your Mobile No." fullWidth
        onChange={(event)=>setMobileNo(event.target.value)}
        />
        
        
        </Grid>
     
        
        
<Grid item sm={12}>
     {showOtp?<><OtpInput
        value={otp}
        onChange={(value)=>handleChangeOtp(value)}
        numInputs={4}
        inputStyle="inputStyle"
        separator={<span>-</span>}
      />
      &nbsp;
      <Grid item sm={12}>
{key.length>0 ? <Button onClick={()=>handleProceed()}
fullWidth style={{background:"#50526e",color:'#fff'}} variant="contained" color="primary" endIcon={<SendIcon />}>Proceed</Button>:
<Button onClick={()=>props.history.push({pathname:'/home'})}
fullWidth style={{background:"#50526e",color:'#fff'}} variant="contained" color="primary" endIcon={<SendIcon />}>Continue Shopping</Button>}

</Grid></>
    :<>
    <Grid item sm={12}>
<Button onClick={()=>handleSend()}
fullWidth style={{background:"#50526e",color:'#fff'}} variant="contained" color="primary" endIcon={<SendIcon />}>Send</Button>

</Grid></>}
      </Grid>  
</Grid>
&nbsp;
        

     <div style={{textAlign:'center', fontSize:13}}>
     By continuing you agree to our <font color='red'>Terms of service</font>
     <br/>
     and
     <font color='red'> Privacy & Legal Policy.</font>
     </div>   
        
        



        </div>
        </div>

</div>
</div>
<Footer history={props.history} />
</>
)
}