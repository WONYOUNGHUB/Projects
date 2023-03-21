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

const MyCoupon = (props)=> {
    
    moment.DATETIME_LOCAL = "YYYY-MM-DDTHH:mm:ss";

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
        globalAxios('/coupon/mycoupon','get',{},result=>{setCouponDataList(result)});
    }

    useEffect(
        () => { 
            getCouponDataList();
        },[]
      );

    return (
      <>

        {couponDataList?
            <Box    id="couponDataBox"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em',maxWidth:'70em'}}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                        <TableRow >
                        <TableCell colSpan='10' key='title' sx={tableTopStyle}>내 쿠폰 목록</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell sx={tableHeadStyle}>쿠폰이름</TableCell>
                            <TableCell sx={tableHeadStyle}>사용매장</TableCell>
                            <TableCell sx={tableHeadStyle}>할인액</TableCell>
                            <TableCell sx={tableHeadStyle}>사용가능금액</TableCell>
                            <TableCell sx={tableHeadStyle}>유효기간</TableCell>
                            <TableCell sx={tableHeadStyle}>상태</TableCell>
                        </TableRow>
                            {couponDataList .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((couponDataRow) => {
                                return (
                                <TableRow hover key={couponDataRow.couponSeq}>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.couponName}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.shop.shopName}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {((Number)(couponDataRow.couponDC)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 90}}> {((Number)(couponDataRow.couponMinCond)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {moment(couponDataRow.couponExpire).tz("Asia/Seoul").format("YY/MM/DD HH:mm:ss").replace("T"," ")}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.orderGroup?"사용됨":"미사용"} </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10, 20,{ label: 'All', value: couponDataList.length }]}
                            component="div"
                            count={couponDataList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} 
                        />
                </Paper>
            </Box>
        :""}

      </>
    );
  }
  export default MyCoupon;