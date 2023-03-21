import React from "react";
import "./BodyHome.css";
import { Routes, Route } from 'react-router';

import SocialLogin from "components/member/SocialLogin";
import KakaoMap from "components/common/map/KakaoMap";
import MyOrderList from "components/order/MyOrderList";
import Manager from "components/manager/Manager";
import MyCoupon from "components/coupon/MyCoupon";

import Menu from "components/menu/Menu";
import MenuQR from "components/menu/MenuQR";
import MenuListQR from "components/menu/MenuListQR";

import ReviewInsert from "components/review/components/ReviewInsert";
import Admin from "components/review/mempage/Admin";
import Business from "components/review/mempage/Business";
import Normal from "components/review/mempage/Normal";

import AdminStatistics from "components/review/mempage/admin/AdminStatistics";
import Management from "components/review/mempage/admin/Management";
import NickModify from "components/review/mempage/business/NickModify";
import StoreReviewManage from "components/review/mempage/business/StoreReviewManage";
import OrderManageQR from "components/review/mempage/business/OrderManageQR";
import OrderList from "components/review/mempage/normal/OrderList";

import AuthChecker from "components/common/auth/AuthChecker";
import MyReview from "components/review/mempage/normal/MyReview";

import CkNoticeInsert from "components/noticeboard/CkNoticeInsert";
import NoticeDelete from "components/noticeboard/NoticeDelete";
import NoticeDetail from "components/noticeboard/NoticeDetail";
import NoticeUpdate from "components/noticeboard/NoticeUpdate";
import CkNoticeUpdate from "components/noticeboard/CkNoticeUpdate";
import NoticeList from "components/noticeboard/NoticeList";
import AdInsert2 from "components/advertisement/AdInsert2";
import AdList from "components/advertisement/AdList";
import AdDelete from "components/advertisement/AdDelete";
import ImgSlider from "components/advertisement/ImgSlider";
import SearchResult from "components/search/SearchResult";

import MainCarousel from "components/common/carousel/MainCarousel"

import Shop from 'components/shop/pages/Home.js'
import ShopInsert from 'components/shop/pages/ShopInsert'
import ShopUpdate from 'components/shop/pages/ShopUpdate'
import ShopList from 'components/shop/pages/ShopList'


const BodyHome = () => {

  const defaultPage = <>
    <MainCarousel />
    <KakaoMap />
  </>;

  return (
    <>
      <Routes>
        <Route path="/" element={defaultPage} />

        <Route path="/sociallogin/*" element={<SocialLogin />} />
        <Route path="/orderlist/*" element={<AuthChecker><MyOrderList /></AuthChecker>} />
        <Route path="/manager/*" element={<AuthChecker memType="사업자회원"><Manager /></AuthChecker>} />
        <Route path="/mycoupon" element={<AuthChecker><MyCoupon /></AuthChecker>} />

        <Route path="/menu/*" element={<Menu />} />
        <Route path="/menuQR/:shopSeq/:tableNum" element={<AuthChecker><MenuQR /></AuthChecker>} />
        <Route path="/menuQRnew/:shopSeq/:tableNum" element={<AuthChecker><MenuListQR /></AuthChecker>} />

        <Route path="/reviewInsert" element={<ReviewInsert />} />
        <Route path="/admin" element={<AuthChecker memType="관리자"><Admin /></AuthChecker>} />
        <Route path="/admin/management" element={<AuthChecker memType="관리자"><Management /></AuthChecker>} />
        <Route path="/admin/statistics" element={<AuthChecker memType="관리자"><AdminStatistics /></AuthChecker>} />

        <Route path="/business" element={<AuthChecker memType="사업자회원"><Business /></AuthChecker>} />
        <Route path="/business/nickModify" element={<AuthChecker memType="사업자회원"><NickModify /></AuthChecker>} />
        <Route path="/business/storeReviewManage" element={<AuthChecker memType="사업자회원"><StoreReviewManage /></AuthChecker>} />
        <Route path="/business/orderManageQR" element={<AuthChecker memType="사업자회원"><OrderManageQR /></AuthChecker>} />

        <Route path="/normal" element={<AuthChecker memType="일반회원"><Normal /></AuthChecker>} />
        <Route path="/normal/nickmodify" element={<AuthChecker memType="일반회원"><NickModify /></AuthChecker>} />
        <Route path="/normal/reviewMemList" element={<AuthChecker memType="일반회원"><MyReview /></AuthChecker>} />
        <Route path="/normal/reviewInsert/:orderGroupSeq" element={<AuthChecker memType="일반회원"><ReviewInsert /></AuthChecker>} />
        <Route path="/normal/orderList" element={<AuthChecker memType="일반회원"><OrderList /></AuthChecker>} />

        <Route path="/NoticeBoard/NoticeList" element={<NoticeList/>} />
        <Route path="/NoticeBoard/NoticeDetail/:noticeBoardSeq" element={<NoticeDetail/>} />
        <Route path="/NoticeBoard/NoticeUpdate" element={<NoticeUpdate/>} />
        <Route path="/NoticeBoard/CkNoticeUpdate" element={<CkNoticeUpdate/>} />
        <Route path="/NoticeBoard/NoticeDelete" element={<NoticeDelete/>} />
        <Route path="/NoticeBoard/CkNoticeInsert" element={<CkNoticeInsert/>} />
        <Route path="/advertisement/AdList " element={<AdList />} /> 
        <Route path="/advertisement/AdInsert2" element={<AdInsert2/>} />
        <Route path="/advertisement/AdDelete" element={<AdDelete/>} />
        <Route path="/advertisement/ImgSlider" element={<ImgSlider/>} />
        <Route path="/search/SearchResult" element={<SearchResult />} />

        <Route path="/shop/:shopSeq" element={<Shop />} />
        <Route path='/shopinsert' element={<ShopInsert />} />
        <Route path='/shopupdate/:shopSeq' element={<ShopUpdate />} />
        <Route path='/shoplist' element={<ShopList />} />


      </Routes>

    </>
  );
}
export default BodyHome;