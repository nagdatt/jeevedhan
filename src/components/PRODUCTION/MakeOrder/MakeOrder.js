import React from "react";
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  
  MarginTop,
  MainMargin,
  LargePadding,
} from "../../../dimentions/Margins";
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import generateRandom from './../../OTPGenerator/GetOtp'
import { useSelector } from "react-redux";
export default function MakeOrder(props) {
  console.log(props)
  const user=(useSelector((state)=>state.getUser))
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [otpForConfirm,setOtpforConfirm]=React.useState(0);
  const [Size,setSize]=React.useState(1)
  const [unitPrice,setUnitPrice]=React.useState(100)
  const [listOfBilling, setListOfBilling] = React.useState([]);
  const [total,setTotal]=React.useState(0);
  const [SubTypesOfValue, setSubTypesOfValue] = React.useState(props.SubTypesOf[0]);
  const [InputTypeValue, setInputTypeValue] = React.useState(props.InputType[0]);
  const handleAddButton=()=>{
    const temp=listOfBilling
    temp.push({
      catagory: props.catagoryType.label ?props.catagoryType.label:props.catagoryType ,
      name: SubTypesOfValue.label ,
      resource: props.resourcePerson.label?props.resourcePerson.label:props.resourcePerson,
      size: Size,
      inputType:InputTypeValue.label,
      subTotal: Size*unitPrice,
      id:SubTypesOfValue.id   ,
      catagoryID:props.catagoryID

    })
    setListOfBilling(temp)
    setOtpforConfirm(generateRandom())
    var b=total+Size*unitPrice;
    // console.log(b)
    setTotal(b)
    console.log(temp)
   
  }
  React.useEffect(()=>{
    console.log(total)
  },[total])
  const handleRemoveButton=(id)=>{
    
    let b=total-listOfBilling[id].subTotal
    setTotal(b)
    console.log(b)
    listOfBilling.splice(id,1)
    setListOfBilling(listOfBilling)
    setOtpforConfirm(generateRandom())

  }
  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
    setOtpforConfirm(generateRandom())

  };
  React.useEffect(()=>{
  },[otpForConfirm])
  const handleCloseConfirm = () => {

    var out=[]
  
    for (var i in listOfBilling){
        out.push({
          id:listOfBilling[i].id,
          qty:listOfBilling[i].size,
          price:listOfBilling[i].subTotal/listOfBilling[i].size,
          category:listOfBilling[i].catagoryID
        })
    }
    
   const outObj={
      product:out,
      status:0,
      createdBy:sessionStorage.getItem("id")
    }
    console.log(outObj)
    axios.post('http://localhost:2000/order/addorder', outObj)
    .then(response => {
      console.log(response)

    }).catch(error => {
      console.log(error.response)
  });;

    setOpenConfirm(false);
  };
 

  return (
    <Paper variant="outlined" style={{ padding: LargePadding }}>
      

      {/*  */}
      <Grid container style={{ marginTop: MainMargin }}>
        <Grid xs={3}>
          <Autocomplete
            value={SubTypesOfValue}
            onChange={(event, newVal) => {
            
              setSubTypesOfValue(newVal);
            }}
            disablePortal
            id="combo-box-demo"
            options={props.SubTypesOf}
            renderInput={(params) => (
              <TextField {...params} label="Raw Material" />
            )}
          />
        </Grid>
        <Grid xs={2}>
          <TextField
            id="outlined-basic"
            label="Size"
            value={Size}
            onChange={(event,val)=>{
              setSize(event.target.value)
            }}
           
            style={{ marginLeft: "5px" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            value={InputTypeValue}
            disablePortal
          
            id="combo-box-demo"
            options={props.InputType}
            style={{ marginLeft: "10px" }}
            onChange={(event, newVal) => {
              setInputTypeValue(newVal);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Quantity type" />
            )}
            fullWidth
          />
        </Grid>

        <Grid xs={3}>
          <TextField
            id="outlined-basic"
           value={unitPrice}
           onChange={(event,val)=>{
            setUnitPrice(event.target.value)
          }}
            label="Price per item"
            variant="outlined"
            style={{ marginLeft: "15px" }}
            fullWidth
          />
          
        </Grid>
        <Grid             style={{ marginLeft: "20px" }}
>
        <Button size="large" variant="contained" style={{ padding:"15px"}} onClick={handleAddButton} fullWidth>
          <AddIcon/>
        </Button>
        </Grid>
      </Grid>
      <h1>Total Billing</h1>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Catagory</b>
              </TableCell>
              <TableCell>
                <b>Raw Material</b>
              </TableCell>
              <TableCell>
                <b>Resource</b>
              </TableCell>
              <TableCell>
                <b>Size</b>
              </TableCell>
              <TableCell>
                <b>SubTotal</b>
              </TableCell>
              <TableCell align="right">
                <b>Remove</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfBilling.map((item,index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.catagory}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.resource}</TableCell>
                  <TableCell>{item.size}  {item.inputType}</TableCell>
                  <TableCell>{item.subTotal} Rs. </TableCell>

                  <TableCell align="right">
                    <Button variant="contained" color="error" onClick={()=> handleRemoveButton(index)}>
                      {" "}
                      <DeleteIcon /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell rowSpan={4} />
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} align="right">
                <b>Total</b>
              </TableCell>
              <TableCell>{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          style={{ marginTop: MarginTop }}
          onClick={handleClickOpenConfirm}
        >
         
          <ShoppingCartIcon/>
          {" "} Order
        </Button>
      </Grid>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Verify</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <VpnKeyIcon style={{ marginRight: MarginTop }} />{" "}
              <b style={{ marginRight: MarginTop }}>OTP</b> has been sent to
              registered mobile no. {otpForConfirm}
            </div>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="Enter otp"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button >Verify</Button>
          <Button onClick={handleCloseConfirm} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
