// import React from 'react'
import axios from "axios";

import React, { useState, useEffect, useContext, useLocation  } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from "react-router-dom";

import '@ckeditor/ckeditor5-build-classic/build/translations/ko.js'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Dialog, Divider } from '@mui/material';
import { GlobalContext } from "components/common/GlobalProvider";
import './ReviewInsert.css';


export default function ReviewInsert(props) {
  const navigate = useNavigate();
  const params = useParams();
  const orderSeq = params.orderGroupSeq;  
  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);
  const [reviewInsert, setReviewInsert] = useState({});
  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setReviewInsert({ ...reviewInsert, reviewContent: data });
    console.log(data);
  }
 
  const handleChange = (e) => {
    console.log(e);
    setReviewInsert({ ...reviewInsert, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reviewInsert);

    globalAxios(`/review/reviewInsert/${orderSeq}`, 'post', reviewInsert, response => {
      console.log("respose");
      console.log(response);
      if (response == 1) {
        console.log(reviewInsert);
        setShow(true);  //성공알림
      } else {
        alert("failed to ");
      }
    });

    // axios({
    //   method: "post",
    //   url: "/review/reviewInsert",

    //   data: reviewInsert

    // })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(reviewInsert);
    //     setShow(true);  //성공알림

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     throw new Error(error);
    //   });
  };

  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const [flag, setFlag] = useState(false);

  const imgLink = `${process.env.PUBLIC_URL}/img`;

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("name", file.name);
            data.append("file", file);            
            console.log(data);

            axios.post('/review/upload', data)            
              .then((res) => {
                console.log("res"+res.data);
                if (!flag) {
                  setFlag(true);
                  setImage(`${imgLink}/${res.data}`);
                }
                resolve({
                  default: `${imgLink}/${res.data}`
                });
              })
              .catch((err) => reject(err));
          })
        })
      }
    }
  }


  function uploadPlugin(editor) { 
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    }
  }




  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Divider>
      <h1>리뷰작성</h1>      
      </Divider>
      
      <Box style={{ margin: "0 auto" }}
        sx={{
          width: "80%",
          position: 'relative',
          minHeight: 500,
        }}>

        <Dialog open={show}>
          <Alert severity="info">성공적으로 입력 되었습니다.<Button variant="outlined" onClick={() => { setShow(false); navigate('/zumuniyo/normal/reviewMemList'); }} >확인</Button></Alert>          
        </Dialog>

        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
          <form id="rewviewfrm" onSubmit={handleSubmit}>


            <Box style={{ margin: "0 auto" }}
              sx={{ width: "30%" }}>
              <div>
                <p style={{ margin: "0 auto", textAlign: "center" }}>

                  양<br />
                  <Rating name="reviewAmount" size='large' precision={0.5} defaultValue={0} onChange={handleChange} />
                </p>
                <br />
              </div>
              <div>
                <p style={{ margin: "0 auto", textAlign: "center" }}>
                  서비스<br />
                  <Rating name="reviewService" size='large' precision={0.5} defaultValue={0} onChange={handleChange} />
                </p>
                <br />
              </div>
              <div>
                <p style={{ margin: "0 auto", textAlign: "center" }}>
                  맛<br />
                  <Rating name="reviewTaste" size='large' precision={0.5} defaultValue={0} onChange={handleChange} />
                </p>
                <br />
              </div>
            </Box>
            <div>
              <CKEditor
                onReady={editor => {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                      // , editor.config.allowedContent = true
                    );
                }}
                editor={ClassicEditor}
                data={reviewInsert.reviewContent}
                config={{ // (4)
                  extraPlugins: [uploadPlugin],
                  language: 'ko'
                }}
                onChange={handleCkeditorState}

              />
            </div>
            <br />
            <div style={{ margin: "0 auto", textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary" >입력하기</Button>             
            </div>
          </form>
        </Box>
      </Box>
    </div>
  )
}
