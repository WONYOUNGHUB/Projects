// // import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import {Link} from  "react-router-dom";
// import {GlobalContext} from "components/common/GlobalProvider";
// import {  useNavigate,useLocation } from "react-router-dom";
// import Pagination from './Pagination';
// import $ from "jquery";
// import { Box, Button, Modal, Typography } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import React , { useContext ,useEffect,useState} from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment-timezone"


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// // function createData(name, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }

// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
 
// // ];
// const CustomizedTables= () => {
  
  
//   const [adDetail, setAdDetail] = useState({});
//   const imgURL = "/img/37967765.jpg"
//   const {globalAxios} = useContext(GlobalContext);
//   const [Adlist,setAdlist] = useState([]);
  
//   const getAdList = () => {
//     globalAxios("/advertisement/adlist","get",{},data=>{
//       console.log(data);
//       setAdlist(data);
//     })
//   }

//   // const timestamp = adDetail.startTime
//   // const etimestamp = adDetail.endTime
//   // const edate = new Date(etimestamp);
//   // const date = new Date(timestamp);


//   const [limit,setLimit] = useState(5);
//   const [page,setPage] = useState(1);
//   const offset = (page-1 )*limit;
//   let navigate = useNavigate();
  
//   const handleDelete =(e) =>{
//     var adseq =  $(e.target).attr("dataseq");
    
//     if (window.confirm("정말 삭제합니까?")) { 
//     globalAxios(`/advertisement/deleteAd/${adseq}`,"delete",{},data=>{
//         console.log(data);
//         alert(`성공적으로 삭제되었습니다..`);
//         navigate("/SWY");
//         },[]);
//     }else {
//          alert("취소합니다.");
//            }
//   }
  
  
//   useEffect(() => {

//     getAdList();

//   }, []); 
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
  
//   const[open, setOpen] = useState(false);

//   const handleOpen2 = () => setOpen(true);
  
//   const handleOpen = (e) => {
//    var adSeq =  e.target.getAttribute("adseq");
//    var adOwner =  e.target.getAttribute("adowner");
//    var startTime =  e.target.getAttribute("starttime");
//    var endTime =  e.target.getAttribute("endtime");
//    console.log(adSeq, adOwner)
//     setAdDetail({adSeq:adSeq, owner:adOwner, endTime:endTime,startTime:startTime });
//     setOpen(true)
//   }

//   const handleClose = () => setOpen(false);

//   return (

//     <div>
//            <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//               >
//            <Box sx={style}>
//             <h1>광고정보</h1>
//             <div>
//             <TextField label="번호"  value={adDetail.adSeq||''} color="secondary" onChange={onchange} />
//             </div>
//             <div>
//             <TextField label="광고주" value={adDetail.owner||''} color="secondary" />
//             </div>
           
//              <TextField label="시작일" value={adDetail.startTime} color="secondary" />
//                 ~
//             <TextField label="종료일" value={adDetail.endTime} color="secondary" />
            
//             </Box>
//         </Modal>


//       <div>
//       <Button onClick={handleOpen2}>광고등록</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {/* <Typography id="modal-modal-title" variant="h6" component="h2">
//           광고등록
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
//           <h1>광고등록</h1>
//           <div style= {{padding:'1em'}}>
//           <TextField  label="상호명" id="outlined-basic" name="owner" variant="outlined" onChange={handlerChange} />
//           </div>
//           <div style= {{padding:'1em'}}>
//           <label style={{marginRight:'1em'}}>시작날짜 :</label>
//           {/* <input type="date" name="startTime" onChange={handlerChange} ></input> */}
//          <DatePicker
//           selected={startDate}
//           onChange= {(date) => setStartDate(date)} 
//           minDate={new Date()}
//           //maxDate={addMonths(new Date(), 5)}
//           showDisabledMonthNavigation
//          /> 
       
//           </div>
//          <div style= {{padding:'1em'}}> 
//          <label style={{marginRight:'1em'}}>종료날짜 :</label>
//          <DatePicker
//           selected={endDate}
//           onChange= {(date) => setEndDate(date)} 
//           minDate={new Date()}
//           //maxDate={addMonths(new Date(), 5)}
//           showDisabledMonthNavigation
//          /> 
//          {/* <input type="date" name="endTime" onChange={handlerChange}></input>  */}
//          </div>
//         <div>
        

//         </div>
//         <div id="imagePreview"/>
//         <input type="file" id="imageUploader" accept="image/*" multiple onChange={(e) => {
//             setImages(e.target.files);
//             setImagePreviews(e);
//             }} hidden/>
//         <button onClick={openUploader} style= {{padding:'1em',marginLeft:'1em'}}>파일선택 </button>
//         <button onClick={uploadImages} style= {{padding:'1em'}}>업로드</button> 
//           {/* </Typography> */}
//         </Box>
//       </Modal>
//     </div> 
    
//    <TableContainer component={Paper}>
      
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>광고주</StyledTableCell>
//             <StyledTableCell >기간</StyledTableCell>
//             <StyledTableCell >click count</StyledTableCell>
//             <StyledTableCell >view count</StyledTableCell>
//             <StyledTableCell >삭제</StyledTableCell>
           
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {Adlist.map((list) => (
         
//             <StyledTableRow key={list.adSeq}>
//               <StyledTableCell component="th" scope="row">
//                 <Button onClick={handleOpen} adseq={list.adSeq} adowner={list.owner} 
//                 starttime={ new Date(list.startTime).toJSON().split("T")[0]}
//                 endtime={ new Date(list.endTime).toJSON().split("T")[0]}
//                 >{list.owner}</Button>
//               </StyledTableCell>
//               <StyledTableCell >{ new Date(list.startTime).toJSON().split("T")[0]}~{ new Date(list.endTime).toJSON().split("T")[0]}</StyledTableCell>
//               <StyledTableCell >{list.clickCount}</StyledTableCell>
//               <StyledTableCell >{list.viewCount}</StyledTableCell>
//               <StyledTableCell ><img src={imgURL}  width="50px" height="50px" onClick={handleDelete} dataseq={list.adSeq}/></StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//      <Pagination total={Adlist.length} limit={limit} page={page} setPage={setPage}/>
//      </div>
//   );
// };
// export default CustomizedTables;