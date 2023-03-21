import React, { Component } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { height, style, width } from '@mui/system';



const NoticeInsert = () => {
    const [board, setBoard] = useState();
    const navigate = useNavigate();
    const handleChange = (e) => {
      console.log(e);
      if(e.target.name === "boardTop")
          setBoard({ ...board, [e.target.name]: e.target.checked?1:0 });
      else
          setBoard({ ...board, [e.target.name]: e.target.value });
      console.log(board);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e);
  
       axios({
        method: "post",
        url: "/NoticeBoard/NoticeInsert.go",
        data:board,
      })
        .then((res) => {
          console.log(res);
          alert(` 성공적으로 입력 되었습니다.`);
          navigate("/SWY");
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    };



    return (
      <div>
        <h1>공지사항</h1>

        <form id="empfrm" onSubmit={handleSubmit}>
       
        <label>공지사항상단고정</label>
          <input
          // className="form-control"
          type="checkbox"
          name="boardTop"
          id="boardTop"
          onChange={handleChange}
          />
   

          <div className="form-group">
            <label>제목</label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              checked={true}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>content</label>
            <input
              className="form-control"
              type="text"
              name="content"
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>작성자</label>
            <input
              className="form-control"
              type="text"
              name="writer"
              id="writer"
              value="운영자"
              disabled="disabled"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>작성일</label>
            <input
              className="form-control"
              type="date"
              name="regdate"
              onChange={handleChange}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="입력하기" />
          <input className="btn btn-secondary" type="reset" value="취소하기" />
          <input
            className="btn btn-secondary"
            type="button"
            value="목록보기"
            id="NoticeList"
          />
      
          
          
        </form>
      </div>
    ); //return end
  }; //function end

export default NoticeInsert;