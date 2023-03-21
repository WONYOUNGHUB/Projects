import React,{ useEffect, useState,useContext} from "react";


import { GlobalContext } from "components/common/GlobalProvider";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from "moment-timezone"

  const tableTopStyle = {
    textAlign:"center" ,
    backgroundColor: "rgb(71, 30, 30,0.8)",
    fontWeight:"bold",
    color:"white"
 };

 const tableHeadStyle = {
    textAlign:"center" ,
    backgroundColor: "rgb(240, 240, 240)",
    fontWeight:"bold"
 };

 const tableRowHover = {
    cursor: "pointer"
 }

 const tableRowSelected = {
    cursor: "pointer",
    backgroundColor : "blue",
    "&.MuiTableRow-hover:hover": {
        cursor: "pointer",
        backgroundColor : "blue",
    },
    "& > .MuiTableCell-root": {
        color: "white"
    }
}

const CouponSelector = ({shopSeq,couponSelect})=> {
    
    moment.DATETIME_LOCAL = "YYYY-MM-DDTHH:mm:ss";

    const {globalAxios} = useContext(GlobalContext);

    const [couponDataList,setCouponDataList] = useState('');

    const [selectedCoupon,setSelectedCoupon] = useState(0);

    const getCouponDataList = () => {
        globalAxios('/coupon/mycoupon/'+shopSeq,'get',{},result=>{setCouponDataList(result)});
    }

    const selectCoupon = couponSeq => {
        if(selectedCoupon===couponSeq){
            setSelectedCoupon(0);
        }else{
            setSelectedCoupon(couponSeq);
        }
    }

    useEffect(
        () => { 
            if(shopSeq) getCouponDataList();
        },[]
      );

    useEffect(
    () => { 
        couponSelect(selectedCoupon);
    },[selectedCoupon]
    );


    return (
      <>
        {couponDataList?
            <Box    id="couponDataBox"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em',maxWidth:'50em'}}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                        <TableRow >
                        <TableCell colSpan='5' key='title' sx={tableTopStyle}>사용가능쿠폰</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell sx={tableHeadStyle}>쿠폰이름</TableCell>
                            <TableCell sx={tableHeadStyle}>사용매장</TableCell>
                            <TableCell sx={tableHeadStyle}>할인액</TableCell>
                            <TableCell sx={tableHeadStyle}>사용가능금액</TableCell>
                            <TableCell sx={tableHeadStyle}>유효기간</TableCell>
                        </TableRow>
                            {couponDataList .map((couponDataRow) => {
                                return (
                                <TableRow hover onClick={()=>{selectCoupon(couponDataRow.couponSeq)}} 
                                                key={couponDataRow.couponSeq} 
                                                sx={couponDataRow.couponSeq===selectedCoupon?tableRowSelected:tableRowHover}
                                >
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> 
                                            {couponDataRow.couponName}
                                        </TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> 
                                            {couponDataRow.shop.shopName}
                                        </TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> 
                                            {((Number)(couponDataRow.couponDC)).toLocaleString('ko-KR') +' 원'}
                                        </TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 90}}> 
                                            {((Number)(couponDataRow.couponMinCond)).toLocaleString('ko-KR') +' 원'}
                                        </TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> 
                                            {moment(couponDataRow.couponExpire).tz("Asia/Seoul").format("YY/MM/DD HH:mm:ss").replace("T"," ")}
                                        </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    
                </Paper>
            </Box>
        :""}

      </>
    );
  }
  export default CouponSelector;