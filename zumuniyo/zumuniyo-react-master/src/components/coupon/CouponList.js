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
import { IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';

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

const CouponList = (props)=> {
    
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
                        <TableCell colSpan='10' key='title' sx={tableTopStyle}>쿠폰발급소</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell sx={tableHeadStyle}>쿠폰이름</TableCell>
                            <TableCell sx={tableHeadStyle}>할인액</TableCell>
                            <TableCell sx={tableHeadStyle}>사용가능금액</TableCell>
                            <TableCell sx={tableHeadStyle}>유효기간</TableCell>
                            <TableCell sx={tableHeadStyle}>잔여수량</TableCell>
                            <TableCell sx={tableHeadStyle}>발급받기</TableCell>
                        </TableRow>
                            {couponDataList .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((couponDataRow) => {
                                return (
                                <TableRow hover key={couponDataRow.쿠폰이름+couponDataRow.할인액+couponDataRow.사용가능금액+couponDataRow.유효기간}>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.쿠폰이름}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {((Number)(couponDataRow.할인액)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 90}}> {((Number)(couponDataRow.사용가능금액)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {moment(couponDataRow.유효기간).tz("Asia/Seoul").format("YY/MM/DD HH:mm:ss").replace("T"," ")}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.잔여수량}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> 
                                        {couponDataRow.잔여수량>0?
                                            <IconButton edge ="end" onClick={()=>{getCoupon(couponDataRow);}}>
                                                <DownloadIcon/>
                                            </IconButton>
                                        :<FileDownloadOffIcon/>}
                                        </TableCell>                                    
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
  export default CouponList;