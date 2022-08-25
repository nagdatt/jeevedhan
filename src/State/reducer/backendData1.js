
import axios from "axios";
import { resource,rawmaterials, rawstocks, allorders ,users} from "./RawMaterialsPerson/rawmaterialsutilities";
import {productionrawstocks,productionproductroawstocks} from './ProductionPerson/productionutilities'
import {distributionNormalOrders,distributionRegularOrders} from './warehouse/warehouseutilities'
import {distributionhistory} from './distributorutilities/distributorutilities'

const user=users

export const getUser=(state=user,action)=>{
    switch(action.type){
        default:return state;
    }

}


const initialState1=resource
export const getResources=(state=initialState1,action)=>{
    switch(action.type){
        default:return state;
    }

}
const initialState2=rawmaterials

export const getRawMaterials=(state=initialState2,action)=>{
    switch(action.type){
        default:return state;
    }

    
}
const initialState3=rawstocks

export const getRawStocks=(state=initialState3,action)=>{
    switch(action.type){
       
            
        default:return state;
    }

}
const initialState4=allorders

export const getOrders=(state=initialState4,action)=>{
    switch(action.type){
        default:return state;
    }

}

const initialState6=productionrawstocks
export const getProductionRawMaterials=(state=initialState6,action)=>{
    switch(action.type){
        default:return state;
    }

    
}

const initialState7=productionproductroawstocks
export const getProductionProductMaterials=(state=initialState7,action)=>{
    switch(action.type){
        default:return state;
    }

}

const initialState8=distributionNormalOrders
export const getDistributionNormalOrdersList=(state=initialState8,action)=>{
    switch(action.type){
        default:return state;
    }

}
const initialState9=distributionRegularOrders
export const getDistributionRegularOrdersList=(state=initialState9,action)=>{
    switch(action.type){
        default:return state;
    }

}
const initialState10=distributionhistory
export const getDistributionHistory=(state=initialState10,action)=>{
    switch(action.type){
        default:return state;
    }

}



