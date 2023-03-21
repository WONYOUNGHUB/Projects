
import {GlobalContext} from "components/common/GlobalProvider";
import React,{ useContext ,useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
const NoticeDetail = () => {
  const { noticeBoardSeq } = useParams();
  const [notice, setNotice] = useState({});
  const navigate2 = useNavigate();
  const {globalAxios} = useContext(GlobalContext);

  useEffect(()=>{
      
    console.log("보드 seq: " +noticeBoardSeq);
    globalAxios(`/noticeboard/Noticedetail.do/${noticeBoardSeq}`,"get",{},data=>{
      console.log(data);
      setNotice(data);
      });
      
    },[])




  // useEffect(() => {
  //   console.log(`id는 ${noticeBoardSeq}`);
  //   axios({
  //     method: "get",
  //     url: `/noticeboard/Noticedetail.do/${noticeBoardSeq}`
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       setNotice(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw new Error(error);
  //     });
  // }, [noticeBoardSeq]);
  
  const Viewer = ({ content }) => (
    <div style={{ width: "640", height: "200" }}
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
 
  function convertDate(longValue) {
    return new Date(longValue).toLocaleString();
  }

  return (
    <>
            
      <h2 align="center"> 공지사항</h2>
      <div className="emp-view-wrapper">
        <div className="emp-view-row" >
        <label>번호</label>
        <TextField
          required
          id="outlined-required"
          value={notice.noticeBoardSeq||''}
          style={{padding:'1em'}}
        />
        </div>
        <div className="emp-view-row">
        <label>제목</label>
          <TextField value={notice.title||''} id="outlined-basic"  variant="outlined" style={{padding:'1em'}} />
        </div>
        <div className="emp-view-row">
          <Viewer content={notice.content}/>
          
         
        </div>
        <div className="emp-view-row">
          <label>작성자</label>
          <TextField
          required
          id="outlined-required"
          value={notice.writer||''}
          style={{padding:'1em'}} 
        
        />
        </div>
        <div className="emp-view-row">
          <label>조회수</label>
          <TextField
          required
          id="outlined-required"
          value={notice.hitCount||''}
          style={{padding:'1em'}} 
        />
        </div> 
        <Button variant="outlined" onClick={() => navigate2(-1)}>리스트보기</Button> 
        <Link to="/zumuniyo/NoticeBoard/CkNoticeUpdate" state={{ notice: notice }}>
        <Button variant="outlined">CK수정</Button>
        </Link>
        <Link to="0/zumuniyo/noticeboard/NoticeDelete" state={{ noticeBoardSeq: notice.noticeBoardSeq }}>
        <Button variant="outlined">삭제</Button> 
        </Link>  
        
      </div>
    </>
  );
};

export default NoticeDetail;
