import React from "react";
import axios from 'axios'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from "@mui/material/Paper";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import {
  
  MarginTop,
  MainMargin,
  LargePadding,
} from "../../../../dimentions/Margins";
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
import generateRandom from './../../../OTPGenerator/GetOtp'
import { useSelector } from "react-redux";
export default function DistributionOrder(props) {
  console.log(props)
  const user=(useSelector((state)=>state.getUser))
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [otpForConfirm,setOtpforConfirm]=React.useState(0);
  const [listOfBilling, setListOfBilling] = React.useState([]);
  const [total,setTotal]=React.useState(0);


  const [subTypes,setSubTypes]=React.useState([15,30,60,90,180,360])
  const [SubTypesOfValue, setSubTypesOfValue] = React.useState(15);
  const [ordertypes,setOrderTypes]=React.useState(["Regular","Normal"])
  const [daysVisible,setDaysVisible]=React.useState("hidden")
  const [ordertype,setOrderType]=React.useState(ordertypes[1])
  const [InputTypeValue, setInputTypeValue] = React.useState(props.InputType[0]);
  const handleAddButton=()=>{
    const qty=props.resourcePerson.label?props.resourcePerson.label:props.resourcePerson
    const temp=listOfBilling
    temp.push({
      catagory: props.catagoryType.label ?props.catagoryType.label:props.catagoryType ,
      qty: props.resourcePerson.label?props.resourcePerson.label:props.resourcePerson,
      inputType:InputTypeValue.label,
      subTotal: 1200,
      catagoryID:props.catagoryID,
      Ordertype:ordertype,
      days:SubTypesOfValue



    })

    setListOfBilling(temp)
    setOtpforConfirm(generateRandom())
    var b=total+qty*1200;
    // console.log(b)
    setTotal(b)
   // console.log(temp)
   
  }
  React.useEffect(()=>{
    console.log(total)
  },[total])
  const handleRemoveButton=(id)=>{
    
    let b=total-listOfBilling[id].subTotal
    setTotal(b)
   // console.log(b)
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
    const products=[]
    for( var i in listOfBilling){
      products.push({id:listOfBilling[i].catagoryID,qty:listOfBilling[i].qty,price:listOfBilling[i].subTotal})
    }
    console.log(products)
    var today = new Date();
    today.setDate(today.getDate() + SubTypesOfValue)

    var endDate = new Date(today.getDate() + SubTypesOfValue);
    const outArr={
      orderBy:user.id,
      products:products,
      status:0,
      mode:ordertype,
      days:SubTypesOfValue,
      nextOrderDate:today
      

    }
    console.log(outArr)

    axios.post('http://localhost:2000/distributor/addorder', outArr)
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
              value={ordertype}
              disablePortal
              id="combo-box-demo"
              options={ordertypes}
              disabled={listOfBilling.length==0?false:true}
              onChange={(event, newVal) => {
              
                setOrderType(newVal)
                if(newVal=="Regular"){
                  setDaysVisible("visible")
                }else{
                  setDaysVisible("hidden")

                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Order types" />
              )}
            />
          </Grid>
          <Grid xs={3}>
          <Autocomplete
            value={SubTypesOfValue}
            style={{ marginLeft: MarginTop ,visibility:daysVisible}}
            disabled={listOfBilling.length==0?false:true}
            onChange={(event, newVal) => {
           
              setSubTypesOfValue(newVal);
            }}
            disablePortal
            
            id="combo-box-demo"
            options={subTypes}
            renderInput={(params) => (
              <TextField {...params} label="Days After" />
            )}
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
                <b>Req. Quantity</b>
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
                  <TableCell>{item.qty}</TableCell>
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
              <TableCell colSpan={2} align="right">
                <b>Total</b>
              </TableCell>
              <TableCell>{total} Rs.</TableCell>
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
         
          <AddBusinessIcon/>
          {" "} order
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
