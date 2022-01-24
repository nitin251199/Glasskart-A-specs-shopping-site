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

export default function DisplayAllStores(props) {
  const classes = useStyles();
  const [storeList, setStoreList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [listStates, setListState] = useState([]);
  const [state, setState] = useState("");
  const [storeId, setStoreId] = useState("");
  const [city, setCity] = useState("");
  const [storeName, setStoreName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [picture, setPicture] = useState({ filename: "", bytes: "" });
  const [oldPicture, setOldPicture] = useState("");

  const fetchAllStates = async () => {
    var list = await getData("stores/fetchallstates");

    setListState(list.data);
  };

  const getLatLng = (address) => {
    address = storeName + "," + addressOne + "," + city + "," + state;
    Geocode.setApiKey("AIzaSyCeL-_o98r7DE5H-BxKAYTSupPnio4M3Rs");
    Geocode.setLanguage("en");

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error(error);
        alert(error);
      }
    );
  };

  useEffect(function () {
    fetchAllStates();
  }, []);

  const fillState = () => {
    return listStates.map((item) => {
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>;
    });
  };

  const handleCancelPicture = async () => {
    setPicture({ filename: oldPicture, bytes: "" });
    setBtnStatus(false);
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("storeid", storeId);
    formData.append("picture", picture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "stores/editstorepicture",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        title: "GlassKart.com",
        text: "Your Picture has been updated successfully...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        title: "GlassKart.com",
        text: "Error in updating the picture...",
        imageUrl: "/glasskart.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    setOpen(false);
    setBtnStatus(false);
    fetchAllStores();
  };

  const handlePicture = (event) => {
    setOldPicture(picture.filename);
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(state)) {
      err = true;
      errorMessage("States should not be empty");
    }
    if (isEmpty(city)) {
      err = true;
      errorMessage("City should not be empty");
    }
    if (isEmpty(storeName)) {
      err = true;
      errorMessage("Store Name should not be empty");
    }
    if (isEmpty(addressOne)) {
      err = true;
      errorMessage("Address one should not be empty");
    }
    if (isEmpty(landmark)) {
      err = true;
      errorMessage("Landmark should not be empty");
    }
    if (isEmpty(latitude)) {
      err = true;
      errorMessage("Latitude should not be empty");
    }
    if (!isDigits(latitude)) {
      err = true;
      errorMessage("Invalid Latitude");
    }
    if (isEmpty(longitude)) {
      err = true;
      errorMessage("Longitude should not be empty");
    }
    if (!isDigits(longitude)) {
      err = true;
      errorMessage("Invalid Longitude");
    }
    if (isEmpty(contactNo)) {
      err = true;
      errorMessage("Contact Number should not be empty");
    }
    if (!isMobile(contactNo)) {
      err = true;
      errorMessage("Invalid Contact Number");
    }
    if (isEmpty(emailAddress)) {
      err = true;
      errorMessage("Email should not be empty");
    }
    if (!isEmail(emailAddress)) {
      err = true;
      errorMessage("Invalid Email");
    }
    if (isEmpty(picture.filename)) {
      err = true;
      errorMessage("Please Add Store Picture...");
    }
    if (!err) {
      var body = {
        storeid: storeId,
        state: state,
        city: city,
        storename: storeName,
        addressone: addressOne,
        addresstwo: addressTwo,
        landmark: landmark,
        latitude: latitude,
        longitude: longitude,
        contactno: contactNo,
        emailaddress: emailAddress,
      };
      var result = await postData("stores/updatestoredata", body);
      if (result) {
        Swal.fire({
          title: "GlassKart.com",
          text: "Your Record has been updated successfully...",
          imageUrl: "/glasskart.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      } else {
        Swal.fire({
          title: "GlassKart.com",
          text: "Error in updating the record...",
          imageUrl: "/glasskart.png",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
      setOpen(false);
    }
    fetchAllStores();
  };

  const handleDeleteStore = async (data) => {
    var body = { storeid: data.storeid };
    Swal.fire({
      imageUrl: "/glasskart.png",
      imageWidth: 200,
      title: "GlassKart.com",
      text: "Are u Sure to Delete Selected Record...",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        result = await postData("stores/deletestore", body);
        if (result) {
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
          fetchAllStores();
        } else
          Swal.fire("FAIL!!!!", "Server Error Fail to Delete Record", "error");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
    });
    fetchAllStores();
  };

  const handleClickOpen = (data) => {
    setStoreId(data.storeid);
    setState(data.storestate);
    setCity(data.storecity);
    setStoreName(data.storename);
    setAddressOne(data.addressone);
    setAddressTwo(data.addresstwo);
    setLandmark(data.landmark);
    setLatitude(data.lat);
    setLongitude(data.lng);
    setContactNo(data.contactno);
    setEmailAddress(data.emailaddress);
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBtnStatus(false);
  };

  const storeDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
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
                <span>
                  <img alt="" src="/glasskart.png" width="40" />
                </span>{" "}
                <span>Edit Store</span>
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>
                <Grid
                  container
                  xs={12}
                  spacing={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="state-id">Select State</InputLabel>
                      <Select
                        labelId="state-id"
                        id="stateid"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        label="Select State"
                      >
                        {fillState()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      value={city}
                      fullWidth
                      label="City"
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      value={storeName}
                      fullWidth
                      label="Store Name"
                      onChange={(event) => setStoreName(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={addressOne}
                      label="Address One"
                      onChange={(event) => setAddressOne(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={addressTwo}
                      label="Address Two"
                      onChange={(event) => setAddressTwo(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={landmark}
                      label="Landmark"
                      onChange={(event) => setLandmark(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      value={latitude}
                      fullWidth
                      label="Latitude"
                      onChange={(event) => setLatitude(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      value={longitude}
                      fullWidth
                      label="Longitude"
                      onChange={(event) => setLongitude(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{
                        background: "#4cd137",
                        padding: 12,
                        fontSize: 16,
                      }}
                      onClick={() => getLatLng()}
                    >
                      Get Location
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      value={contactNo}
                      fullWidth
                      label="Contact Number"
                      onChange={(event) => setContactNo(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={emailAddress}
                      label="Email address"
                      onChange={(event) => setEmailAddress(event.target.value)}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!btnStatus ? (
                      <>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(event) => handlePicture(event)}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ background: "#22a6b3" }}
                            component="span"
                          >
                            Edit Picture
                          </Button>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                    {btnStatus ? (
                      <>
                        <Button onClick={() => handleSavePicture()}>
                          Save
                        </Button>
                        <Button onClick={() => handleCancelPicture()}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt=""
                      src={picture.filename}
                      variant="rounded"
                      className={classes.large}
                    />
                  </Grid>

                  <Grid item md={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ background: "#22a6b3" }}
                      fullWidth
                      onClick={() => handleSubmit()}
                    >
                      Edit Store
                    </Button>
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
  };

  useEffect(function () {
    fetchAllStores();
  }, []);

  const fetchAllStores = async () => {
    var list = await getData("stores/fetchallstores");

    setStoreList(list.data);
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
            <b style={{ fontSize: 18, opacity: 0.5 }}> OUR STORES </b>{" "}
            <Tooltip title="Add Stores">
              <Fab
                color="primary"
                size="small"
                onClick={() => props.setComponent(<AddStoreCity />)}
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </>
        }
        columns={[
          { title: "Id", field: "storeid" },
          {
            title: "Store Name",
            render: (rowData) => (
              <div>
                <b>{rowData.storename}</b>
                <br />
                {rowData.addressone},{rowData.addresstwo}
              </div>
            ),
          },
          {
            title: "City",
            render: (rowData) => (
              <div>
                {rowData.storecity},{rowData.storestate}
              </div>
            ),
          },
          {
            title: "Location",
            render: (rowData) => (
              <div>
                <a
                  href={`https://maps.google.com/?q=${rowData.lat},${rowData.lng}`}
                >
                  Show
                </a>
              </div>
            ),
          },
          {
            title: "Contact",
            render: (rowData) => (
              <div>
                {rowData.contactno}
                <br />
                {rowData.emailaddress}
              </div>
            ),
          },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                alt={rowData.picture}
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={storeList}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Store",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Store",
            onClick: (event, rowData) => handleDeleteStore(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>{SimpleAction()}</div>
      {storeDialog()}
    </div>
  );
}
