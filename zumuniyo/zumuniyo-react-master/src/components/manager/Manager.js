import React,{ useEffect, useState,useContext} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GlobalContext } from "components/common/GlobalProvider";
import CouponManager from "components/manager/CouponManager";
import QRManager from "components/manager/QRManager";
import OrderManager from "components/manager/OrderManager";


import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import QrCodeIcon from '@mui/icons-material/QrCode';
import {IconButton} from "@mui/material";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const Manager = ()=> {

    const {globalAxios} = useContext(GlobalContext);
    const [shopList,setShopList] = useState('');
      
    const navigate = useNavigate();

    const getManagerListResult = result => {
      setShopList(result);
    }

    const getManagerList = () => {
      globalAxios('/main/manager','get',{},result=>{getManagerListResult(result)});
    }
    
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
    
  useEffect(
    () => { 
      getManagerList();
    },[]
  );

    return (
      <>

        <Routes>
            <Route path="/" 
                element={<>
                      {shopList?
                      <Box    id="couponDataBox"
                              display="flex"
                              justifyContent="center"
                              alignItems="center">
                          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em'}}>
                              <TableContainer>
                                  <Table stickyHeader aria-label="sticky table">
                                      <TableHead >
                                          <TableRow >
                                              <TableCell colSpan='10' key='title' sx={tableTopStyle}>통합관리</TableCell>
                                          </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          <TableRow>
                                              <TableCell sx={tableHeadStyle}>매장이름</TableCell>
                                              <TableCell sx={tableHeadStyle}>QR관리</TableCell>
                                              <TableCell sx={tableHeadStyle}>쿠폰관리</TableCell>
                                              <TableCell sx={tableHeadStyle}>메뉴관리</TableCell>
                                          </TableRow>
                                          {shopList .map((shop) => {
                                              return (
                                                <TableRow hover key={shop.shopSeq}>
                                                        <TableCell sx={{ textAlign:"center" ,minWidth: 200}}> {shop.shopName}</TableCell>
                                                        <TableCell sx={{ textAlign:"center" ,minWidth: 80}}> 
                                                            <IconButton edge ="end" onClick={()=>{navigate("qrcode/"+shop.shopSeq)}}>
                                                                <QrCodeIcon/>
                                                            </IconButton>
                                                        </TableCell>  
                                                        <TableCell sx={{ textAlign:"center" ,minWidth: 80}}> 
                                                            <IconButton edge ="end" onClick={()=>{navigate("coupon/"+shop.shopSeq)}}>
                                                                <CardGiftcardIcon/>
                                                            </IconButton>
                                                        </TableCell>  
                                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> 
                                                            <IconButton edge ="end" onClick={()=>{navigate("/zumuniyo/menu/"+shop.shopSeq)}}>
                                                                <PlaylistAddCheckIcon/>
                                                            </IconButton>
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
                </>} />
            <Route path="/qrcode/:shopSeq" element={<QRManager/>} />
            <Route path="/order/:shopSeq" element={<OrderManager/>} />
            <Route path="/coupon/:shopSeq" element={<CouponManager/>} />
        </Routes>
      </>
    );
  }
  export default Manager;