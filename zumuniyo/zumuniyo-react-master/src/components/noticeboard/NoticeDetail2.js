
import {GlobalContext} from "components/common/GlobalProvider";
import React,{ useContext ,useEffect,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
        <div className="emp-view-row">
          <label>번호</label>
          <label>{notice.noticeBoardSeq}</label>
        </div>
        <div className="emp-view-row">
          <label>제목</label>
          <label>{notice.title}</label>
        </div>
        <div className="emp-view-row">
          <label>내용</label>
          <Viewer content={notice.content} />
        
          {/* <label>{notice.content}</label> */}
        </div>
        <div className="emp-view-row">
          <label>작성자</label>
          <div>{notice.writer}</div>
        </div>
        <div className="emp-view-row">
          <label>조회수</label>
          <div>{notice.hitCount}</div>
        </div> 
        <button onClick={() => navigate2(-1)}>리스트보기</button>
        <Link to="/SWY/NoticeBoard/NoticeUpdate" state={{ notice: notice }}>
          수정
        </Link>
      <div>
        <Link to="/SWY/NoticeBoard/CkNoticeUpdate" state={{ notice: notice }}>
          CK수정
        </Link>
        </div>
        <Link to="/SWY/noticeboard/NoticeDelete" state={{ noticeBoardSeq: notice.noticeBoardSeq }}>
          삭제
        </Link>  
      </div>
    </>
  );
};

export default NoticeDetail;
