import { Grid,Button,Avatar } from '@material-ui/core';
import { React,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";
import { postData, postDataAndImage , ServerURL } from '../FetchNodeServices';

export default function Image(props){

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
        formControl: {
            margin: theme.spacing(1),
         },
      }));

    const [productPicture, setProductPicture]= useState({filename:props.images, bytes:""})
    const [text, setText]= useState(false);
    const [image, setImage]= useState(props.images);
    const [isDelete, setIsDelete]= useState(false);

    const handlePicture = (event)=>{
        setProductPicture({
          filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]
        })
        setText(true);
      } 

    const savePicture=async(event)=>{
        var formData= new FormData();
        formData.append("pictureid", props.pictureid);
        formData.append("images",productPicture.bytes);
        var config = { headers: { "Content-Type": "multipart/form-data" } }
        var result= await postDataAndImage("finalproduct/editpictures", formData, config);
        if (result) {
            Swal.fire({
              imageUrl: './glasskart.png',
              title: 'GlassKart.com',
              text: 'Picture Updated Successfully'
            })
          }
          else {
            Swal.fire({
              imageUrl: './glasskart.png',
              title: 'GlassKart.com',
              text: 'Fail to edit picture..'
            })
          }
        setImage(ServerURL+"/images/"+result);
    }

    const handleCancil=()=>{
        setText(false);
    }

    const deleteImage=async()=>{
        var body={pictureid:props.pictureid};
        var result=await postData("finalproduct/deleteimage", body);
        if (result) {
            Swal.fire({
              imageUrl: './glasskart.png',
              title: 'GlassKart.com',
              text: 'Picture Successfully Deleted'
            })
          }
          else {
            Swal.fire({
              imageUrl: './glasskart.png',
              title: 'GlassKart.com',
              text: 'Fail to Delete picture..'
            })
          }
        setIsDelete(true);
    }

      const classes = useStyles();
      if(isDelete){
          return <></>;
      }
      else{
            return (
                <>
                    <Grid key={props.uniq} item xs={3} style={{padding:10,margin:"auto",marginTop:70}} className={classes.formControl}>
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={(event)=>handlePicture(event)}
                                key={props.key}
                            />
                            <label style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} htmlFor="contained-button-file">
                            { !text ?
                                <Button variant="contained" color="primary" style={{background:"#22a6b3", height:40}} component="span">
                                    Upload
                                </Button> : <>
                                <Button onClick={savePicture}  variant="contained" color="primary" style={{background:"#22a6b3", height:40}}>
                                    Change
                                </Button>
                                <Button onClick={handleCancil} style={{height:40}}>
                                    Cancil
                                </Button> </>
                            }
                                <Avatar alt="" src={productPicture.filename} variant="rounded" className={classes.large} />
                            </label> 
                                <Button onClick={deleteImage} variant="contained" color="primary" style={{background:"#22a6b3"}}  fullWidth>Delete</Button>
                            </div>
                        
                        <div style={{height:200}}>
                            <img src={image} alt="dropzone" style={{width:"100%", height:"100%"}} />
                        </div>
                    </Grid>
                </>
            )
        }
}