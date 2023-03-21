import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import ReviewViewForm from "components/review/components/ReviewViewForm";
// import { Axios } from "axios";

export default function ShopReview({ shopSeq }) {

  const { globalAxios } = useContext(GlobalContext);
  const [reviewShops, setReviewShops] = useState([]);

  const shopReviewList = () => {
    globalAxios(`/review/reviewShopList/${shopSeq}`, 'get', {}, res => {
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
      <ReviewViewForm reviewss={reviewShops} reviewfunction={shopReviewList} />
    </>
  )
}