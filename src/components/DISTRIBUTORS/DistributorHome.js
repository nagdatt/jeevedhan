import React from 'react'
import DistributorHeader from './DistributorsHeader/DistributorHeader'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DistrutionOrdersList from './DistributorsHeader/DistributorOrderProduct/DistributionOrdersList'
import DistributionHistoryList from './DistributorsHeader/DistributorHistory/DistributionHistoryList'
import DistributionHistory from './DistributorsHeader/DistributorHistory/DistributionHistory'

export default function ProductionHome() {
  return (
    <div>
       <Router>
       <DistributorHeader/>
    <Routes>
      <Route exact path="/" element={ <DistrutionOrdersList />  }/>
      <Route exact path="/returnProduct" element={ <DistrutionOrdersList />  }/>

      <Route exact path="/transactionHistory" element={ <DistributionHistoryList />  }/>
      <Route exact path="/track" element={ <DistributionHistory />  }/>



    </Routes>

    {/*  */}
    {/*  */}
  </Router>
    </div>
  )
}
