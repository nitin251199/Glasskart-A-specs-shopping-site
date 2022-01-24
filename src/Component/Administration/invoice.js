import { useState, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, TextField, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    subdiv: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "700px",
        height: "auto",
        marginTop: 10,
        padding: 15,
        border: '1px solid #000'
    },
    dsubdiv: {
        width: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    input: {
        display: "none",
    },

    table:{
        border: "1px solid black",
        borderCollapse:"collapse"
        
    },

    tr:{
        border: "1px solid black",
        borderCollapse:"collapse"  
    },

    td:{
        border: "1px solid black",
        borderCollapse:"collapse"  
    }
}));

export default function Invoice(props) {
    const classes = useStyles();

    const [showInvoice, setShowInvoice] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [bankName, setBankName] = useState("")
    const [bankAccount, setBankAccount] = useState("")
    const [website, setWebsite] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    // const [Order, setOrder] = useState(props.location.state.order)
    const [OrderByClick, setOrderByClick] = useState(props.location.state.orderbyclick)

//    alert(JSON.stringify(OrderByClick))





    return (

        <div className={classes.root}>
            <div className={classes.subdiv}>

                <Grid
                    container
                    xs={12}
                    spacing={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >     <Grid item xs={12}>
                        <div
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
                                {/* <span>
              <img alt="" src="/glasskart.png" width="40" />
            </span>{" "} */}
                                <span>INVOICE</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>Invoice #:</div>
                                <div>Invoice Date:</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column',alignItems:"flex-start" }}>
                                <div style={{display:"flex",justifyContent:"flex-start"}}>{OrderByClick.invoiceno}</div>
                                <div>_____________</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid xs={6} item>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <div><b>Sold by:</b></div>
                            <span style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                <span>{}</span>
                                <span>______________________</span>
                                <span>______________________</span>

                                <span>Phone:________________</span>
                                <span>Email:________________</span>
                            </span>


                        </div>


                    </Grid>
                    <Grid xs={6} item justifyContent="flex-end">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: "flex-end" }}>
                            <div><b>Billing Address:</b></div>
                            <span style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                <span>______________________</span>
                                <span>______________________</span>
                                <span>______________________</span>

                                <span>Phone:________________</span>
                                <span>Email:_________________</span>
                            </span>


                        </div>


                    </Grid>
                    <Grid xs={6} item>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <div >
                                <b>PAN no:</b>
                                <span>_____________</span>
                            </div>
                            <div>
                                <b>GST Registration no:</b>
                                <span>_____________</span>
                            </div>
                            <div><b>Dynamic QR Code</b></div>
                            <div style={{
                                width: 70, height: 70, border: '1px solid #000'
                            }}></div>
                            {/* <span style={{display:'flex',justifyContent:'flex-start',flexDirection:'column'}}>
                   <span>______________________</span>
                   <span>______________________</span>
                   <span>______________________</span>
                  
                   <span>Phone:________________</span>
                   <span>Email:________________</span>
              </span> */}


                        </div>


                    </Grid>
                    <Grid xs={6} item>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "flex-end" }}>
                            <div><b>Shipping Address:</b></div>
                            <span style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                                <span>______________________</span>
                                <span>______________________</span>
                                <span>______________________</span>

                                <span>Phone:________________</span>
                                <span>Email:_________________</span>
                            </span>


                        </div>


                    </Grid>
                    <Grid container xs={12} spacing={3} direction="row">
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <div >
                                    <b>Order No:</b>
                                    <span>_____________</span>
                                </div>
                                <div>
                                    <b>Order Date:</b>
                                    <span>_____________</span>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "flex-end" }}>
                                <div >
                                    <b>Invoice No:</b>
                                    <span>_____________</span>
                                </div>
                                <div>
                                    <b>Invoice Details:</b>
                                    <span>_____________</span>
                                </div>
                                <div>
                                    <b>Invoice Date:</b>
                                    <span>_____________</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid xs={12} item>
                        <div className={classes.root}>
                            <div className={classes.dsubdiv}>
                                <table className={classes.table} style={{ width: 600 }} >
                                    <tr className={classes.tr}>
                                        <th>S. No.</th>
                                        <th>item</th>
                                        <th>description</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                    <tr className={classes.tr}>
                                        <td className={classes.td}>1</td> <td className={classes.td}>1</td> <td className={classes.td}>2</td>  <td className={classes.td}>3</td> <td className={classes.td}>4</td><td className={classes.td}>5</td></tr>
                                        <tr className={classes.tr}><td className={classes.td}>1</td> <td className={classes.td}>1</td> <td className={classes.td}>2</td>  <td className={classes.td}>3</td> <td className={classes.td}>4</td><td className={classes.td}>5</td></tr>
                                        <tr className={classes.tr}><td className={classes.td}>1</td> <td className={classes.td}>1</td> <td className={classes.td}>2</td>  <td className={classes.td}>3</td> <td className={classes.td}>4</td><td className={classes.td}>5</td></tr>
                                        <tr className={classes.tr}>
                                        <td rowSpan="6" colSpan="4"><span>Make all checks payable to: </span> <div>[company Name] </div><div>[Bank Name] </div><div>[Bank Name] </div><div>[Bank Account] </div></td>

                                    </tr>
                                    <tr className={classes.tr}><td >Total:</td> <td className={classes.td}>2</td>  </tr>
                                    <tr className={classes.tr}><td className={classes.td}>State Tax      3%</td> <td className={classes.td}>2</td>  </tr>
                                   <tr className={classes.tr}><td className={classes.td}>Federal Tax</td> <td className={classes.td}>2</td>  </tr>
                                   <tr className={classes.tr}><td className={classes.td}>Shipping</td> <td className={classes.td}>2</td>  </tr>
                                   <tr className={classes.tr}><td className={classes.td}>Grand Total</td> <td className={classes.td}>2</td>  </tr>
                                   <tr className={classes.tr}><td className={classes.td}>Amount in Words:</td>
                                        <td colSpan="5"></td>
                                    </tr>

                                    <tr colSpan="6" rowSpan="3" className={classes.tr}>

                                        <td colSpan="6" rowSpan="3">
                                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'flex-end', flexDirection: 'column' }}>
                                                <div>
                                                    <b>For Medico Enterprise</b>
                                                </div>
                                                <div style={{
                                                    width: 70, height: 70, border: '1px solid #000'
                                                }}></div>
                                                <div>
                                                    <b>Authorised Signature</b>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>


                                </table>
                            </div>
                        </div>

                    </Grid>


                </Grid>


            </div>
        </div>

    )
}


