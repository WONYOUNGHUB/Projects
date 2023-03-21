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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { param } from 'jquery';
// import { FormControl, InputLabel, OutlinedInput } from '@mui/material';


const theme = createTheme();

export default function ShopUpdate(props) {
  const navigator = useNavigate();
  const params = useParams();
  const shopSeq = params.shopSeq;

  // const location = useLocation();
  // console.log(location.state);
  // const originalShop = location.state.shop;
  // console.log(originalShop)

  const { globalAxios } = useContext(GlobalContext);
  const [shopDTO, setShopDTO] = useState({}); //저장 

  const handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    setShopDTO({ ...shopDTO, shopDetail: data });
    console.log(data);
  }

  useEffect(() => {
    selectShop();

  }, [])
  const selectShop = () => {
    globalAxios(`/shop/shopListByseq/${shopSeq}`, 'get', {}, res => {
      console.log("res" + res);
      setShopDTO(res);
    })

  };
  const handleChage = (e) => {
    setShopDTO({ ...shopDTO, [e.target.name]: e.target.value });
  };
  const handleChange2 = (category) => {
    setShopDTO({ ...shopDTO, shopCategory: category });
  };

  const handleChange3 = (location, shopAddrDetail) => {

    setShopDTO({
      ...shopDTO, shopAddrDetail: shopAddrDetail,
      locAddr: location.locAddr, locLat: location.locLat, locLon: location.locLon
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const temp = { ...shopDTO, locAddr: shopDTO.location.locAddr, locLat: shopDTO.location.locLat, locLon: shopDTO.location.locLon }

    globalAxios('/shop/shopupdate', 'put', temp, res => {
      console.log(res);
      if (res) {
        console.log("shopDTO성공");
        navigator("/zumuniyo/shoplist");
      } else {
        console.log("shopDTO실패");
      }

    });


  };


  return (
    <>
      {/* {JSON.stringify(shopDTO)} */}



      {JSON.stringify(shopDTO) !== '{}' ?
        <>

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
                  매장 수정
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {/* <FormControl>
                        <InputLabel htmlFor="component-outlined">매장명</InputLabel>
                        <OutlinedInput
                          id="component-outlined"
                          // value={shopDTO.shopName}
                          value={shopDTO.shopName}
                          // defaultValue={shopDTO.shopName}
                          onChange={handleChage}
                          label="Name"
                        />
                      </FormControl> */}



                      <TextField
                        autoComplete="shopName"
                        name="shopName"
                        required
                        fullWidth
                        id="outlined-uncontrolled"
                        label="매장명"
                        focused
                        value={shopDTO.shopName}

                        onChange={handleChage}

                      />
                    </Grid>



                    <Grid item xs={12}>
                      <Category handleChange2={handleChange2}
                        categoryOriginal={shopDTO.shopCategory}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Address handleChange3={handleChange3}
                        locAddr={shopDTO.location.locAddr}
                        shopAddrDetailParam={shopDTO.shopAddrDetail} />
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
                        value={shopDTO.shopNotice}
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
                        focused
                        value={shopDTO.shopInfo}
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
                        data={shopDTO.shopDetail}
                        config={{
                          language: 'ko'
                        }}
                        onChange={handleCkeditorState}
                      />
                    </Grid>

                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="매장수정을 하시겠습니까?"
                      />
                    </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    매장 수정
                  </Button>

                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
        : ""}
    </>
  );
}