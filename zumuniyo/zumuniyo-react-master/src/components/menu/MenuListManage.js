import React,{useContext,useEffect, useState} from 'react';
import {GlobalContext} from "components/common/GlobalProvider";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import "./MenuListManage.css";
import { Box, Button, IconButton } from '@mui/material';
import MenuDetailModal from 'components/menu/MenuDetailModal';





const MenuListManage = (props) => {

    const { logined, memType, globalAxios, backLocation} = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [menuSeq,setMenuSeq] = useState(-1);
    const [menuData,setMenuData] = useState('');

    const whoami = row => {
        alert(row.menuSeq);
    }

    const reRender = () => {
        props.getMenuList(props.shopSeq);
    }

    const deleteResult = (result) => {
        props.getMenuList(props.shopSeq);
        alert(result);
    };

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const handleModalOpen = () => setDetailModalOpen(true);
    const handleModalClose = () => setDetailModalOpen(false);

    const menuDetailClick = row => {
        //alert(row.menuSeq+"메뉴 상세보기 시동");
        setMenuData(row);
        setMenuSeq(row.menuSeq);
        handleModalOpen();
    }

    const menuDeleteClick = row => {

        console.log(row.menuSeq);
        
        //globalAxios(요청주소/post,get,put,delete/{categorySeq:aa,shopSeq:bb}/callback)
        globalAxios('/menu/menuDelete', 'put', {menuSeq:row.menuSeq}, result=>{deleteResult(result)});

    };

    useEffect(
      () => {

      }, [props.menuData]
    );


    return (
        <>
        


        <Box    id="MenuDetailBox"
                >

        <div id="menuTotalListBtn">
        <Button onClick={reRender}>전체메뉴보기</Button>
        </div>
        <br></br>

        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow id='tableHead'>
                        <TableCell align='center' 
                            id= "menuNameSpace"
                        > <span className='tableHeadFont'>메뉴이름</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>카테고리</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>가격</span></TableCell>
                        <TableCell align='center'
                            id= "menuInfoSpace"
                        > <span className='tableHeadFont'>메뉴소개</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>이미지</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>상세보기</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>삭제</span></TableCell>
                    </TableRow>
                    </TableHead>
                    
                    
                    <TableBody>

                    {props.menuData.map((row) => (
                        // onClick={() => {whoami(row);}
                        <TableRow className='listRow'
                        key={row.menuSeq}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">{row.menuName}</TableCell>
                        <TableCell align="center">{row.menuCategory.menuCategoryName}</TableCell>
                        <TableCell align="right"><span className='menuPrice'>
                        {((Number)(row.menuPrice)).toLocaleString('ko-KR') +' 원'}</span></TableCell>
                        <TableCell align="left">{row.menuSimpleInfo}</TableCell>
                        <TableCell align="center"><img className="menuImage" src={"/image/"+row.menuImage}/></TableCell>
                        
                        <TableCell align="center">
                        <IconButton edge="end" aria-label="menu-detail" onClick={() => {menuDetailClick(row)}}>
                            <SearchIcon />
                        </IconButton>
                        </TableCell>

                        <TableCell align="center">
                        <IconButton edge="end" aria-label="menu-delete" onClick={() => {menuDeleteClick(row)}}>
                            <ClearIcon />
                        </IconButton>
                        </TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


        
            <MenuDetailModal 
            menuData = {menuData}
            detailModalOpen = {detailModalOpen}
            handleModalClose={handleModalClose}
            
            />

            </Box>
        
        </>
        
    );


}

export default MenuListManage; 




