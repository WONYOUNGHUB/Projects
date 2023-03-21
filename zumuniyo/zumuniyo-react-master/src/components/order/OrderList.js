import React,{ useEffect,useContext,useState} from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import {useLocation,useParams} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from "@mui/system";
import moment from "moment-timezone"

const OrderList = (props)=> {

    moment.DATETIME_LOCAL = "YYYY-MM-DD HH:mm:ss";


    const {globalAxios} = useContext(GlobalContext);
    const location = useLocation();
    const params = useParams();

    const [orderGroup,setOrderGroup] = useState({});
    const [orderList,setOrderList] = useState([]);
    const [usedCoupon,setUsedCoupon] = useState('');

    var totalPrice=0;
  
    useEffect(
      () => { 

        globalAxios('/order/ordergroup/'+params.orderGroupSeq,'get',{},result=>{setOrderGroup(result)});
        globalAxios('/order/orderlist/'+params.orderGroupSeq,'get',{},result=>{setOrderList(result)});
        globalAxios('/coupon/usedcoupon/'+params.orderGroupSeq,'get',{},result=>{setUsedCoupon(result)});

      },[location.pathname]
    );

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

     

     const isLoaded = () => JSON.stringify(orderGroup)!=='{}';


    return (
      <>
        {orderGroup!==''&&isLoaded()?
        <Box    display="flex"
                justifyContent="center"
                alignItems="center">

            <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth:'50em', borderRadius:'1em'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                    <TableRow >
                    <TableCell colSpan='4' key='title' sx={tableTopStyle}>주문내역</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell sx={tableHeadStyle}> 주문번호 </TableCell><TableCell> {params.orderGroupSeq} </TableCell>
                        <TableCell sx={tableHeadStyle}> 주문시간 </TableCell>
                        <TableCell> 
                            {moment(orderGroup.orderGroupRegdate).tz("Asia/Seoul").format(moment.DATETIME_LOCAL)}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={tableHeadStyle}> 매장이름 </TableCell>
                        <TableCell>  
                            {orderGroup.shop.shopName}
                        </TableCell>
                        <TableCell sx={tableHeadStyle}> 주문상태 </TableCell>
                        <TableCell>
                            {orderGroup.orderStatus +" ("+orderGroup.tableNum+"번 테이블)"}
                        </TableCell>
                    </TableRow>
                    </TableBody>
                    </Table>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                    <TableRow >
                        <TableCell key='menuName' sx={tableHeadStyle}>[카테고리] 메뉴이름</TableCell>
                        <TableCell key='count' sx={tableHeadStyle}>수량</TableCell>
                        <TableCell key='menuPrice' sx={tableHeadStyle}>단가</TableCell>
                        <TableCell key='calcMenuPrice' sx={tableHeadStyle}>가격</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((order) => {
                            return (
                            <TableRow hover role="checkbox" key={order.orderSeq}>
                                    <TableCell key='menuName' sx={{ textAlign:"center" ,minWidth: 70}}>
                                        {"[ "+order.menu.menuCategory.menuCategoryName+" ] "+order.menu.menuName}
                                    </TableCell>
                                    <TableCell key='count' sx={{ textAlign:"center" ,minWidth: 150}}>
                                        {order.count + ' 개'}
                                    </TableCell>
                                    <TableCell key='menuPrice' sx={{ textAlign:"center" ,minWidth: 150}}>
                                        {((Number)(order.menu.menuPrice)).toLocaleString('ko-KR') +' 원'}
                                    </TableCell>
                                    <TableCell key='calcMenuPrice' sx={{ textAlign:"center" ,minWidth: 70}}>
                                        {(()=>{totalPrice += ((Number)(order.count*order.menu.menuPrice))})()}
                                        {((Number)(order.count*order.menu.menuPrice)).toLocaleString('ko-KR') + " 원"}
                                    </TableCell>
                            </TableRow>
                            );
                        })}
                    <TableRow >
                        <TableCell colSpan='4' key='usedCoupon' sx={tableHeadStyle}>{'합계: '+((Number)(totalPrice)).toLocaleString('ko-KR') + " 원"}</TableCell>
                    </TableRow>
                    {usedCoupon!==''?
                    <>
                        <TableRow >
                            <TableCell sx={tableHeadStyle}> 사용쿠폰 </TableCell>
                            <TableCell colSpan='3'>{usedCoupon.couponName+' ( '+usedCoupon.couponMinCond+"원 이상 구매시 "+usedCoupon.couponDC+"원 할인 )"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan='4' key='couponTotalPrice' sx={tableHeadStyle}>
                                {(()=>{totalPrice -= ((Number)(usedCoupon.couponDC))})()}
                                {'쿠폰적용가: '+((Number)(totalPrice)).toLocaleString('ko-KR') + " 원"}
                            </TableCell>
                        </TableRow>
                    </>
                    :""}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
        </Box>
        :""}
      </>
    );
  }
  export default OrderList;