import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Avatar } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Swal from "sweetalert2";
import Geocode from "react-geocode";
import AddStoreCity from "./AddStoreCity";
import SaveIcon from "@material-ui/icons/Save";
import { isEmpty, errorMessage, isDigits, isMobile, isEmail } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subdiv: {
    width: 900,
    height: "auto",
    background: "#f1f2f6",
    marginTop: 5,
    padding: 15,
    borderRadius: 5,
  },
  droot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dsubdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ecf0f1",
    padding: 1,
    borderRadius: 5,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    display: "none",
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

export default function DisplayInvoice(props) {
  const classes = useStyles();
  const [invoiceList, setInvoiceList] = useState([]);

  const fetchAllInvoice = async () => {
    var list = await getData("order/fetchallinvoice");

    setInvoiceList(list.data);
    console.log(">>", invoiceList);
  };

  useEffect(function () {
    fetchAllInvoice();
  }, []);

  const handleSubmit = async (data, value) => {
    var body = {
      invoiceno: data.invoiceno,
      mobileno: data.mobileno,
      finalstatus: value,
    };
    var result = await postData("order/updateinvoice", body);
    if (result) {
      Swal.fire({
        title: "GlassKart.com",
        text: "Your Invoice has been updated successfully...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        title: "GlassKart.com",
        text: "Error in updating the invoice...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    fetchAllInvoice();
  };

  function SimpleAction() {
    return (
      <MaterialTable
        title={
          <>
            <span>
              <img alt="" src="/glasskart.png" width="40" />
            </span>
            &nbsp;&nbsp;{" "}
            <b style={{ fontSize: 18, opacity: 0.5 }}> INVOICE DETAILS </b>{" "}
          </>
        }
        columns={[
          { title: "Invoice No", field: "invoiceno" },
          { title: "Email Id", field: "emailid" },
          { title: "Mobile No", field: "mobileno" },
          { title: "Total Amount", field: "totalamount" },
          { title: "Date", field: "invoicedate" },
          {
            title: "Status",
            render: (rowData) => (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    placeholder="Confirmed"
                    labelId="status"
                    value={rowData.finalstatus}
                    onChange={(event) => {
                      handleSubmit(rowData, event.target.value);
                    }}
                  >
                    <MenuItem value="confirmed" disabled>
                      Confirmed
                    </MenuItem>
                    <MenuItem value="In Transit">In Transit</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Returned">Returned</MenuItem>
                    <MenuItem value="Cancelled">Cancel</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ),
          },
        ]}
        data={invoiceList}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>{SimpleAction()}</div>
    </div>
  );
}
