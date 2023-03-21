import React,{ useContext } from "react";
import { Route, Routes,Link } from "react-router-dom";
import MJH from "components/common/TestUser/MJH"
import JYH from "components/common/TestUser/JYH"
import LDS from "components/common/TestUser/LDS"
import LJW from "components/common/TestUser/LJW"
import SWY from "components/common/TestUser/SWY"
import NotFound from "components/common/NotFound";
import LogInOutButton from "components/member/LogInOutButton"
import HeaderJ from "components/common/Header/HeaderJ"


import {GlobalContext} from "components/common/GlobalProvider";


const TestPage = ()=> {

  const {logined,memNick} = useContext(GlobalContext);

  return (
    <>
    <HeaderJ/>
    <Link to="MJH">명준희 </Link> 
    <Link to="JYH">정영훈 </Link> 
    <Link to="LDS">이덕수 </Link> 
    <Link to="LJW">이정우 </Link> 
    <Link to="SWY">서원영 </Link> 
    ...............
    {memNick} {logined?'님 안녕하세요':''}
    <LogInOutButton/>

    <hr/>

    <Routes>
        <Route path="/" element={<><h1>홈</h1></>} />
        <Route path="/MJH/*" element={<MJH/>} />
        <Route path="/JYH/*" element={<JYH />} />
        <Route path="/LDS/*" element={<LDS />} />
        <Route path="/LJW/*" element={<LJW />} />
        <Route path="/SWY/*" element={<SWY />} />
        <Route path="*" element={<NotFound/>} />
    </Routes>

    </>
  );
}
export default TestPage;