
import React,{ useContext ,useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {GlobalContext} from "components/common/GlobalProvider";

const NoticeUpdate = () => {


  const {globalAxios} = useContext(GlobalContext);
  const location = useLocation();
  const originalNotice = location.state.notice;
  const [notice, setNotice] = useState(originalNotice);
  let navigate = useNavigate();
  console.log(notice);
   
  



  const handleChange = (e) => {
    console.log(e);
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };
//   function convertDate(longValue) {
//     return new Date(longValue).toJSON().split("T")[0];
//   }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("저장:", notice);
    globalAxios("/noticeboard/NoticeUpdate.do","post",{},data=>{
    console.log(data);
    alert(`변경사항이 성공적으로 저장되었습니다.`);
    navigate("/SWY");
    })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  /*   emp-view-wrapper"
  emp-view-row */
  return (
    <>
      <h2 align="center"> 공지사항 내용수정</h2>
      <form id="noticefrm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={notice.title}
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <input
            className="form-control"
            type="text"
            name="content"
            onChange={handleChange}
            value={notice.content}
          />
        </div>
        <div>
        <label>번호</label>
          <input
            className="form-control"
            type="text"
            name="content"
            onChange={handleChange}
            value={notice.noticeBoardSeq}
        />
        </div>
       
        <input className="btn btn-primary" type="submit" value="수정하기" />
        <input className="btn btn-secondary" type="reset" value="취소하기" />
        <input
          className="btn btn-secondary"
          type="button"
          value="목록보기"
          id="empList"
        />
      </form>
    </>
  );
};

export default NoticeUpdate;
