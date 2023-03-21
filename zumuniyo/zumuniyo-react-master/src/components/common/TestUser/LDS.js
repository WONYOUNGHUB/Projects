import React from "react";
import FloatingActionButtonZoom from "components/review/components/FloatingActionButton";

// import { useContext } from "react";
// import { GlobalContext } from "components/common/GlobalProvider";
import { Route, Routes } from "react-router-dom";



import ReviewViewForm from "components/review/components/ReviewViewForm";
import ReviewInsert from "components/review/components/ReviewInsert";
import Admin from "components/review/mempage/Admin";
import Business from "components/review/mempage/Business";
import Normal from "components/review/mempage/Normal";
import NotFound from "components/common/NotFound";

import AdminStatistics from "components/review/mempage/admin/AdminStatistics";
import Management from "components/review/mempage/admin/Management";
import NickModify from "components/review/mempage/business/NickModify";
import StoreReviewManage from "components/review/mempage/business/StoreReviewManage";
import OrderManageQR from "components/review/mempage/business/OrderManageQR";
import OrderList from "components/review/mempage/normal/OrderList";

import AuthChecker from "components/common/auth/AuthChecker";
import MyReview from "components/review/mempage/normal/MyReview";


const LDS = () => {
  // const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  return (
    <>    
      <Routes>
        <Route path="/" element={<><h1>이덕수 테스트 페이지</h1> <div><FloatingActionButtonZoom /> </div></>} />

        {/* 리뷰 */}
        {/* <Route path="/reviewAllList" element={<MyReview />} /> */}
        <Route path="/reviewInsert" element={<ReviewInsert />} />

        {/* 관리자 */}
        <Route path="/admin" element={<AuthChecker memType="관리자"><Admin /></AuthChecker>} />
        <Route path="/admin/management" element={<AuthChecker memType="관리자"><Management /></AuthChecker>} />
        <Route path="/admin/statistics" element={<AuthChecker memType="관리자"><AdminStatistics /></AuthChecker>} />


        {/* 사업자회원 */}
        <Route path="/business" element={<AuthChecker memType="사업자회원"><Business /></AuthChecker>} />
        <Route path="/business/nickModify" element={<AuthChecker memType="사업자회원"><NickModify /></AuthChecker>} />
        <Route path="/business/storeReviewManage" element={<AuthChecker memType="사업자회원"><StoreReviewManage /></AuthChecker>} />
        <Route path="/business/orderManageQR" element={<AuthChecker memType="사업자회원"><OrderManageQR /></AuthChecker>} />


        {/* 일반회원 */}
        <Route path="/normal" element={<AuthChecker memType="일반회원"><Normal /></AuthChecker>} />        
        <Route path="/normal/nickmodify" element={<AuthChecker memType="일반회원"><NickModify /></AuthChecker>} />
        <Route path="/normal/reviewMemList" element={<AuthChecker memType="일반회원"><MyReview /></AuthChecker>} />
        <Route path="/normal/reviewInsert/:orderGroupSeq" element={<AuthChecker memType="일반회원"><ReviewInsert /></AuthChecker>} />
        <Route path="/normal/orderList" element={<AuthChecker memType="일반회원"><OrderList /></AuthChecker>} />  

        
        <Route path="/admin/*" element={<NotFound />} />
        <Route path="/business/*" element={<NotFound />} />
        <Route path="/normal/*" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


      {/* { memType==='일반회원'? 
      <div>
          <FloatingActionButtonZoom/>  
      </div>
      :
      <div>
        <h1>일반회원이 아닙니다</h1>
      </div> 
      } */}

      {/* <div>
          <h1>이덕수 테스트 페이지</h1>
          <FloatingActionButtonZoom/>  
      </div> */}

    </>
  );
}
export default LDS;