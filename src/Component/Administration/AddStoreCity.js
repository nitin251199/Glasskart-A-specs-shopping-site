import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField,Avatar } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2'
import Geocode from "react-geocode";
import { getData,postDataAndImage } from "../FetchNodeServices";
import { isEmpty,errorMessage, isDigits, isMobile, isEmail } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  subdiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: 'auto',
    marginTop:10,
    background:'inherit',
    padding:15,
    borderRadius:5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: 'none',
  },
}));
export default function AddStoreCity(props) {
  const [listStates,setListState] = useState([])
   const[state,setState] = useState("")
  const [city,setCity] = useState("")
  const [storeName,setStoreName] = useState("")
  const [addressOne,setAddressOne] = useState("")
  const [addressTwo,setAddressTwo] = useState("")
  const [landmark,setLandmark] = useState("")
  const [latitude,setLatitude] = useState("")
  const [longitude,setLongitude] = useState("")
  const [contactNo,setContactNo] = useState("")
  const [emailAddress,setEmailAddress] = useState("")
  const [picture,setPicture] = useState({filename:"",bytes:""})
  

  const fetchAllStates = async()=>{
    var list = await getData('stores/fetchallstates')

    setListState(list.data)

  }

  const getLatLng = (address) => {
    address= storeName+","+addressOne+","+city+","+state
    Geocode.setApiKey("AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs");
    Geocode.setLanguage("en");

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
       setLatitude(lat)
       setLongitude(lng)
        
       
      },
      (error) => {
        console.error(error);
        alert(error)
      }
    );
  };

  useEffect(function(){
    fetchAllStates()
  },[])

  const fillState=()=>{
    return listStates.map((item)=>{
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>
    })
  }

  const classes = useStyles();

const handlePicture = (event)=>{
  setPicture({
    filename:URL.createObjectURL(event.target.files[0]),
    bytes:event.target.files[0]
  })
}

const handleSubmit = async () =>{
var err = false;
if(isEmpty(state)){
  err = true;
  errorMessage("States should not be empty");
  
}
if(isEmpty(city)){
  err = true;
  errorMessage("City should not be empty"); 
}
if(isEmpty(storeName)){
  err = true;
  errorMessage("Store Name should not be empty"); 
}
if(isEmpty(addressOne)){
  err = true;
  errorMessage("Address one should not be empty"); 
}
if(isEmpty(landmark)){
  err = true;
  errorMessage("Landmark should not be empty"); 
}
if(isEmpty(latitude)){
  err = true;
  errorMessage("Latitude should not be empty"); 
}
if(!isDigits(latitude)){
  err = true;
  errorMessage("Invalid Latitude"); 
}
if(isEmpty(longitude)){
  err = true;
  errorMessage("Longitude should not be empty"); 
}
if(!isDigits(longitude)){
  err = true;
  errorMessage("Invalid Longitude"); 
}
if(isEmpty(contactNo)){
  err = true;
  errorMessage("Contact Number should not be empty"); 
}
if(!isMobile(contactNo)){
  err = true;
  errorMessage("Invalid Contact Number"); 
}
if(isEmpty(emailAddress)){
  err = true;
  errorMessage("Email should not be empty"); 
}
if(!isEmail(emailAddress)){
  err = true;
  errorMessage("Invalid Email"); 
}
if(isEmpty(picture.filename)){
  err = true;
  errorMessage("Please Add Store Picture..."); 
}
if(!err){
  var formData = new FormData();
  formData.append("state",state)
  formData.append("city",city)
  formData.append("storename",storeName)
  formData.append("addressone",addressOne)
  formData.append("addresstwo",addressTwo)
  formData.append("landmark",landmark)
  formData.append("latitude",latitude)
  formData.append("longitude",longitude)
  formData.append("contactno",contactNo)
  formData.append("emailaddress",emailAddress)
  formData.append("picture",picture.bytes)
  var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage("stores/insertstore", formData, config);
    if(result)
    {
      Swal.fire({
        title: 'GlassKart.com',
        text: 'Your Record has been submitted successfully...',
        imageUrl: '/glasskart.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
    else
  {
    Swal.fire({
      title: 'GlassKart.com',
      text: 'Error in submitting the record...',
      imageUrl: '/glasskart.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
}
}  

    return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
       <Grid container xs={12} spacing={1} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
         <Grid item xs={12}><div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',fontSize:20,fontWeight:"bold",letterSpacing:1}}>
          <Grid item xs={2}><img src="./glasskart.png" alt="Remy Sharp" style={{width:50}}></img></Grid><Grid item xs={3}> Add Stores</Grid>
         </div></Grid>
        <Grid item xs={6}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="state-id">Select State</InputLabel>
        <Select
          labelId="state-id"
          id="stateid"
          //value={age}
          onChange={(event)=>setState(event.target.value)}
          label="Select State"
        >
          {fillState()}
        </Select>
      </FormControl>
        </Grid>
         
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="City"
          onChange={(event)=>setCity(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Store Name"
          onChange={(event)=>setStoreName(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Address One"
          onChange={(event)=>setAddressOne(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Address Two"
          onChange={(event)=>setAddressTwo(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Landmark"
          onChange={(event)=>setLandmark(event.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField variant="outlined" value={latitude} fullWidth label="Latitude"
          onChange={(event)=>setLatitude(event.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField variant="outlined" value={longitude} fullWidth label="Longitude"
          onChange={(event)=>setLongitude(event.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" color="primary" fullWidth style={{background:"#4cd137",padding:12,fontSize:16 }} onClick={()=>getLatLng()}>
            Get Location</Button>
        </Grid>

        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Contact Number"
          onChange={(event)=>setContactNo(event.target.value)}/>
        </Grid>

        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Email address"
          onChange={(event)=>setEmailAddress(event.target.value)}
          />
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" style={{background:"#22a6b3"}} component="span">
          Upload
        </Button>
      </label>
        </Grid>

        <Grid item xs={6} style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <Avatar alt="Remy Sharp" src={picture.filename} variant="rounded" className={classes.large} />
        </Grid>

         <Grid item md={12}>
      <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Store</Button>
      </Grid>
       </Grid>
        </div>
      </div>
      );
    

}