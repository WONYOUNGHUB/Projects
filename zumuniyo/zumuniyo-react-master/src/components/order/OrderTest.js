import React,{ useEffect,useContext,useState} from "react";
import { GlobalContext } from "components/common/GlobalProvider";


const OrderTest = ()=> {

    const {globalAxios} = useContext(GlobalContext);
    const [responseData,setResponseData] = useState('');

    const requestData = {
            tableNum: 1 ,
            shopSeq: 4882,
            orderList : JSON.stringify({58:1,47:2}),
            //couponSeq: 99992
    } 

    const requestOrder = () => {
        globalAxios('/order/orderlist','post',requestData,result=>{setResponseData(result)});
    }

    useEffect(
        () => { 
          
        },[]
      );

    return (
      <>
        오더테스트<br/>

        
        <button onClick={requestOrder}>order보내기</button><br/>

        전달받은값 : {responseData}<br/>

        
      </>
    );
  }
  export default OrderTest;