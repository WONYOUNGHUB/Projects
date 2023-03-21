import React,{ useEffect, useState,useContext} from "react";
import {useParams} from "react-router-dom";
import { GlobalContext } from "components/common/GlobalProvider";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Stack } from "@mui/material";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {IconButton} from "@mui/material";
import moment from "moment-timezone"
import "./CouponManager.css";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25em',
    bgcolor: 'background.paper',
    boxShadow: 12,
    height: '28.5em'
  };

  const textFieldStyle = {
    '& label.Mui-focused': {
        color: '#AAAAAA',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#AAAAAA',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#AAAAAA',
        },
        '&:hover fieldset': {
          borderColor: '#AAAAAA',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#AAAAAA',
        },
      },
   
    width: "85%",
  
  };

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

const CouponManager = (props)=> {
    
    moment.DATETIME_LOCAL = "YYYY-MM-DDTHH:mm:ss";

    const params = useParams();
    const {globalAxios} = useContext(GlobalContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

    const openModalWithReset = () => {
        resetCouponData();
        handleOpen();
    }

    const closeModalWithReload = () => {
        getCouponDataList();
        handleClose();
    }

    const [couponData,setCouponData] = useState({
        couponName : '쿠폰이름',
        shopSeq : params.shopSeq,
        couponMinCond : 1000,
        couponDC : 1000,
        couponExpire: moment.tz("Asia/Seoul").format(moment.DATETIME_LOCAL),
        couponCount : 1
    });

    const [couponDataList,setCouponDataList] = useState('');

    const onChange = e => {
        const { name , value } = e.target;
        setCouponData({...couponData, [name] : value });
    }

    const resetCouponData = () =>{
        setCouponData({
            couponName : '쿠폰이름',
            shopSeq : params.shopSeq,
            couponMinCond : 1000,
            couponDC : 1000,
            couponExpire: moment.tz("Asia/Seoul").format(moment.DATETIME_LOCAL),
            couponCount : 1
        });
    }

    const createCoupon = () => {
        globalAxios('/coupon/list','post',couponData,result=>{createCouponResult(result)});
    }

    const plusCoupon = couponDataRow => {
        setCouponData({
            couponName : couponDataRow.쿠폰이름,
            shopSeq : params.shopSeq,
            couponMinCond : couponDataRow.사용가능금액,
            couponDC : couponDataRow.할인액,
            couponExpire: moment(couponDataRow.유효기간).tz("Asia/Seoul").format(moment.DATETIME_LOCAL) ,
            couponCount : 1
        });
        handleOpen();
    }

    const createCouponResult = result => {
        alert(result);
        if(result==="쿠폰발급에 성공했습니다") closeModalWithReload();
    }

    const getCouponDataList = () => {
        globalAxios('/coupon/list','get',couponData,result=>{setCouponDataList(result)});
    }

    const deleteUnusedCoupon = couponDataRow => {


        globalAxios('/coupon/unused','delete',
        {
            couponName : couponDataRow.쿠폰이름,
            shopSeq : params.shopSeq,
            couponMinCond : couponDataRow.사용가능금액,
            couponDC : couponDataRow.할인액,
            couponExpire: moment(couponDataRow.유효기간).tz("Asia/Seoul").format(moment.DATETIME_LOCAL)
        },
        result=>{deleteUnusedCouponResult(result)});

    }

    const deleteUnusedCouponResult = result =>{
        alert(result);
        getCouponDataList();
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
                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em'}}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow >
                                    <TableCell colSpan='10' key='title' sx={tableTopStyle}>쿠폰관리</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={tableHeadStyle}>쿠폰이름</TableCell>
                                    <TableCell sx={tableHeadStyle}>할인액</TableCell>
                                    <TableCell sx={tableHeadStyle}>사용가능금액</TableCell>
                                    <TableCell sx={tableHeadStyle}>유효기간</TableCell>
                                    <TableCell sx={tableHeadStyle}>발행수량</TableCell>
                                    <TableCell sx={tableHeadStyle}>잔여수량</TableCell>
                                    <TableCell sx={tableHeadStyle}>배포수량</TableCell>
                                    <TableCell sx={tableHeadStyle}>사용수량</TableCell>
                                    <TableCell sx={tableHeadStyle}>잔여회수</TableCell>
                                    <TableCell sx={tableHeadStyle}>추가발급</TableCell>
                                </TableRow>
                                {couponDataList .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((couponDataRow) => {
                                    return (
                                <TableRow hover key={couponDataRow.쿠폰이름+couponDataRow.할인액+couponDataRow.사용가능금액+couponDataRow.유효기간}>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {couponDataRow.쿠폰이름}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {((Number)(couponDataRow.할인액)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 90}}> {((Number)(couponDataRow.사용가능금액)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {moment(couponDataRow.유효기간).tz("Asia/Seoul").format("YY/MM/DD HH:mm:ss").replace("T"," ")}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.발행수량}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.잔여수량}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.배포수량}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> {couponDataRow.사용수량}</TableCell>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 80}}> 
                                            <IconButton edge ="end" onClick={()=>deleteUnusedCoupon(couponDataRow)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>  
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 60}}> 
                                            <IconButton edge ="end" onClick={()=>plusCoupon(couponDataRow)}>
                                                <LibraryAddIcon/>
                                            </IconButton>
                                        </TableCell>                                    
                                </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow height="1em">
                                <TableCell>
                                    <Button variant="outlined" id="buttonIssue" onClick={openModalWithReset}>쿠폰발급</Button>
                                </TableCell>
                                <TableCell>
                                    <TablePagination
                                        rowsPerPageOptions={[3, 5, 10, 20,{ label: 'All', value: couponDataList.length }]}
                                        component="div"
                                        count={couponDataList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage} 
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                     </Table>
                </Paper>
            </Box>
        :""}
    <div>
      
      <Modal open={open}>
        <Box sx={modalStyle} id="createCouponModal">

            <div id="modalHead"> <LocalMallOutlinedIcon/> 쿠폰발급</div>
            <hr className="hiddenHr"/>
            <hr/>
            <hr className="hiddenHr"/>
            <TextField sx={textFieldStyle} name="couponName" 
                                           defaultValue={couponData.couponName} 
                                           onChange={onChange} 
                                           label="쿠폰이름" 
                                           type="text" 
                                           size="small" 
                                           focused/>
            <hr className="hiddenHr"/>
            <TextField sx={textFieldStyle} name="couponMinCond" 
                                           defaultValue={couponData.couponMinCond} 
                                           onChange={onChange}  
                                           label="사용가능금액(원)" 
                                           type="number" 
                                           size="small" 
                                           InputProps={{ inputProps: { min: 1000} }}
                                           focused/>
            <hr className="hiddenHr"/>
            <TextField sx={textFieldStyle} name="couponDC" 
                                           defaultValue={couponData.couponDC} 
                                           onChange={onChange}  
                                           label="할인액(원)" 
                                           type="number" 
                                           size="small" 
                                           InputProps={{ inputProps: { min: 1000} }}
                                           focused/>
            <hr className="hiddenHr"/>
            <TextField sx={textFieldStyle} name="couponExpire" 
                                           defaultValue={couponData.couponExpire} 
                                           onChange={onChange}  
                                           label="유효기간" 
                                           type="datetime-local" 
                                           size="small" 
                                           focused/>
            <hr className="hiddenHr"/>
            <TextField sx={textFieldStyle} name="couponCount" 
                                           defaultValue={couponData.couponCount} 
                                           onChange={onChange}  
                                           label="수량" 
                                           type="number" 
                                           size="small" 
                                           InputProps={{ inputProps: { min: 1, max: 100 } }}
                                           focused />
            <hr className="hiddenHr"/>
            <hr/>
            <hr className="hiddenHr"/>
            <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="outlined" id="createButton" onClick={createCoupon}>쿠폰발급</Button>
                <Button variant="outlined" id="cancelButton" onClick={handleClose}>취소</Button>
            </Stack>
            
        </Box>
      </Modal>
    </div>

      </>
    );
  }
  export default CouponManager;