import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "components/common/GlobalProvider";

import './ShopDetail.css';

export default function ShopDetail(props) {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [shopseq, setShopseq] = useState(props.shopseq);
  const [shoplist, setShoplist] = useState([]);
  const [shop, setShop] = useState({});

  const shopSelect = () => {
    globalAxios(`/shop/shopListByseq/${shopseq}`, 'get', {}, res => {
      if (res) {
        console.log(res);
        setShop(res);
      } else {
        alert("failed to");
      }
    });
  }
  const Viewer = ({ content }) => (
    <div style={{ width: "640", height: "200" }}
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
  useEffect(shopSelect, []);


  return (
    <div>
      <h3>짧은 소개</h3>
      <h4>{shop.shopInfo}</h4>

      <h3>매장상세 정보</h3>
      <h4><Viewer content={shop.shopDetail} /></h4>

      <h3>사장님 한마디</h3>
      <h4>{shop.shopNotice}</h4>

      <h3>매장 주소</h3>
      {/* {shop.location} */}
      {/* {shop.location.locAddr} */}
      <h4>{shop.shopAddrDetail}</h4>

      <h3>매장 로고</h3>
      <img src={`/image/${shop.shopLogo}`}></img>
    </div>
  )
}
