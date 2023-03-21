import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../../shop/pages/Home.js'
import ShopInsert from 'components/shop/pages/ShopInsert'
import ShopUpdate from 'components/shop/pages/ShopUpdate'
import ShopList from 'components/shop/pages/ShopList'

const LJW = () => {
  return (
    <>
      <h1>이정우 테스트 페이지</h1>
      {/* <Home /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/shopinsert' element={<ShopInsert />} />
        <Route path='/shopupdate/:shopSeq' element={<ShopUpdate />} />
        <Route path='/shoplist' element={<ShopList />} />



      </Routes>







    </>
  );
}
export default LJW;