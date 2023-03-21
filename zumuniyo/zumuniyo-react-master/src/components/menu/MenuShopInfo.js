import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "components/common/GlobalProvider";
import { Box, Button, ImageList, Paper, TextField, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";
import "./MenuShopInfo.css"; 
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { orange, red, yellow } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
}));






const MenuShopInfo = (props) => {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [shopSeq, setShopseq] = useState(props.shopSeq);
  const [shopList, setShopList] = useState([]);
  const [shop, setShop] = useState({});


  const navigate = useNavigate();


  const shopSelect = () => {
    globalAxios(`/shop/shopListByseq/${shopSeq}`, 'get', {}, res => {
      if (res) {
        console.log(res);
        setShop(res);
        // setShoplist(res);
      } else {
        alert("failed to");
      }
    });
  }

  useEffect(shopSelect, []);


  return (
    <>
    
    <Box    id="shopViewBox"
            width="800px"
            
            >
    <Paper sx={{ height:"200px", padding:"10px" }} >
    <div>

    <Box sx={{ float:"left" }}>
      <img id="shopLogoImg" src={`/image/${shop.shopLogo}`}></img>
      </Box>
      
      <div>
      <Typography id="shopName" variant="h4" >{shop.shopName}</Typography>
      <br/>

      <Typography id="shopInfo" sx={{ pl: 2 }}>{shop.shopInfo}</Typography>

      <Typography id="shopNotice" variant="subtitle2"  >{shop.shopNotice}</Typography>
      <br/>
      </div>

      <div>
      <ColorButton id="gotoShop" onClick={()=>{navigate("/zumuniyo/shop/"+props.shopSeq)}} > 매장정보 보기 </ColorButton>
      </div>

    </div>
    </Paper>
    </Box>
   
   
    </>
  );
}

export default MenuShopInfo;


