// import * as React from 'react';
import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from 'components/common/GlobalProvider';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import Ckeditorwrite from 'components/shop/components/Ckeditorwrite';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Address from 'components/shop/components/Address';
import Category from 'components/shop/components/Category';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';


const theme = createTheme();

export default function SignUp() {
  const navigator = useNavigate();

  const { globalAxios } = useContext(GlobalContext);
  const [shopInsert, setShopInsert] = useState({});

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setShopInsert({ ...shopInsert, shopDetail: data });
    console.log(data);
  }
  const handleChage = (e) => {

    setShopInsert({ ...shopInsert, [e.target.name]: e.target.value });


  };
  const handleChange2 = (category) => {
    setShopInsert({ ...shopInsert, shopCategory: category });
  };

  const handleChange3 = (location, shopAddrDetail) => {

    setShopInsert({
      ...shopInsert, shopAddrDetail: shopAddrDetail,
      locAddr: location.locAddr, locLat: location.locLat, locLon: location.locLon
    });
  };

  const insertShopResult = data => {

    globalAxios('/shop/shopInsert', 'post', data, res => {
      console.log(res);
      if (res) {
        console.log("입력성공");
        navigator("/zumuniyo/shoplist");
      } else {
        console.log("입력실패");
      }

    });

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (JSON.stringify(images) === "{}") {
      insertShopResult(shopInsert);
    } else {
      uploadImages();
    }
  };

  const [images, setImages] = useState({});


  const uploadResult = result => {

    if (result) {

      let temp = shopInsert;
      temp = { ...temp, "shopLogo": result };

      insertShopResult(temp);

    }
  }

  const uploadImages = () => {

    // 하나는 업로드 해야할경우
    if (Object.keys(images).length === 0) {
      alert("업로드할 이미지가 없습니다");
      return;
    }

    const data = new FormData();
    for (let image of images) {
      data.append("images", image);
    }

    // globalAxios('/image/upload', 'post', data, result => { uploadResult(result); }, 'multipart/form-data');
    globalAxios('/shop/upload', 'post', data, result => { uploadResult(result); }, 'multipart/form-data');

  }

  const setImagePreviews = e => {

    $("div#imagePreview").html("");

    for (let image of e.target.files) {

      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.setAttribute("src", e.target.result);
        $("div#imagePreview").append(img);

      };
      reader.readAsDataURL(image);
    }

  }

  const openUploader = () => {
    $("#imageUploader").trigger("click");
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            매장 등록
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="shopName"
                  name="shopName"
                  required
                  fullWidth
                  id="shopname"
                  label="매장명"
                  autoFocus
                  onChange={handleChage}

                />
              </Grid>


              <Grid item xs={12}>
                <Category handleChange2={handleChange2} />
              </Grid>

              <Grid item xs={12}>
                <Address handleChange3={handleChange3} />
              </Grid>

              <br />

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shopNotice"
                  label="사장님 알림"
                  name="shopNotice"
                  autoComplete="family-name"
                  onChange={handleChage}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shopInfo"
                  label="짧은 소개"
                  id="shopInfo"
                  autoComplete="new-password"
                  onChange={handleChage}
                />
              </Grid>


              <Grid item xs={12}>
                <CKEditor
                  onReady={editor => {
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );
                  }}
                  editor={ClassicEditor}
                  data={shopInsert.shopDetail}
                  config={{ // (4)
                    // extraPlugins: [uploadPlugin],
                    language: 'ko'
                  }}
                  onChange={handleCkeditorState}

                />
                {/* <Ckeditorwrite sx={{ mt: 3, mb: 2 }} /> */}
              </Grid>



              <Grid item xs={12}>
                <div id="imagePreview" />
                <input type="file" id="imageUploader" accept="image/*" onChange={(e) => {
                  setImages(e.target.files);
                  setImagePreviews(e);
                }} hidden />
                <h6>매장 로고</h6>
                <button type='button' onClick={openUploader}>파일선택</button>
                <br /><br />

              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="매장등록을 하시겠습니까?"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              매장 등록
            </Button>

          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}