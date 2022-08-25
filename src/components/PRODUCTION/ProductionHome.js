import React from 'react'
import ProductionHeader from './ProductionHeader.js/ProductionHeader'
import MakeOrder from './MakeOrder/MakeOrder'
import ProductionRawMaterialTypes from './MakeOrder/ProductionRawMaterialTypes'
import Stocks from './Stock/Stocks'
import MakeProductType from './MakeProduct/MakeProductType'
import ProductionTransactionHistories from './ProductionTransactionHistory/ProductionTransactionHistories'
import WareHouseProductStocks from './WarehouseProductionStock/WareHouseProductStocks'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductionTransactionHistory from './ProductionTransactionHistory/ProductionTransactionHistory'

export default function ProductionHome() {
  return (
    <div>
<Router>
<ProductionHeader/>
    <Routes>
      <Route exact path="/" element={ <ProductionRawMaterialTypes/>  }/>

      <Route exact path="/productionStock" element={ <Stocks/>  }/>
      <Route exact path="/MakeProduct" element={ <MakeProductType/>  }/>

      <Route exact path="/ProductWareHouse" element={ <WareHouseProductStocks/>  }/>
      <Route exact path="/transactionhistory" element={ <ProductionTransactionHistories/>  }/>
      <Route exact path="/singleHistory" element={ <ProductionTransactionHistory/>  }/>

    </Routes>

    {/*  */}
    {/*  */}
  </Router>
    </div>
  )
}
