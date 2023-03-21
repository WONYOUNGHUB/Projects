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
import "./MenuListShopView.css";


const MenuListShopView = (props) => {

    
    const whoami = row => {
        alert(row.menuSeq);
    }

    // const sendMenuList = () => {
    //     props.setValue
    // }


    return (
        <>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow id='tableHead'>
                        <TableCell align='center'> <span className='tableHeadFont'>메뉴이름</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>가격</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>메뉴소개</span></TableCell>
                        <TableCell align='center'> <span className='tableHeadFont'>이미지</span></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>

                    {props.menuData.map((row) => (
                        <TableRow className='listRow' onClick={() => {whoami(row);}}
                        key={row.menuSeq}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.menuName}
                        </TableCell>
                        <TableCell align="right"><span className='menuPrice'>{row.menuPrice}</span></TableCell>
                        <TableCell align="right">{row.menuSimpleInfo}</TableCell>
                        <TableCell align="right">{row.menuImage}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
        </>
        
    )


}

export default MenuListShopView; 




