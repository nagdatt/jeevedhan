import React from "react";
import { MainMargin, MarginTop } from "./../../../../dimentions/Margins";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tracker from './../../../TrackAndTransport/Tracker'
import {useLocation} from 'react-router'
function createRow(desc, qty, unit) {
  const price = qty * unit;
  return { desc, qty, unit, price };
}

export default function DistributionHistory() {
  const rw=useLocation().state.row
  console.log(rw)
  const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
  ];
  return (
    <div>
      <Paper elevation={0} style={{ margin: MainMargin, padding: MainMargin }}>
        <Grid container   justifyContent="space-between"
>
          <Grid xs={6}>
          <h1> {rw.orderId}</h1>
          </Grid>
     
            <Grid>
            <h6 style={{color:"gray",marginTop:"40px"}} >
            {rw.createdDate}
            </h6>
          </Grid>
          
          <Grid>
            <h6 style={{color:"gray",marginTop:"40px"}} >
            #userId- {rw.userID}
            </h6>
          </Grid>
          <Grid>
            <h6 style={{color:"gray",marginTop:"40px"}} >
           
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
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rw.products.map((row) => (
            <TableRow key={row.id._id}>
              <TableCell>{row.id.name}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.qty*row.price}</TableCell>
            </TableRow>
          ))}

          
          <TableRow>
         
          </TableRow>
          <TableRow>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Tracker/>
      </Paper>
    </div>
  );
}
