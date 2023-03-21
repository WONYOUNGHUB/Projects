import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "components/common/GlobalProvider";

import './ShopHome.css';

export default function ShopDetail(props) {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [shopSeq, setShopSeq] = useState(props.shopSeq);
  const [shoplist, setShoplist] = useState([]);
  const [shop, setShop] = useState({});

  const shopSelect = () => {
    globalAxios(`/shop/shopListByseq/${shopSeq}`, 'get', {}, res => {
      if (res) {
        console.log(res);
        setShop(res);
        // setShoplist(res);
      } else {
        alert("failed to");
      }
    });
  }

  useEffect(shopSelect, []);


  return (
    <div>
      {/* <h1>매장 정보 페이지</h1> */}
      <h1>{shop.shopName}</h1>

      <div>
        <h5>-사장님 알림-</h5>
        <h6>{shop.shopNotice}</h6>
      </div>
    </div>
  )
}
