import { useLocation, useParams } from "react-router";
import axios from "axios";
import React , { useContext ,useEffect,useState} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import {Box,Grid, Paper  } from '@mui/material'
import { bgcolor } from "@mui/system";
import { auto } from "@popperjs/core";
import {Link} from  "react-router-dom";
import CardActionArea from '@mui/material/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
// import "./SearchResult.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin:auto
}));

const SearchResult = ()=> {

  
 
 const location = useLocation();
 const shoplist = location.state.shoplist; 
 console.log("샵: "+shoplist);
  
  
 return(
   <>
  <h1>검색결과</h1>
  {/* <Box sx={{flexGrow:1}}> */}
  <Grid
 container
 direction="row-reverse"
 justifyContent="space-around"
 alignItems="stretch"
 spacing={{ xs: 2, md: 3 }}
 columns={{ xs: 4, sm: 8, md: 12 }}

>
  {shoplist.map((shop,index)=>{
    return(
      index<6?(
        <>
    
      {/*링크수정 */}
      <Grid item key ={index} xs={4}  pr={1} >  
      <Card elevation={5} sx={{width:"100%", height:"100%" , border:"auto" }} >
      <CardActionArea component={RouterLink} to={`/zumuniyo/shop/${shop.shopSeq}`}>
      <CardHeader title={shop.shopName} ></CardHeader>
      <hr/>
      <CardContent>{shop.shopInfo}</CardContent>
      <CardContent>{shop.shopCategory}</CardContent>
      <CardMedia height="194">
      <img src={`/image/${shop.shopLogo}`}/>
      </CardMedia> 
      </CardActionArea>
       </Card>
      </Grid> 
    </>)
    :""
    
    )
  })}   
  </Grid >
  {/* </Box> */}
  </>
   )
  }
  
export default SearchResult;






{/* <Grid container spacing={{md:3}} columns={{xs:4, sm:8, md:12}} >
  {shoplist.map((shop,index)=>{
    return(
      <Grid item key ={index} xs={4}  pr={1}>  
      <Item>
      <Card elevation={5} sx={{ maxWidth: 200 , height:"100%"}}  >
      <CardHeader title={shop.shopName} ></CardHeader>
      <CardContent>{shop.shopInfo}</CardContent>
      <CardContent>{shop.shopCategory}</CardContent>
      <CardMedia height="194">
      <img src={`/image/${shop.shopLogo}`}/>
      </CardMedia>  
    </Card>
    </Item>
    </Grid>
    )
  })}  
  </Grid> */}