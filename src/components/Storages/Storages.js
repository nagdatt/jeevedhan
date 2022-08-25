import React from "react";
import Storage from "./Storage";
import { MainMargin, MarginTop } from "./../../dimentions/Margins";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Pagination from '@mui/material/Pagination';
import {useSelector,useDispatch} from 'react-redux';

export default function Storages() {
  
  const [storageObj, setStorageObj] = React.useState([]);
const [displaystorageObj,setStorageObjTrackers]=React.useState(storageObj)
const [pageSize,setPageSize]=React.useState(Math.round(Math.ceil(storageObj.length/5)))
const [page, setPage] = React.useState(1);
const handleChangePage = (event, value) => {
  setPage(value);
  setStorageObjTrackers(storageObj.slice(value*6-6,value*6))

};

const selectorData = useSelector((state)=> state.getRawStocks);
const [arr, setArr] = React.useState(selectorData);
React.useEffect(()=>{
  setStorageObjTrackers(storageObj.slice(page*6-6,page*6))
  setPageSize(Math.round(Math.ceil(storageObj.length/6)))
},[storageObj])
React.useEffect(()=>{
  setStorageObj(arr)
  

},[])
  return (
    <div style={{ margin: MainMargin, marginBottom: MarginTop ,marginTop:"-10px"}}>
      <Grid container style={{ margin: MarginTop }} justifyContent="flex-end">
        <Grid style={{marginRight:MarginTop}}>
       <h3> SORT BY</h3>
        </Grid>
        <Grid style={{marginRight:MarginTop}}>
        <Autocomplete
      options={[1,2,3,4,5]}
      style={{minWidth:"200px"}}
        id="disable-close-on-select"
        renderInput={(params) => (
          <TextField {...params} label="Catagory" variant="standard" />
        )}
      />
        </Grid>
        <Grid>
        <Autocomplete
      options={[1,2,3,4,5]}
      style={{minWidth:"200px"}}
        id="disable-close-on-select"
        renderInput={(params) => (
          <TextField {...params} label="Catagory" variant="standard" />
        )}
      />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {displaystorageObj.map(({id,name,available,maxSize,unit,lastUpdated}) => {
          return (
            <Grid item key ={id}xs={4}>
              <Storage 
              
              name={name}
              id={id}
              available={available}
              maxSize={maxSize}
              unit={unit}
              lastUpdated={lastUpdated}

              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination count={pageSize}  onChange={handleChangePage} color="primary" style={{display:"flex",alignContent:"center",justifyContent:"center",marginTop:MarginTop}} />

    </div>
  );
}
