import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./CKcss.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
    const CkNoticeInsert = () => {
        const [board, setBoard] = useState({title:"", content:"", boardTop:0,writer:"관리자"});
        //const [content,setContent] = useState();
        const[show,setShow ] = useState(false);
        const[image,setImage] = useState();
        const[flag,setFlag] = useState(false);
        const imgURL = "/img/red_icon03.png"
        const imgLink = `${process.env.PUBLIC_URL}/img`

        const customUploadAdapter = (loader)=>{
            return {
                upload(){
                    return new Promise((resolve,reject)=> {
                        const data = new FormData();
                        loader.file.then((file)=>{
                            data.append("name",file.name);
                            data.append("file",file);
     
                            console.log("AA:", file);
                            console.log(data);

                            axios.post('/noticeboard/NoticeUpload.do',data)
                            .then((res)=>{
                                if(!flag){
                                    setFlag(true);
                                    setImage(`${imgLink}/${file.name}`);
                                }
                                resolve({
                                    default:`${imgLink}/${file.name}`
                                })
                            })
                            .catch((err)=>reject(err));
                        })
                    })
                }
            }
        }
        function uploadPlugin(editor){
            editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
                return customUploadAdapter(loader);
            }

        }
        const navigate = useNavigate();
       
        const handleCkeditorState = (event,editor) =>{
            const data = editor.getData();
            //setContent(data);
            //console.log(data);
            setBoard({ ...board, content:data});
        }

        const handleChange = (e) => {
          console.log(e);
          if(e.target.name === "boardTop")
              setBoard({ ...board, boardTop: e.target.checked?1:0 });
         else 
            setBoard({ ...board, [e.target.name]: e.target.value });
            
          console.log(board);
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log(board);
      
           axios({
            method: "post",
            url: "/noticeboard/NoticeInsert.go",
            data:board,
          })
            .then((res) => {
              console.log(res);
              alert(` 성공적으로 입력 되었습니다.`);
              navigate("/zumuniyo/NoticeBoard/NoticeList");
            })
            .catch((error) => {
              console.log(error);
              throw new Error(error);
            });
        };
     
        return (
            <form id="empfrm" onSubmit={handleSubmit}>
            <div className="App">
            <div style={{padding:'1em'}}><label> <img src={imgURL} width="20px" height="20px"/ > 공지사항상단고정</label>
            <input
            // className="form-control"
            type="checkbox"
            name="boardTop"
            id="boardTop"
            onChange={handleChange}
            /></div>
        
            <div className="form-group">
            <TextField placeholder="제목을 입력하세요" id="outlined-basic" name="title" variant="outlined" onChange={handleChange} />
            </div>
            <div className="form-group">
                <CKEditor
        
                editor={ ClassicEditor  }
                // data={board.content}
                config={{
                    extraPlugins:[uploadPlugin],
                    placeholder: "내용을 입력하세요.",
                }}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                // ( event, editor ) => {
                //     const data = editor.getData();
                //     console.log( { event, editor, data } );
                // }
                onChange={handleCkeditorState }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
            </div>
        
        <div> <Button  type="submit" variant="outlined">입력하기</Button> </div>
        </div>
        
        </form>
        );
        
        };

export default CkNoticeInsert;