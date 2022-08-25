import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WareHouseProductStocks from '../../PRODUCTION/WarehouseProductionStock/WareHouseProductStocks';
import WareHouseHeader from './../WareHouseHeader/WareHouseHeader'
import WareHouseOrders from './../WareHouseOrders/WareHouseOrders'
import WareHouseOrder from './../WareHouseOrders/WareHouseOrder'

import WareHouseRegularOrders from './../WareHouseRegularOrders/WareHouseRegularOrders'
import WareHouseRegularOrder from './../WareHouseRegularOrders/WareHouseRegularOrder'

export default function WareHouseHome() {
  return (
    <div>
<Router>
<WareHouseHeader/>
    <Routes>
    <Route exact path="/" element={ <WareHouseProductStocks/>  }/>
    <Route exact path="/WareHouseOrders" element={ <WareHouseOrders/>  }/>
    <Route exact path="/WareHouseOrder" element={ <WareHouseOrder/>  }/>

    <Route exact path="/RegularDistributors" element={ <WareHouseRegularOrders/>  }/>
    <Route exact path="/WareHouseRegularOrder" element={ <WareHouseRegularOrder/>  }/>


    </Routes>

    {/*  */}
    {/*  */}
  </Router>
    </div>
  )
}
