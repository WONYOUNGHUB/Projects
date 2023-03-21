// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from  "react-router-dom";
import React,{ useContext,useEffect,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import Pagination from './Pagination';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
 
// ];
const CustomizedTables= () => {



    const {globalAxios} = useContext(GlobalContext);
    const [noticelist,setNoticelist] = useState([]);
    const [limit,setLimit] = useState(5);
    const [page,setPage] = useState(1);
    const offset = (page-1 )*limit;
    const imgURL = "/img/red_icon03.png"
   
    const getNoticeList = () => {

        globalAxios("/noticeboard/Noticelist.go","get",{},data=>{
            console.log(data);
            setNoticelist(data);
        })
    }

    useEffect(() => {

        getNoticeList();

    }, []); 


  return (

        <div>

     <TableContainer component={Paper}>
     <h2 align="center" className="text-center">공지사항</h2>
                <Link to="/zumuniyo/NoticeBoard/CkNoticeInsert">
                <button className="insertNotice2">CK글쓰기</button>
                </Link>
                <Link to="/zumuniyo/advertisement/AdList">
                <button className="ad">광고</button>
                </Link>
                {/* <Link to="/zumuniyo/advertisement/ImgSlider">
                <button className="Imgslider">슬라이더</button>
                </Link>   */}
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>번호</StyledTableCell>
            <StyledTableCell >제목</StyledTableCell>
            <StyledTableCell >작성일</StyledTableCell>
            <StyledTableCell >조회수</StyledTableCell>

            </TableRow>
         </TableHead>
         <TableBody>
        {
        noticelist.slice(offset, offset+limit).map((
                                    list, index) => 
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                   {list.boardTop==1?<img src={imgURL} width="25px" height="25px"/>:list.noticeBoardSeq}
              </StyledTableCell>
              <StyledTableCell>  
                 <Link to={`/zumuniyo/NoticeBoard/NoticeDetail/${list.noticeBoardSeq}`}>{list.title} </Link>
              </StyledTableCell>
              <StyledTableCell >{ new Date(list.regdate).toJSON().split("T")[0]}</StyledTableCell>
              <StyledTableCell >{list.hitCount}</StyledTableCell>
            </StyledTableRow>
         )
        }          
        </TableBody>
      </Table>
    </TableContainer>   
    <Pagination total={noticelist.length} limit={limit} page={page} setPage={setPage}/>
    </div>
 );
};
export default CustomizedTables;