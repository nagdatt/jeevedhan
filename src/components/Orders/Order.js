import React, { useEffect } from "react";
import { MainMargin, MarginTop } from "./../../dimentions/Margins";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tracker from './../TrackAndTransport/Tracker'
import axios from "axios";

import { useLocation } from "react-router";
function createRow(desc, qty, unit) {
  const price = qty * unit;
  return { desc, qty, unit, price };
}

export default function Order() {
  const updateStatus=(orderId,Orderstaus)=>{
    if(Orderstaus<=3)
    {
      const url="http://localhost:2000/order/updateStatus?id="+orderId+"&status="+(Orderstaus+1)
      axios.get(url).then((res)=>{
        console.log("succeded")
      })
      console.log(url)
  
    }
  }
  const loc=useLocation()
  const [orderDetails,setOrderDetails]=React.useState([])
  const [orderId,setOrderId]=React.useState(0)
  const [status,setStatus]=React.useState(loc.state?.status)
  console.log(loc.state?.status)
  const [rows,setRows] =React.useState( [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
  ]);
  useEffect(()=>{

    const orderID= loc.state?.id
    if(orderID){
      const url="http://localhost:2000/order/getdetails?id="+orderID
      axios
      .get(url).then((data) => {
        const temp=data.data
        console.log(temp)
        
        setOrderDetails(temp)
        
      })
      .catch((error)=>{
        console.log(error)
      })
    }

  },[])

  return (
    <div>
      <Paper elevation={0} style={{ margin: MainMargin, padding: MainMargin }}>
        <Grid container   justifyContent="space-between"
>
          <Grid xs={6}>
          <h1>{orderDetails._id}</h1>
          
          </Grid>
     
            <Grid>
            <h6 style={{color:"gray",marginTop:"40px"}} >
            Date/Time- {orderDetails.createdAt}
            </h6>
          </Grid>
          
          <Grid>
            <h6 style={{color:"gray",marginTop:"40px"}} >
            #userId- {orderDetails.createdBy}

            </h6>
          </Grid>
         
        </Grid>
        <h3>
          Items List
        </h3>
        <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
             <b> Details</b>
            </TableCell>
            <TableCell align="right"><b>Price</b></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Material Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails?.product?.map((row) => (
            <TableRow key={row.category._id}>
              <TableCell>{row.category.name}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.qty * row.price}</TableCell>
            </TableRow>
          ))}

          
          <TableRow>
         
          </TableRow>
          <TableRow>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Tracker status={status} updateStatus={updateStatus} orderId={loc.state?.id}/>
      </Paper>
    </div>
  );
}
