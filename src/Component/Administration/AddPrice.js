import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid,Button,TextField } from '@material-ui/core'
import Swal from 'sweetalert2'
import { postData } from "../FetchNodeServices";
import { isEmpty,errorMessage } from "../Checks";

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

  export default function AddPrice(props) {
    const [minPrice,setMinPrice] = useState("")
    const [maxPrice,setMaxPrice] = useState("")

    const classes = useStyles();


      const handleSubmit = async () =>{
      var err = false;
      if(isEmpty(minPrice)){
        err = true;
        errorMessage("Min Price should not be empty");
        
      }
      if(isEmpty(maxPrice)){
        err = true;
        errorMessage("Status should not be empty"); 
      }
      if(!err){
        var body = {"minprice":minPrice,"maxprice":maxPrice}
          var result = await postData("price/insertprice", body);
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
         <Grid item xs={12}><div
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 1,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  padding: 1,
                }}
              >
                <span>
                  <img alt="" src="/glasskart.png" width="40" />
                </span>{" "}
                <span>Add Price</span>
              </div>
            </div>
            </Grid>
         
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Min Price"
          onChange={(event)=>setMinPrice(event.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Max Price"
          onChange={(event)=>setMaxPrice(event.target.value)}
          />
        </Grid>

         <Grid item md={12}>
      <Button variant="contained" color="primary" style={{background:"#22a6b3" }} fullWidth onClick={()=>handleSubmit()} >Submit Price</Button>
      </Grid>
       </Grid>
        </div>
      </div>
      );
 
  }