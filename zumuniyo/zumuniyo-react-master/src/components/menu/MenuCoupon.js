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
import TablePagination from '@mui/material/TablePagination';
import moment from "moment-timezone"
import { Button, Grid, IconButton, ListItemButton, ListItemText } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import { styled } from '@mui/material/styles';

import "./MenuCoupon.css" 


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

 const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));






const MenuCoupon = (props)=> {
    
    moment.DATETIME_LOCAL = "YYYY-MM-DDTHH:mm:ss.SSS";

    const {globalAxios} = useContext(GlobalContext);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    const [couponDataList,setCouponDataList] = useState('');

    const getCouponDataList = () => {
        globalAxios('/coupon/list/' + props.shopSeq,'get',{},result=>{setCouponDataList(result)});
    }

    const getCoupon = couponDataRow => {

        globalAxios('/coupon/mycoupon/','put',{
            couponDC:couponDataRow.할인액,
            couponMinCond:couponDataRow.사용가능금액,
            couponExpire:moment(couponDataRow.유효기간).tz("Asia/Seoul").format(moment.DATETIME_LOCAL),
            couponName:couponDataRow.쿠폰이름,
            shopSeq:props.shopSeq
        },result=>{getCouponResult(result)});

    }

    const getCouponResult = result => {
        getCouponDataList();
        alert(result);
    }

    const commonStyleCenter= { textAlign:"center" };

    useEffect(
        () => { 
            getCouponDataList();
        },[]
      );

    return (
      <>
        {couponDataList?
        <div>
        

            <Box id="couponWrapper"
             sx={{
               display: 'flex',
               flexWrap: 'nowrap',
               '& > :not(style)': {
                 m: 1,
                 
               },
             }}
            >
                
                {couponDataList .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((couponDataRow) => {
                                return (
                                <div key={couponDataRow.쿠폰이름+couponDataRow.할인액+couponDataRow.사용가능금액+couponDataRow.유효기간} >
                                    <Paper className="listitembtn"  onClick={()=>{getCoupon(couponDataRow);}} >
                                        
                                        {/* <ListItemText sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.쿠폰이름}</ListItemText> */}
                                        
                                        <span  className="minPrice"   sx={commonStyleCenter}> {((Number)(couponDataRow.사용가능금액)).toLocaleString('ko-KR') +' 원 이상 구매 시'}</span>
                                        <span  className="dcPrice"   sx={commonStyleCenter}> {((Number)(couponDataRow.할인액)).toLocaleString('ko-KR') +' 원 할인 '}</span>
                                        <br/>
                                        <span  className="dueDate"   sx={commonStyleCenter}> {moment(couponDataRow.유효기간).tz("Asia/Seoul").format("YY/MM/DD").replace("T"," ") + ' 까지'}</span>
                                               
                                        {/* <ListItemText sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.잔여수량}</ListItemText> */}
                                        
                                    </Paper>
                                </div>
                                );
                            })}
                            
                
            </Box>
           
 
            </div>


            
        :""}

      </>
    );
  }
  export default MenuCoupon;