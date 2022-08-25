import axios from "axios";


const getRawProductionStocksStore=()=>{
  const returnAray =[]
    axios
      .get("http://localhost:2000/production/getstock").then((data) => {
        const temp = data.data;
        //console.log(temp[0])
        for (var i in temp){
        
          returnAray.push({
            "id":temp[i]._id,
            "available":temp[i].available,
            "maxSize":temp[i].maxSize,
            "name":temp[i].id.name,
            "unit":temp[i].id.unit,
            "lastUpdated":temp[i].updatedAt

          })
        }
        
           // console.log(returnAray)

    }) .catch((error) =>{        console.log(error)
    });

    return returnAray;
}


const getRawProductionProductStocksStore=()=>{
  const returnAray =[]
    axios
      .get("http://localhost:2000/production/getprodutstock").then((data) => {
        const temp = data.data;
        //console.log(temp[0])
        for (var i in temp){
        
          returnAray.push({
            "id":temp[i]._id,
            "available":temp[i].available,
            "maxSize":temp[i].maxSize,
            "name":temp[i].id.name,
            "unit":temp[i].id.unit,
            "lastUpdated":temp[i].updatedAt

          })
        }
        
           // console.log(returnAray)

    }) .catch((error) =>{        console.log(error)
    });

    return returnAray;
}




export const productionrawstocks=getRawProductionStocksStore()
export const productionproductroawstocks=getRawProductionProductStocksStore()
export const users={
  name:"Nagdatt",
  id:"62fa061a130d5d44136176ad",
  email:"abc@gmail.com"
}
