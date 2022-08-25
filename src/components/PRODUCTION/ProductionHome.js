import React from 'react'
import ProductionHeader from './ProductionHeader.js/ProductionHeader'
import MakeOrder from './MakeOrder/MakeOrder'
import ProductionRawMaterialTypes from './MakeOrder/ProductionRawMaterialTypes'
import Stocks from './Stock/Stocks'
import MakeProductType from './MakeProduct/MakeProductType'
import WareHouseProductStocks from './WarehouseProductionStock/WareHouseProductStocks'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

    </Routes>

    {/*  */}
    {/*  */}
  </Router>
    </div>
  )
}
