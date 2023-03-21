import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import ReviewViewForm from "components/review/components/ReviewViewForm";

export default function MenuReviewManage() {
  const { globalAxios } = useContext(GlobalContext);
  const [reviewMenus, setReviewMenus] = useState([]);
  const [menuNum, setMenuNum] = useState([4882]);
  
  const menuReviewList = () => {
    globalAxios(`/review/reviewMenuList/${menuseq}`, 'get', {}, res => {      
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
      <ReviewViewForm reviewss={reviewMenus} reviewfunction={menuReviewList}/>      
    </>
  )
}
