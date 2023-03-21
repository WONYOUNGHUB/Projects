// import React from 'react'
import React, { useState, useEffect, useContext, useCallback } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import ReviewInsert from "components/review/components/ReviewInsert";
import { Button } from "@mui/material";

export default function OrderList() {
  const { globalAxios } = useContext(GlobalContext);


  const [orders, setOrders] = useState([]);


  const ordersList = () => {
    globalAxios('/review/orderList', 'post', {}, res => {
      if (res) {
        console.log(res);
        setOrders(res);

      } else {
        alert("failed to ");
      }
    });
  }






  function convertDate(longValue) {
    return new Date(longValue).toLocaleString();
  }
  useEffect(ordersList, []);



  const [reviewI, setReviewI] = useState(false);
  const [orderSeq, setOrderSeq] = useState();
  // const cancle = ()=>{
  //   setOrderSeq(false);
  // }
  // const cancle = useCallback(() => {
  //   setReviewI(false);
  //   console.log("부모캔슬");

  // });

  const cancle =()=>{
    setReviewI(false);
  }

  return (
    <>
      <h1>주문목록</h1>   

      {reviewI ? <ReviewInsert orderseq={orderSeq} cancle={cancle} /> :


        <div>
          {orders.map((order, index) => {
            return <div key={index}>
              <p>주문번호 :{order.orderGroupSeq}</p>
              <p>테이블번호 :{order.tableNum}</p>
              <p>주문상태 :{order.orderStatus}</p>
              <p>날짜 :{convertDate(order.orderGroupRegdate)}</p>
              <p>매장이름 :{order.shop.shopName}</p>
              <p>매장번호 :{order.shop.shopSeq}</p>

              <Button onClick={() => {setReviewI(true); setOrderSeq(order.orderGroupSeq); }}>리뷰작성하기</Button>

            </div>
          })}
        </div>}


    </>

  )
}
