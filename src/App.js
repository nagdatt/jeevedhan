import "./App.css";
import Header from "./components/Header";
import RawMaterialTypes from "./components/AddUpdate/RawMaterialTypes";
import SignIn from "./components/SignIn";
import TrackTransport from "./components/TrackAndTransport/TrackTransport";
import Storages from './components/Storages/Storages'
import Orders from './components/Orders/Orders'
import Order from './components/Orders/Order'
import TransactionHistory from './components/TransactionHistory/TransactionHistory'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import DistributorHome from './components/DISTRIBUTORS/DistributorHome'
import ProductionHome from './components/PRODUCTION/ProductionHome'
import WareHouseHome from "./components/WAREHOUSE/WareHouseHome/WareHouseHome";
import FarmersPosts from "./components/FarmersPost/FarmersPosts";
import { useJwt } from "react-jwt";
function App() {
  //1 RawMaterials
  //2 Production House
  //3 WareHouse
  const [isLoggedIn,setIsLoggedIn]=React.useState([false,1]);
  React.useEffect(()=>{
    if(sessionStorage.getItem("user")){
      // sessionStorage.clear()
     setIsLoggedIn([true,sessionStorage.getItem("roleId")])
    }
  },[])
  
  return isLoggedIn[0]?  (
  isLoggedIn[1]==1?( <RawMaterialsHome />): isLoggedIn[1]==2?
  
  (<ProductionHome/>):isLoggedIn[1]==3?(<WareHouseHome/>):(<DistributorHome/>)
  ):(<SignIn setIsLoggedIn={setIsLoggedIn}/>);
}





const RawMaterialsHome=()=>{
 
  return (
    <Router>
{/* <div>Hello</div> */}
<Header/>

      <Routes>
        <Route exact path="/" element={ <RawMaterialTypes />  }>
        
          {/* <RawMaterialTypes/> */}
        </Route>
        <Route path="/SignIn" element={   <SignIn />}>
        
        </Route>
        <Route path="/TrackTransport" element={  <TrackTransport />} > 
        
        </Route>
        <Route path="/Storage" element={  <Storages />} > 
        </Route>
        <Route path="/Orders" element={  <Orders />} /> 
        <Route path="/Order" element={  <Order />} /> 
        <Route path="/transactionHistory" element={  <TransactionHistory />} /> 
        <Route path="/farmerPost" element={  <FarmersPosts/> } /> 

    </Routes>

    {/*  */}
    {/*  */}
  </Router>
  )
}
export default App;
