import React,{ useEffect, useState} from "react";
import $ from "jquery";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import QrCodeIcon from '@mui/icons-material/QrCode';
import {useParams} from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./QRManager.css";

const QRManager = (props)=> {

    const params = useParams();
    const [count,setCount] = useState(1);

    const getContextPath = () => {
        const hostIndex = window.location.href.indexOf( window.location.host ) + window.location.host.length;
        return window.location.href.substring( hostIndex, window.location.href.indexOf('/', window.hostIndex + 1) );
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


    const createQRCode = () => {
		
		const count = $("#qrcodenumber").val();
		
		if(count===0){
			alert("갯수를 확인해주세요 ( 1~30개 )");
			return;
		}
		if(!params.shopSeq){
			alert("매장번호가 없습니다");
			return;
		}
		
		var str = "";
		
		for(let i=1;i<=count;i++){
			
			str+="<table style='display: inline-block;width:19%'><tr><td>"
                    +i+"번 테이블</td></tr><tr><td><img src='/image/qrcode/"
                    +
                    (window.location.protocol+getContextPath()+"/zumuniyo/menuQRnew/"+params.shopSeq+"/"+i)
                    +"'></td><tr></table>";
		}
		
		$("#qrcodetable").html(str);
	};

    const printQRcode = () => {

        let initBody;
        window.onbeforeprint = () => {
            initBody = document.body.innerHTML;
            document.body.innerHTML = document.getElementById('qrcodetable').innerHTML;
		};
		
        window.onafterprint = () => {
            document.body.innerHTML = initBody;
		};
		
		window.print();
		window.location.reload();

    }

    useEffect(
        () => { 
  
  
        },[]
      );

    return (
      <>
        <Box    display="flex"
                justifyContent="center"
                alignItems="center">

        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                    <TableRow >
                   <TableCell colSpan='4' key='title' sx={tableTopStyle}> <QrCodeIcon/>QR 코드 관리</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                    <TableCell align="center">
                <TextField
                    value={count}
                    onChange={e=>{setCount(e.target.value)}}
                    InputProps={{ inputProps: { min: 1, max: 30 } }}
                    required
                    id="qrcodenumber"
                    label="테이블 갯수"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    sx={{input:{color: 'rgb(71, 30, 30)'},
                    '& label.Mui-focused': {color: 'rgb(71, 30, 30)',fontWeight: 'bold'},
                    '& .MuiInput-underline:after': {borderBottomColor: 'rgb(71, 30, 30)'},
                    width:'50%'
                    }}
                />








                </TableCell>
                </TableRow><TableRow>
                <TableCell>
                <div id="qrcodetable"></div>
                </TableCell>
                </TableRow><TableRow>
                <TableCell>
                <Stack spacing={5} direction="row" justifyContent="center">
                    <Button id="createQRbutton" variant="outlined" onClick={createQRCode}>QR 코드생성</Button>
                    <Button id="printQRbutton" variant="outlined" onClick={printQRcode}>QR 코드인쇄</Button>
                </Stack>
                </TableCell>
                </TableRow>
                </TableBody>
                </Table>
                </TableContainer>
            </Paper>
        </Box>
       
      </>
    );
  }
  export default QRManager;