// import React from 'react'
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";

export default function Test123() {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [shoplist, setShoplist] = useState([]);

  const shopSelect = () => {
    globalAxios('/shop/shopList', 'get', {}, res => {
      if (res) {
        console.log(res);
        setShoplist(res);
      } else {
        alert("failed to");
      }
    });
  }
  function convertDate(longValue) {
    return new Date(longValue).toLocaleString();
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
      <h1>테스트123</h1>


      {shoplist.map((shop, index) => {
        return (
          <div key={index}>
            <p>{shop.shopSeq}</p>
            <p>{shop.shopName}</p>
            <p>{shop.shopInfo}</p>
            {/* <p><Viewer content={shop.shopDetail} /></p> */}
            <p>{shop.shopAddrDetail}</p>
            <p>{shop.shopCategory}</p>
            {/* <p>{shop.location}</p>
            <p>{convertDate(shop.shopRegdate)}</p> */}
            <p>{shop.shopStatus}</p>
          </div>
        )

      })}



    </div>
  )
}
