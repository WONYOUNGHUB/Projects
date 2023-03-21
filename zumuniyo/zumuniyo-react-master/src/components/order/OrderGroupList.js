import React,{ useEffect,useContext,useState} from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import {useLocation,useNavigate} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment-timezone"

const OrderGroupList = (props)=> {

    moment.DATETIME_LOCAL = "YYYY-MM-DD HH:mm:ss";

    const {globalAxios} = useContext(GlobalContext);
    const [orderGroupList,setOrderGroupList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const getOrderGroupList = () => {
        globalAxios('/order/orderlist','get',{},result=>{setOrderGroupList(result)});
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const goDetailPage = orderGroupSeq => {
      navigate(location.pathname+'/'+orderGroupSeq);
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
        getOrderGroupList();
      },[location.pathname]
    );

    return (
      <>
         <Box   display="flex"
                justifyContent="center"
                alignItems="center">
            <Paper sx={{ width: '100%', overflow: 'hidden' ,maxWidth:'50em',borderRadius:'1em'}}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead >
                    <TableRow >
                        <TableCell colSpan='5' key='title' sx={tableTopStyle}>내 주문 목록</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow >
                        <TableCell key='orderGroupSeq' sx={tableHeadStyle}>주문번호</TableCell>
                        <TableCell key='shopName' sx={tableHeadStyle}>매장이름</TableCell>
                        <TableCell key='orderGroupRegdate' sx={tableHeadStyle}>주문일시</TableCell>
                        <TableCell key='detailInfomation' sx={tableHeadStyle}>주문상세</TableCell>
                        <TableCell key='review' sx={tableHeadStyle}>리뷰작성</TableCell>
                    </TableRow>
                    {orderGroupList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((orderGroup) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={orderGroup.orderGroupSeq}>
                                <TableCell key='orderGroupSeq' sx={{ textAlign:"center" ,minWidth: 70}}>{orderGroup.orderGroupSeq}</TableCell>
                                <TableCell key='shopName' sx={{ textAlign:"center" ,minWidth: 150}}>{orderGroup.shop.shopName}</TableCell>
                                <TableCell key='orderGroupRegdate' sx={{ textAlign:"center" ,minWidth: 150}}>
                                  {moment(orderGroup.orderGroupRegdate).tz("Asia/Seoul").format(moment.DATETIME_LOCAL)}
                                </TableCell>
                                <TableCell key='detailInfomation' sx={{ textAlign:"center" ,minWidth: 70}}>
                                  <IconButton edge ="end" onClick={()=>goDetailPage(orderGroup.orderGroupSeq)}>
                                    <SearchIcon/>
                                  </IconButton>
                                </TableCell>
                                <TableCell key='review' sx={{ textAlign:"center" ,minWidth: 70}}>
                                  <IconButton edge ="end" onClick={()=> {navigate(`/zumuniyo/normal/reviewInsert/${orderGroup.orderGroupSeq}`) }}>
                                    <PostAddOutlinedIcon/>
                                  </IconButton>
                                </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10, 20,{ label: 'All', value: orderGroupList.length }]}
                component="div"
                count={orderGroupList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} 
              />
          </Paper>
        </Box>
      </>
    );
  }
  export default OrderGroupList;