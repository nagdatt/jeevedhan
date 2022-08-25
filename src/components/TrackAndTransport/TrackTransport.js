import React, { useEffect } from 'react'
import Tracker from './Tracker'
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import {MainMargin} from './../../dimentions/Margins'

const TrackTransport=()=> {
const [trackers,setTrackers]=React.useState([1,2,3,4,42,10,11])
const [displayTrackers,setDisplayTrackers]=React.useState([1,2,3,4,5])

const [page, setPage] = React.useState(1);
const handleChange = (event, value) => {
  setPage(value);
};
useEffect(()=>{
    
    setDisplayTrackers(trackers.slice(page*5-5,page*5))

})
const pageSize=Math.round(Math.ceil(trackers.length/5))
  return (
    <div style={{margin:MainMargin}}>

{/* <Pagination count={pageSize}  onChange={handleChange} color="primary" style={{display:"flex",alignContent:"center",justifyContent:"center"}} /> */}
{
    displayTrackers.map((id)=>{
      return  <><Tracker key={id}/>
    
      
      </>
    })
}
    
 
<Pagination count={pageSize}  onChange={handleChange} color="primary" style={{display:"flex",alignContent:"center",justifyContent:"center"}} />

    </div>
  )
}

export default TrackTransport