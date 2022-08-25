import axios from "axios";


const getDistributionNormalOrders=()=>{
  const returnAray =[]
    axios
      .get("http://localhost:2000/distributor/getnormalorder").then((data) => {
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
        console.log("normal orders",returnAray)
        
           // console.log(returnAray)

    }) .catch((error) =>{        console.log(error)
    });

    return returnAray;
}
const getDistributionRegularOrders=()=>{
  const returnAray =[]
    axios
      .get("http://localhost:2000/distributor/getregularorder").then((data) => {
        const temp = data.data.orders;
        for (var i in temp){
          returnAray.push({
            "id":temp[i]._id,
            "productlength":temp[i].products.length,
            "status":temp[i].status,
              "products":temp[i].products,
            "createdBy":temp[i].orderBy,
            "createdDate":temp[i].createdAt,
            "nextOrderDate":temp[i].nextOrderDate


          })
        }
        
           // console.log(returnAray)

    }) .catch((error) =>{        console.log(error)
    });

    return returnAray;
}








export const distributionNormalOrders=getDistributionNormalOrders()
export const distributionRegularOrders=getDistributionRegularOrders()
