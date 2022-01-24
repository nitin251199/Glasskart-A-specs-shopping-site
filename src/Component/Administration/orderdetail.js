import React,{useEffect,useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getData,ServerURL,postDataAndImage, postData } from "../FetchNodeServices";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Modal from '@material-ui/core/Modal';
import { IconButton, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subdiv: {
      width: 800,
      height: "auto",
      background: "#f1f2f6",
      marginTop: 5,
      padding: 15,
      borderRadius: 5,
    },
    droot: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height:600
    },
    dsubdiv: {
      width:800,
      height:'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background:'#ecf0f1',
      padding:1,
      borderRadius:5,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    input: {
      display: 'none',
    },
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  
  

  export default function OrderDetail(props){
const classes = useStyles()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

const [orderByClick,setorderbyclick]=useState([])
const [open, setOpen] = React.useState(false);
const [modalStyle] = React.useState(getModalStyle);

      const[order,setorder]=useState([])
      const [selectedRow, setSelectedRow] = useState(null)

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
     
      useEffect(function(){
        fetchAllorders()
      },[])
    

    const fetchAllorders= async()=>{
        var list = await getData('order/fetchallorders')
        // alert(list.data)
        setorder(list.data)
    
      }


     const fetchbyclick=async(data)=>{
        var body={  id:data

        }
        var list = await postData('order/fetchallordersbyclick',body)
        // alert(list.data)
        setorderbyclick(list.data)

      }


      const HandleBillwindow=async(data)=>{
        // alert("hi")

        alert(JSON.stringify(data))

        var body={productid:data.productid,color:data.color,qty:data.qty,orderno:data.orderno}
        var result= await postData('order/orderminus',body)

        if(result.check){
          var body = {invoiceno:data.invoiceno,emailid:data.emailid,amount:data.amount,invoicedate: new Date}
          var invoiceresult = await postData("order/addinvoice", body)
          if(invoiceresult){
            props.history.push({"pathname":"/invoice"},{orderbyclick:data})
          }

          
        }
        else
        {
          alert('Stock not updated')
        }
        
      }



      const SimpleAction2= ()=> {
        return (
          <MaterialTable
            title="View DETAILS"
            columns={[
                {title: "Serial Number",cellStyle: {
                  width: 150,
                  minWidth: 150
                  },headerStyle: {
                    width: 150,
                    minWidth: 150
                    }, render:()=><TextField variant="outlined" fullWidth/>},
                { title: "Product ID",cellStyle: {
                  width: 70,
                  minWidth: 70
                  },headerStyle: {
                    width: 70,
                    minWidth: 70
                    },  field:'productid' ,},
                { title: "Product Name",  field:'productname' },
                { title: "Price Details",  field:'price',cellStyle: {
                  width: 200,
                  minWidth: 200
                  },headerStyle: {
                    width: 200,
                    minWidth: 200
                    },render:(rowData)=><div><span><b>Price</b></span>{rowData.price}<div><b>Amount:</b> {rowData.amount}</div><div><b>Offerprice:</b> {rowData.offerprice}</div> <div><b>Quantity:</b> {rowData.qty}</div></div>  },
                
                { title: " Payment Mode", render: (rowData) => <div>{rowData.paymentmode},{rowData.paymentype}</div> },
                { title: " Transaction ID", render: (rowData) => <div>{rowData.transactionid}</div> },
                { title: " Delivery Status", render: (rowData) => <div>{rowData.deliverystatus}</div> },
                { title: " Status", render: (rowData) => <div>{rowData.status}</div> },
                { title: " Action", render: (rowData) => <div>{rowData.status !== "Confirmed" ? 
                            <IconButton onClick={()=>HandleBillwindow(rowData)}><ReceiptIcon /></IconButton> : "Confirmed"}</div> },
                // { title: " Invoice NO.", render: (rowData) => <div>{rowData.invoiceno}</div> },  
               
                
           
            ]}
            data={orderByClick}  
            
            actions={[
              // {
              //   icon: ()=> <ReceiptIcon />,
              //   tooltip: 'Generate Bill',
              //   onClick: (event, rowData)=>HandleBillwindow(rowData)
              // },
             
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }
  
  

      function getModalStyle() {
        const top = 50
        const left = 50
   
      
        return {
          top: `${top}%`,
          left: `${left}%`,
         
          transform: `translate(-${top}%, -${left}%)`,
        };
      }


    const handleDetails = (data) => {
      setOpen(true);


      fetchbyclick(data.invoiceno)
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <div className={classes.droot}>
          <div className={classes.dsubdiv}>
         {SimpleAction2()}
         </div>
      </div>
     
      </div>
    );

   
       const SimpleAction= ()=> {
        return (
          <MaterialTable
            title="ORDER DETAILS"
            columns={[
              { title: "Order Detail.",  field:'orderno',render:(rowData)=><div><span><b>Order No.</b></span>{rowData.orderno}<div><b>Date:</b> {rowData.orderdate}</div></div>},
                { title: "Order No.",
                  render: (rowData) =>
                  <div style={{width: 150}}>
                   <div><span><b>Name:</b></span><span>{rowData.customername}</span></div>
                   <div><span><b>Email:</b></span>{rowData.emailid}<div><b>Mobile Number:</b></div>{rowData.mobileno}</div>
                   <div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}><span><b>Address:</b></span>{rowData.address},{rowData.city},{rowData.state},{rowData.zipcode}</div>
                   </div>
                },
                { title: " Invoice NO.", render: (rowData) => <div>{rowData.invoiceno}</div> }, 
            ]}
          
            data={order}  
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              },
              {
                icon: ()=> <VisibilityIcon/>,
                tooltip: 'View Details',
                onClick: (event, rowData) => handleDetails(rowData)
              }
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }


      return(
        <>
        <div className={classes.root}>
          <div className={classes.subdiv}>
          {SimpleAction()}
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        
      >
        {body}
      </Modal>
          </div>
        </div>
        </>
    )
}