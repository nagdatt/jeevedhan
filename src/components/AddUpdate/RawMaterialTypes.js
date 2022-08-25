import * as React from "react";
import Box from "@mui/material/Box";
import EdiablePlantOils from "./EdiablePlantOils";
import {
  MainMargin,
  MarginTop,
  LargePadding,
} from "./../../dimentions/Margins";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux';
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RawMaterialTypes() {
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
    { label: "Non Ediable Oil" },
    
  ]);
  const [resources, setResources] = React.useState([
    { label: "Samarth Kalshetti" },
    { label: "Location 2" },
  ]);
 

  
  const [catagoryType, setCatagoryType] = React.useState(TypesOf[0]);
  const [resourcePerson, setResourcePerson] = React.useState(resources[0]);
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
              }}
              renderInput={(params) => (
                <TextField {...params} label="Catagory" />
              )}
            />
          </Grid>
          <Grid xs={3}>
            <Autocomplete
              value={resourcePerson}
              disablePortal
              id="combo-box-demo"
              options={resources}
              onChange={(event, newVal) => {
                setResourcePerson(newVal.label);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Resources From"
                  style={{ marginLeft: MarginTop }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>

      <EdiablePlantOils
        catagoryType={catagoryType}
        resourcePerson={resourcePerson}
         SubTypesOf ={SubTypesOf}
         InputType={InputType}
      />
    </Box>
  );
}
