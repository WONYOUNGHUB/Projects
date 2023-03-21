import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import ReviewViewForm from "components/review/components/ReviewViewForm";

export default function MyReview() {

  const { globalAxios } = useContext(GlobalContext);  
  const [reviewM, setReviewM] = useState([]);

  const selectReviewList = () => {     
    globalAxios('/review/reviewMemList', 'get', {}, response => {
      if (response) {
        setReviewM(response);
      } else {
        alert("failed to ");
      }
    });
  }

  useEffect(selectReviewList, []);
  return (
    <>
       <ReviewViewForm reviewss={reviewM}  reviewfunction={selectReviewList}/>
    </>
  )
}
