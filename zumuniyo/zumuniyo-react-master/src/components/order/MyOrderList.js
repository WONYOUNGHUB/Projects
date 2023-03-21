import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderList from "components/order/OrderList";
import OrderGroupList from "components/order/OrderGroupList";
import AuthChecker from "components/common/auth/AuthChecker";
const MyOrderList = ()=> {

    

    return (
      <>
        <Routes>
          <Route path="/" element={<AuthChecker><OrderGroupList/></AuthChecker>}/>
          <Route path="/:orderGroupSeq" element={<><AuthChecker><OrderList/></AuthChecker></>} />
        </Routes>
      </>
    );
  }
  export default MyOrderList;
  