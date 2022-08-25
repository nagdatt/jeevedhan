import axios from "axios";

const getResourcesStore=()=>{
    const arr = [];
    axios
      .get("http://localhost:2000/admin/getresource").then((data) => {
        const temp = data.data;

        for (var v in temp) {
          arr.push({ label: temp[v].name });
        }
      
      })
      .catch((error) => {
        console.log(error)
       });
        return arr;
}

const getRawMaterialsStore=()=>{
    const arrName = [];
    const unitsOrignal=[]
    const BigArray=[]
    const returnArray=[]
    axios.get("http://localhost:2000/admin/getall").then((data) => {
        
      const temp = data.data;
      
      for (var i in temp){
        arrName.push({ label: temp[i].name ,id:temp[i]._id});
        const pre= temp[i]
        const types=[]
        const units=new Set()

       for (var j in  pre.rowmaterials){
        types.push({label:pre.rowmaterials[j].name,id:pre.rowmaterials[j]._id})
        if(!units.has(pre.rowmaterials[j].unit)){
          unitsOrignal.push({ label:pre.rowmaterials[j].unit });

        }
        units.add(pre.rowmaterials[j].unit)
      }

      BigArray.push({label: temp[i].name ,rawMaterials:types,units:unitsOrignal})
     
     
    }
    console.log(BigArray[0].rawMaterials)
    returnArray.push(BigArray)
    returnArray.push(BigArray[0].rawMaterials)
    returnArray.push(BigArray[0].units)
    returnArray.push(arrName)
    
    

      })

      .catch((error) =>{        console.log(error)
       });

        return returnArray;
}

const getRawStocksStore=()=>{
  const returnAray =[]
    axios
      .get("http://localhost:2000/warehouse/getstock").then((data) => {
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

const getOrders=()=>{
  const returnArray=[]
  axios
      .get("http://localhost:2000/order/getorders").then((data) => {
        const temp=data.data.orders
        for(var i in temp){
         // console.log(temp[i])
          var qty=0
          var pro=temp[i].product
          for( var j in pro){
            qty=qty+pro[j].qty
          }
          returnArray.push({
            "id":temp[i]._id,
            "productlength":temp[i].product.length,
            "status":temp[i].status,
            "from":temp[i].from?.name,
            "createdBy":temp[i].createdBy,
            "createdDate":temp[i].createdAt,
            "qty":qty

          })
        
        }
      })
      .catch((error)=>{
        console.log(error)
      })

     console.log("returnorders",returnArray)
      return returnArray;
}

const getRawUserHistory=()=>{
  // const user=useSelector((state)=> state.getUser)
  
const returnAray =[]
  axios
    .get("http://localhost:2000/admin/stockhistory?id=62fa061a130d5d44136176ad").then((data) => {
      const temp = data.data;
      for (var i in temp){
        returnAray.push({
          "id":temp[i]._id,
          "productlength":temp[i].materials.length,
          "status":temp[i].status,
            "products":temp[i].products,
          "createdBy":temp[i].addedBy.name,
          "createdDate":temp[i].createdAt,


        })
      }
      
         // console.log(returnAray)

  }) .catch((error) =>{        console.log(error)
  });

  return returnAray;
}








export const rawhistory=getRawUserHistory()
export const resource=getResourcesStore()
export const rawmaterials=getRawMaterialsStore()
export const rawstocks=getRawStocksStore()
export const allorders=getOrders()
export const users={
  name:"Nagdatt",
  id:"62fa061a130d5d44136176ad",
  email:"abc@gmail.com"
}
