import React,{useEffect,useState} from 'react'
import MaterialTable from 'material-table'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField,Grid,InputLabel,FormControl,Select,MenuItem,Button,Avatar} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { getData,postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2'  
import { isEmpty,errorMessage} from "../Checks";
import SaveIcon from '@material-ui/icons/Save';
import AddShapes from './AddShapes';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    subdiv:{
         width:800,
         height:'auto',
         background:'#f1f2f6',
         marginTop:5,
         padding:15,
         borderRadius:5,
 },
 input: {
  display: 'none',
},
fab: {
  margin: theme.spacing(2),
},
}))

export default function DisplayAllShapes(props)
{ var classes=useStyles()
var [shapesList,setShapesList]=useState([])
var[shapeId,setShapeId]=useState("")
const [shapeName,setShapeName]=useState("");
  const [status,setStatus]=useState("");
  const[btnStatus,setBtnStatus]=useState(false)
  const [oldPicture,setOldPicture]=useState("")
  const [adPicture,setAdPicture]=useState({filename:"",bytes:""});


 
  

  const handlePicture=(event)=>{
    setOldPicture(adPicture.filename)
    setAdPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnStatus(true)
  }
    
     const handleCancelPicture=async()=>{
        setBtnStatus(false)
        setAdPicture({filename:oldPicture,bytes:''})
        setBtnStatus(false)
      }
      const handleSavePicture=async()=>{
        var formData=new FormData();
   

      formData.append("shapeid",shapeId)
      
      formData.append("adpicture",adPicture.bytes)
      
      var config = { headers: { "content-type": "multipart/form-data" } };
  
   var result = await postDataAndImage('shapes/editadpicture', formData, config);
  if(result)
  {
    Swal.fire({
      imageUrl:'/glasskart.png',
      title: 'Picture Updated Successfully...',
      width: 600,
      padding: '3em',
      
    
  })}
  else
  {
    Swal.fire({
      imageUrl:'/glasskart.png',
      title: 'Failed to Upload Picture...',
      width: 600,
      padding: '3em',
     
  })
  
}
  
   setBtnStatus(false)   
   fetchAllShapes();
   setOpen(false)
      }

    
    const handleSubmit=async()=>{
     
    
    var err=false;
    if(isEmpty(shapeName)){
      err=true;
      errorMessage("Shape Name Should Not be blank..")
    }
    if(isEmpty(status)){
      err=true;
      errorMessage("Status Should not be blank..")
    }
    
    if(isEmpty(adPicture.filename)){
      err=true;
      
      errorMessage("Select Shape image..")
    }
    if(!err){
        var body={
        "shapeid":shapeId,
        "shapename":shapeName,
        "status":status,
        
        }
          
         
      
       var result = await postData('shapes/updateshape',body);
      if(result)
      {
        Swal.fire({
          imageUrl:'/glasskart.png',
          title: 'Record Updated Successfully...',
          width: 600,
          padding: '3em',
          
        
      })}
      else
      {
        Swal.fire({
          imageUrl:'/glasskart.png',
          title: 'Failed to Update Record...',
          width: 600,
          padding: '3em',
         
      })}
      setOpen(false);
        fetchAllShapes();
      }}
      const handleDeleteShapes=async(data)=>{
var body={shapeid:data.shapeid}
Swal.fire({
  imageUrl:'/glasskart.png',
      title: 'GlassKart.com',
      width: 600,
      text:"Are You Sure Want to Delete Record...",
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then(async(result) => {
  if (result.isConfirmed) {

     result=await postData("shapes/deleteshape",body)
    if(result)
    Swal.fire(
      
      'Deleted!',
      'Your Record has been deleted...',
      'success'
    )
    else
    Swal.fire(
      
      'FAIL!!!!!',
      'Server Error Faild to Delete Record',
      'Error'
    )
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your Record is Safe...',
      'error'
    )
  }
  fetchAllShapes();
})

      }

const [open, setOpen] = React.useState(false);
const handleClickOpen = (data) => {
  setShapeId(data.shapeid)
  setShapeName(data.shapename)
  setStatus(data.status)
  
    setAdPicture({filename:`${ServerURL}/images/${data.adpicture}`,bytes:''})

  
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const shapeDialog=()=>{
  return (
    <div>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
<div style={{fontSize:20,letterSpacing:1,fontWeight:'bold',padding:5}}>
<span><img alt="" src="/glasskart.png" width="50"/></span><span>Edit Shapes</span>
</div>

</DialogTitle>
        <DialogContent>
          
        <div className={classes.root}>
<div className={classes.subdiv}>
<Grid container spacing={2}>
<Grid item xs={12}>
<TextField variant="outlined" label="Material Name" value={shapeName} fullWidth
  onChange={(event)=>setShapeName(event.target.value)}
/>
</Grid>

<Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-id">Select Status</InputLabel>
              <Select
                labelId="status-id"
                id="status"
                value={status}
                onChange={(event)=>setStatus(event.target.value)}
                label="Select Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Deactivate">Deactivate</MenuItem>
               
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
          {!btnStatus?<>
<input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
<label htmlFor="contained-button-file"> 
        <Button style={{background:"#22a6b3"}} variant="contained" color="primary" component="span">
        Edit Picture
        </Button>
        </label></>:<></>}
      {btnStatus?<>
<Button onClick={()=>handleSavePicture()}>Save</Button>
<Button onClick={()=>handleCancelPicture()}>Cancel</Button></>:<></>}

</Grid>
<Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center" }}>
<Avatar alt="Remy Sharp" variant="rounded" src={adPicture.filename} style={{width:50, height:50}} />
</Grid>
<Grid item sm={12}>
<Button fullWidth style={{background:"#22a6b3"}} variant="contained" color="primary"
onClick={()=>handleSubmit()}
>Submit Shapes</Button>

</Grid>


</Grid>

</div>

</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
const fetchAllShapes=async()=>{
var list=await getData('shapes/fetchallshapes')
setShapesList(list.data)
    }
    useEffect(function(){
     fetchAllShapes();   
    },[])

    function SimpleAction() {
        return (
          <MaterialTable
            title={
              <>
                <span>
                  <img alt="" src="/glasskart.png" width="40" />
                </span>&nbsp;&nbsp;{" "}
                <b style={{ fontSize: 18, opacity: 0.5 }}> SHAPES </b>{" "}
                  <Tooltip title="Add Shapes" >
                    <Fab color="primary" size="small" onClick={() => props.setComponent(<AddShapes />)} className={classes.fab}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
              </>
            }
            columns={[
              { title: 'ID', field: 'shapeid' },
              
              { title: 'SHAPE NAME',
              render: rowData => (<div><b>{rowData.shapename}</b></div>
               ) },
              { title: 'STATUS', 
              render: rowData => (<div>{rowData.status}</div>
             
             
               ) },
              { title: 'PICTURE',
              render: rowData =>(<img alt="" style={{width:50, height:50, borderRadius:10}} src ={`${ServerURL}/images/${rowData.adpicture}`}/>
              )}
              
              
              
            ]}
            data={shapesList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Store',
                onClick: (event, rowData) =>handleClickOpen(rowData),
              },
              
              {
                icon: 'delete',
                tooltip: 'Delete Store',
                onClick: (event, rowData) =>handleDeleteShapes(rowData),
              },
            ]}
          />
        )
      }
    return(
        <div className={classes.root}>
        <div className={classes.subdiv}>{SimpleAction()}  </div>
        {shapeDialog()}
        </div>
    )
}