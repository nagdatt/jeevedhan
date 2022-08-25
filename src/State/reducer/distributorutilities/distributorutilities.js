import axios from "axios";

import {useSelector,useDispatch} from 'react-redux';


const getDistributionHistory=()=>{
    // const user=useSelector((state)=> state.getUser)
    
  const returnAray =[]
    axios
      .get("http://localhost:2000/distributor/getdistributortransaction?id=62fa061a130d5d44136176ad").then((data) => {
        const temp = data.data.orders;
        for (var i in temp){
          returnAray.push({
            "id":temp[i]._id,
            "productlength":temp[i].products.length,
            "status":temp[i].status,
              "products":temp[i].products,
            "createdBy":temp[i].orderBy,
            "createdDate":temp[i].createdAt,


          })
        }
        console.log("regular orders",returnAray)
        
           // console.log(returnAray)

    }) .catch((error) =>{        console.log(error)
    });

    return returnAray;
}








export const distributionhistory=getDistributionHistory()
