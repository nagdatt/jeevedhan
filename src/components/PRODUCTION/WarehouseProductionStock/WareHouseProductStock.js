import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { MainMargin } from '../../../dimentions/Margins';

 
const SampleCard = ({id,name,available,maxSize,unit,lastUpdated})=> {
  const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenInfoDialog(true);
  };

  const handleClose = () => {
    setOpenInfoDialog(false);
  };
  const handleClickOpenUpdate = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate  = () => {
    setOpenUpdateDialog(false);
  };

  return (
  
  <React.Fragment>
    <InfoMaterialCard open={openInfoDialog}
    onClose={handleClose} />
    <UpdateMaterialCard open={openUpdateDialog}
    onClose={handleCloseUpdate} />
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      <Chip label="Most used" variant="outlined" color="success"  size="small"/>

      </Typography>
      <Typography variant="h5" component="div" style={{cursor:"pointer"}} onClick={handleClickOpen}>
       {name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       Available - {available}
      </Typography>
      <Typography variant="body2">
      <TableContainer >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Max  Size</TableCell>
            <TableCell align="right">Last updated</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>{maxSize}  {unit}<span style={{color:"blue",cursor:"pointer"}} onClick={handleClickOpenUpdate}>(update)</span></TableCell>
            <TableCell align="right">{lastUpdated}</TableCell>

            

          </TableRow>
          </Table>
          </TableContainer>
      </Typography>
    </CardContent>
    {/* <CardActions>
       <Button size="small">Learn More</Button> 
    </CardActions> */}
  </React.Fragment>
);}
const InfoMaterialCard=(props)=>{
  

  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
     {" Soyabeen "}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button  onClick={props.onClose} autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
  )
}

const UpdateMaterialCard=(props)=>{
  

  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
     {" Soyabeen "}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Enter new storage size, Click on send otp, We will send otp to admins phone no.
      </DialogContentText>
     <Grid container>
      <Grid>
      <TextField
          
           
            id="name"
            label="New Size"
            type="number"
            fullWidth
            variant="standard"
          />
      </Grid>
      <Grid>
      <TextField
           
           
            id="name"
            label="OTP"
            type="number"
            style={{marginLeft:MainMargin}}
            
            fullWidth
            variant="standard"
          />
      </Grid>
     </Grid>
    </DialogContent>
    <DialogActions>
    <Button  onClick={props.onClose} >
        Send OTP
      </Button>
      <Button  onClick={props.onClose} >
        Verify
      </Button>
      <Button  onClick={props.onClose} disabled>
        confirm
      </Button>
    </DialogActions>
  </Dialog>
  )
}
export default function WareHouseProductStock({id,name,available,maxSize,unit,lastUpdated}) {


  return (
    <Box >

      <Card variant="outlined"><SampleCard  
      
      name={name}
      
      id={id}
      available={available}
      maxSize={maxSize}
      unit={unit}
      lastUpdated={lastUpdated}
      /></Card>
    </Box>
  );
}
