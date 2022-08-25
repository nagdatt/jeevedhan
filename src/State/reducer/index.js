import {getResources,getRawMaterials,getRawStocks,getOrders,getUser,
    getProductionRawMaterials,getProductionProductMaterials, 
    getDistributionNormalOrdersList,getDistributionRegularOrdersList,getDistributionHistory} from './backendData1'
import {combineReducers} from 'redux'
const  rootReducer=combineReducers({
    getResources,
    getRawMaterials,
    getRawStocks,
    getOrders,
    getUser,
    getProductionRawMaterials,
    getProductionProductMaterials,
    getDistributionNormalOrdersList,
    getDistributionRegularOrdersList,
    getDistributionHistory
})
export default rootReducer;