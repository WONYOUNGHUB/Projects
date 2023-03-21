import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import ReviewViewForm from "components/review/components/ReviewViewForm";


export default function StoreReviewManage() {

  const { globalAxios } = useContext(GlobalContext);
  const [reviewShops, setReviewShops] = useState([]);
  const [shopNum, setShopNum] = useState([652]);

  const shopReviewList = () => {
    globalAxios(`/review/reviewShopList/${shopNum}`, 'get', {}, res => {      
      if (res) {     
        setReviewShops(res);        
      } else {
        alert("failed to ");
      }
    });
  }

  useEffect(shopReviewList, []);

  return (
    <>
      <ReviewViewForm reviewss={reviewShops} reviewfunction={shopReviewList}/>      
    </>
  )
}
