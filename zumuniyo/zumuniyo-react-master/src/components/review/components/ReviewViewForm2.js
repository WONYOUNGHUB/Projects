import React, { useState, useEffect, useContext, useReducer } from "react";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Pagination from "components/review/components/Pagination";
import { GlobalContext } from "components/common/GlobalProvider";
import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";


import Alert from '@mui/material/Alert';
import './ReviewViewForm2.css';

let rNumber = 0;

export default function ReviewViewForm2() {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [any, forceUpdate] = useReducer(num => num + 1, 0);
  function handleChange() {
    forceUpdate();
  }

  const Viewer = ({ content }) => (
    <div style={{ width: "640", height: "200" }}
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff1',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const [reviews, setReview] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  const selectReviewList = () => {
    
    globalAxios('/review/reviewMemList', 'get', {}, response => {
      if (response) {
        console.log(response);
        setReview(response);
      } else {
        alert("failed to ");
      }
    });
  }
 


  useEffect(selectReviewList, []);


  function convertDate(longValue) {
    return new Date(longValue).toLocaleString();
  }





  const sortPhandle = () => {
    console.log("과거순 누름");
    const aa = reviews;
    aa.sort((a, b) => a.reviewSeq - b.reviewSeq);
    setReview(aa);
    setStateDay(false)
    handleChange();
    // console.log(reviews);
  }
  const sortRhandle = () => {
    console.log("최신순 누름");
    const aa = reviews;
    aa.sort((a, b) => b.reviewSeq - a.reviewSeq);
    setReview(aa);
    setStateDay(true)
    handleChange();
    // console.log(reviews);
  }
  const sortRaLhandle = () => {
    console.log("별점 높은순 누름");
    const aa = reviews;
    aa.sort((a, b) => (b.reviewAmount + b.reviewService + b.reviewTaste) - (a.reviewAmount + a.reviewService + a.reviewTaste));
    setReview(aa);
    setStateRaty(true);
    handleChange();
    // console.log(reviews);
  }
  const sortRaShandle = () => {
    console.log("별점 낮은순 누름");
    const aa = reviews;
    aa.sort((a, b) => (a.reviewAmount + a.reviewService + a.reviewTaste) - (b.reviewAmount + b.reviewService + b.reviewTaste));
    setReview(aa);
    setStateRaty(false);
    handleChange();
    // console.log(reviews);    
  }

  const [stateDay, setStateDay] = useState(true);
  const changeSortIcon = stateDay ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />;

  const handlesortDay = () => {
    stateDay ? sortPhandle() : sortRhandle();
  }

  const [stateRaty, setStateRaty] = useState(true);
  const changeSortIcon2 = stateRaty ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />;

  const handlesortRaty = () => {
    stateRaty ? sortRaShandle() : sortRaLhandle();
  }
  const [delOpen, setDelOpen] = useState(false);

  const openDeldialog = (params) => {
    setDelOpen(true);
    rNumber = params;
    console.log(rNumber);
  }

  const [show, setShow] = useState(false);

  const deleteClick = (params, e) => {
    console.log(params);
    setDelOpen(false);
    globalAxios(`/review/reviewDelete/${params}`, 'delete', {}, response => {
      if (response==="success") {
        // alert("삭제에 성공했습니다.");       
        //window.location.reload("/LDS"); //리로드
        setShow(true);

      } else {
        alert(response);
        // alert("failed to ");
      }
      
    });
  }

  return (
    <>
      <Dialog open={show}>
        <Alert severity="info"> 성공적으로 삭제 되었습니다. <Button variant="outlined" onClick={() => { setShow(false); selectReviewList(); }}>확인</Button></Alert>
      </Dialog>

      <Dialog open={delOpen}>
        <DialogTitle>삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>리뷰를 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => { deleteClick(rNumber) }}>확인</Button>
          <Button variant="outlined" onClick={() => { setDelOpen(false) }}>취소</Button>
        </DialogActions>
      </Dialog>


      <Grid style={{ maxWidth: 169, minWidth: 169, margin: "0 auto" }}>
        <ButtonGroup>
          <Button variant="outlined" endIcon={changeSortIcon} onClick={handlesortDay}>날짜</Button>
          <Button variant="outlined" endIcon={changeSortIcon2} onClick={handlesortRaty}>별점</Button>
        </ButtonGroup>
      </Grid>
      <br />
      {/* <h1>리뷰</h1>  */}


      {reviews.slice(offset, offset + limit).map((review, index )=> {
        return (

          <Grid key={index}
            style={{ maxWidth: 700, minWidth: 500, margin: "0 auto" }}
          >
            <Item>
              {/* <Grid container spacing={2} style={{ height: 60, backgroundColor:"azure" }} > */}
              <Grid container spacing={2} style={{ height: 60}} >
                <Grid item xs={4}>
                  {/* 닉네임 */}
                  {review.member === null ? "닉없음" : review.member.memNick}
                </Grid>
                <Grid item xs={4}>
                  {/* 별점 */}
                  {/* <Rating size='large' readOnly precision={0.5} value={((review.reviewService + review.reviewTaste + review.reviewAmount) / 3).toFixed(1)} /> */}
                  <Rating size='large' readOnly precision={0.5} value={((review.reviewService + review.reviewTaste + review.reviewAmount) / 3)} />
                </Grid>
                <Grid item xs={4}>
                  {/* 날짜 */}
                  {convertDate(review.reviewRegdate)}
                </Grid>
              </Grid>              
              <Grid>
                {/* <Item style={{ height: 400, margin: "0 auto", overflowY: "auto" }}>
                  <img src={`${process.env.PUBLIC_URL}/${review.reviewImages[0]}`}/>
                </Item> */}
                <Item style={{ height: 400, margin: "0 auto", overflowY: "auto" }}>
                  <Viewer content={review.reviewContent} />
                </Item>
              </Grid>
              <Button onClick={() => { openDeldialog(review.reviewSeq) }}>삭제</Button>
            </Item>
            <br />
          </Grid>
        );
      })}
      
      <Pagination total={reviews.length} limit={limit} page={page} setPage={setPage} />
    </>
  )
}
