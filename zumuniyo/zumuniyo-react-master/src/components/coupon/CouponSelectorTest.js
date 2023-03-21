import React,{ useEffect, useState,useContext} from "react";
import CouponSelector from "components/coupon/CouponSelector";


const CouponSelectorTest = (props)=> {

    const [selectedCoupon,setSelectedCoupon] = useState(0);
    
    const couponSelect = couponSeq => {
        setSelectedCoupon(couponSeq);
    }



    return (
        <>
            부모: {selectedCoupon}

            <CouponSelector shopSeq="9999" couponSelect={couponSelect}/>

        </>
    );
  }
  export default CouponSelectorTest;