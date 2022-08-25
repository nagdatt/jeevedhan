import * as React from "react";

import Box from "@mui/material/Box";
import DistributionOrder from "./DistributionOrder";
import axios from "axios";
import {useSelector} from 'react-redux';
import { MainMargin,MarginTop,LargePadding } from "./../../../../dimentions/Margins";
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DistributionOrdersList() {
  const arr=useSelector(((state)=> state.getResources))
  const MainArray=useSelector(((state)=> state.getRawMaterials))

  React.useEffect(() => {
    
    
        setResources(arr);
      

    axios.get("http://localhost:2000/admin/getall").then((data) => {
        
      
   
    setBigArray(MainArray[0])
    setSubTypesOf(MainArray[1])
    setInputType(MainArray[2])
      setTypesOf(MainArray[3]);


      })

     
  },[]);
  const [bigArray,setBigArray]=React.useState([])
  const [TypesOf,setTypesOf] =React.useState( [
    { label: "Ediable Oil" },
   
    
  ]);
  const [resources, setResources] = React.useState([
    { label: "Samarth Kalshetti" },
  ]);
 

  
  const [catagoryType, setCatagoryType] = React.useState(TypesOf[0]);
  const [catagoryID, setCatagoryID] = React.useState(TypesOf[0]?.id);
  const [Quantity, setQuantity] = React.useState(1);
  React.useEffect(()=>{
    for (var i in bigArray){
      if(bigArray[i].label==catagoryType){
        setSubTypesOf(bigArray[i].rawMaterials)
        setInputType( bigArray[i].units)
      }
    }

},[catagoryType])
 const [InputType,setInputType] = React.useState([
  { label: "KG" },
 
]);
  const [SubTypesOf,setSubTypesOf] =React.useState( [
    { label: "Soyabeen" },
    
  ]);
 

  return (
    <Box sx={{ margin: MainMargin }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  variant="fullWidth" aria-label="basic tabs example" centered> 
          <Tab  fullWidth={true} label="Edible plant oils" {...a11yProps(0) }/>
          <Tab  fullWidth={true} label=" Non-edible plant oils" {...a11yProps(1)} />
          <Tab  fullWidth={true} label="Used edible oils" {...a11yProps(2)} />
          <Tab fullWidth={true} label="Microalgae" {...a11yProps(3)} />
          <Tab fullWidth={true} label="Animal fats" {...a11yProps(4)} />
          

         
        </Tabs>
      </Box> */}

      <Paper variant="outlined" style={{ padding: LargePadding }}>
        <Grid container>
          <Grid xs={3}>
            <Autocomplete
              value={catagoryType}
              disablePortal
              id="combo-box-demo"
              options={TypesOf}
              onChange={(event, newVal) => {
                setCatagoryType(newVal.label);
                setCatagoryID(newVal.id)
              }}
              renderInput={(params) => (
                <TextField {...params} label="Catagory" />
              )}
            />
          </Grid>
          <Grid xs={3}>
          <TextField
            id="outlined-basic"
            label="Quantity"
           value={Quantity}
           onChange={(event)=>{
            setQuantity(event.target.value)
            console.log(event.target.value)
           }}
            style={{ marginLeft: "5px" }}
            variant="outlined"
            fullWidth
          />
          </Grid>
        
          
        </Grid>
      </Paper>

      <DistributionOrder
        catagoryType={catagoryType}
        catagoryID={catagoryID}
        resourcePerson={Quantity}
         SubTypesOf ={SubTypesOf}
         InputType={InputType}
         
      />
    </Box>
  );
}

