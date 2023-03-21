import React,{ useContext,useEffect, useState } from 'react';
import { GlobalContext } from "components/common/GlobalProvider";
import { useParams,useNavigate } from "react-router-dom";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Paper 
    ,TableCell,TableRow,TableContainer,Table,TableHead,TableBody,Button
    ,Modal,Stack,IconButton,TextField, ImageListItem, Grid} from '@mui/material';
import { ExpandLess } from '@mui/icons-material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuCoupon from 'components/menu/MenuCoupon';
import MenuCouponSelector from "components/menu/MenuCouponSelector";

import MenuShopInfo from 'components/menu/MenuShopInfo';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { orange, red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import "./MenuListQR.css"; 




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));




const style = {
  position: 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0)',
 
  width: '24em',
  bgcolor: 'background.paper',
  border: '1px solid gray',
  boxShadow: 18,
  p: 1,

  borderRadius: 2,
  
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  backgroundColor: orange[500],
  '&:hover': {
    backgroundColor: orange[700],
  },
}));






const MenuListQR = () => {

    const {globalAxios} = useContext(GlobalContext);
    const params = useParams();
    const navigate = useNavigate();

    const [detailMenu,setDetailMenu] = useState('');
    const [menuList,setMenuList] = useState('');
    const [menuCategoryList,setMenuCategoryList] = useState('');
    const [menuTopList,setMenuTopList] = useState('');
    const [selectedMenu,setSelectedMenu] = useState('');
    const [tempOrderData,setTempOrderData] = useState({});
    
    const [orderMenuList,setOrderMenuList] = useState({});
    const [menuCategorySeq,setMenuCategorySeq] = useState(-1);
    const [openList,setOpenList] = useState({});
    const [selectedCoupon,setSelectedCoupon] = useState(0);

    const [requestData,setRequestData] = useState({
            tableNum: params.tableNum ,
            shopSeq: params.shopSeq,
            orderList : JSON.stringify(orderMenuList),
            couponSeq: selectedCoupon
    });
    
    const [value, setValue] = useState('Controlled');



    const couponSelect = couponSeq => {
        setSelectedCoupon(couponSeq);
    }


    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    
    const onChange = (event) => {
      setValue(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [topOpen, setTopOpen] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const [checker,setChecker] = useState(true);

    const menuTopClick = () => {
      setTopOpen(!topOpen);
    };
    const categoryClick = menuCategorySeq => {

      const temp = {[menuCategorySeq]:(!openList[(String)(menuCategorySeq)])};

      setOpenList({...openList,...temp});
      
    };


    const consoleTest = param => {
      console.log(param);
    };

    const [cartOpen, setCartOpen] = useState(false);
    const handleCartOpen = () => setCartOpen(true);
    const handleCartClose = () => setCartOpen(false);

    const setCount = (e,menuSeq) => {

        const OrderData = {};
        OrderData[menuSeq]=(Number)(e.target.value);
        setTempOrderData(OrderData);
        
    }
    

    const cartIn = () => {
        const key = Object.keys(tempOrderData)[0];
        if(orderMenuList[key]){
            const OrderData = {};
            OrderData[key]=(Number)(tempOrderData[key]+orderMenuList[key]);
            setOrderMenuList({...orderMenuList,...OrderData});
        }else{
            setOrderMenuList({...orderMenuList,...tempOrderData});
        }
        alert("선택하신 메뉴를 주문목록에 담았습니다.");
        handleClose();
    }
    
    const tableTopStyle = {
        textAlign:"center" ,
        backgroundColor: "rgb(71, 30, 30,0.8)",
        fontWeight:"bold",
        color:"white"
     };
    
     const tableHeadStyle = {
        textAlign:"center" ,
        backgroundColor: "rgb(240, 240, 240)",
        fontWeight:"bold"
     };

     const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '25em',
        bgcolor: 'background.paper',
        boxShadow: 12,
        height: '28.5em'
      };

      const textFieldStyle = {
        '& label.Mui-focused': {
            color: '#AAAAAA',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#AAAAAA',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#AAAAAA',
            },
            '&:hover fieldset': {
              borderColor: '#AAAAAA',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#AAAAAA',
            },
          },
        width: "30%",
        pl: 1
      };

    const getMenuList = shopSeq => {
        globalAxios('/menu/menulist/'+shopSeq,'get',{},data=>{setMenuList(data)});
    }
    const getMenuCategoryList = shopSeq => {
        globalAxios('/menu/menucategory/'+shopSeq, 'get', {}, data=>{setMenuCategoryList(data)});
    };
    const getMenuTopList = shopSeq => {
        globalAxios('/menu/menutopview/'+shopSeq, 'get',  {}, data=>{setMenuTopList(data)});
    };

    const requestOrder = () => {
        globalAxios('/order/orderlist','post',requestData,result=>{requestOrderResult(result)});
    }

    const getDetailMenu = menuSeq => {
      globalAxios('/menu/menudetail/'+menuSeq, 'get', {}, data=>{setDetailMenu(data)} );
    }



    const requestOrderResult = result => {
        if(((String)(result)).indexOf(":")!==-1 &&
            ((String)(result)).split(":")[0]==="주문성공"){
            alert("주문성공");
            navigate("/zumuniyo/orderlist/"+((String)(result)).split(":")[1]);
        }else{
            alert(result);
        }
    }

    const openDetail = menuListRow => {
        setSelectedMenu(menuListRow);
        handleOpen();
    }

    const removeCartItem = menuSeq =>{
        alert("메뉴를 주문목록에서 제거했습니다.");
        delete orderMenuList[menuSeq];
        setRequestData({...requestData, "orderList" : JSON.stringify(orderMenuList)})
    }

    var tempMenuOpen={};
    var tempMenu = "";

    const findDataByMenuSeq = menuSeq => {
      for( let menu of menuList){
        if((Number)(menu.menuSeq) === (Number)(menuSeq)){
          return menu;
        }
      }
      return null;
    }

    


    useEffect(
      () => {
        setRequestData({...requestData, "couponSeq" : selectedCoupon})
      }, [selectedCoupon]
    );

    useEffect(
        () => {
            getMenuList(params.shopSeq);
            getMenuCategoryList(params.shopSeq)
            getMenuTopList(params.shopSeq)
            
        }, []
      );

    useEffect(
        () => {
            setRequestData({...requestData, "orderList" : JSON.stringify(orderMenuList)})
        }, [orderMenuList]
      );
    
     
      

      

    return (
        <>
        {/* {JSON.stringify(menuList)}
        <hr/>
        {JSON.stringify(menuCategoryList)}
        <hr/>
        {JSON.stringify(menuTopList)}
        <hr/>
        {JSON.stringify(tempOrderData)}
        <hr/>
        {JSON.stringify(orderMenuList)}
        <hr/>
        {JSON.stringify(requestData)}
        <hr/>
        {JSON.stringify(openList)}
        <hr/> */}



        <Box  id="shopBox"
              display="flex"
              justifyContent="center"
              alignItems="center">

        <MenuShopInfo shopSeq={params.shopSeq}/>
        
        </Box>
        
        <div></div>
        

        <Box    id="CouponBox"
                        display="flex"
                        justifyContent="center"
                        alignItems="center">

        <MenuCoupon shopSeq={params.shopSeq}/>
        
        </Box>
        
        
        {menuList&&menuCategoryList&&menuTopList?
            <>
            {checker?
              <>
              {(()=>{tempMenuOpen={}})()}
              {
                Object.values(menuCategoryList).map((menuCategory,idx) => (
                  <>
                  {(()=>{tempMenuOpen={...tempMenuOpen,[menuCategory.menuCategorySeq]:(idx===0?true:false)}})()}
                  </>
                ))}
              {(()=>{setChecker(!checker)})()}
              
              {(()=>{setOpenList(tempMenuOpen);
              
              })()}
            </>
            :""}

                <br/>

                <Box    id="MenuCollapseBox"
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                    <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth:'50em'}}>
                        <List  component="nav">
                          <ListItem className="menuTopTitleBtn" >
                            <ListItemButton  onClick={menuTopClick}>
                                <ListItemText primary="추천메뉴" />
                                {topOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                          </ListItem>
                            <Collapse  in={topOpen} timeout="auto" unmountOnExit>
                                <List disablePadding >
                                  <ListItem id="menuTopListSpace">
                                    {Object.values(menuTopList).map((menu) => (
                                        <Paper className="menuTopListBtn" key={menu.menuSeq}>
                                        <ListItemButton id="menuTopListOutside"
                                                        onClick={() => {
                                                        consoleTest(menu.menuSeq); 
                                                        const OrderData = {};
                                                        OrderData[menu.menuSeq]=1;
                                                        setTempOrderData(OrderData);
                                                        openDetail(menu);
                                                    }}>
                                                      <div >
                                                      <ListItem id="menuTopListInside" >
                                            <ImageListItem className="menuQRImage"  >
                                              <img id="imageTop" src={"/image/"+menu.menuImage } />
                                            </ImageListItem>
                                            <ListItemText id="menuTopName" primary={menu.menuName} /> 
                                            {/* <ListItemText primary={menu.menuSimpleInfo} />  */}
                                            <div id="menuTopPriceBottom">
                                            <ListItemText id="menuTopPrice" primary={menu.menuPrice+" 원"} /> 
                                            </div>
                                            </ListItem>
                                            </div>
                                        </ListItemButton>
                                        </Paper>    
                                    ))}
                                    </ListItem>
                                </List>
                            </Collapse>
                            {Object.values(menuCategoryList).map((menuCategory) => (
                              <>
                            <ListItem className="categoryTitleBtn"
                                  key={menuCategory.menuCategorySeq} disablePadding >
                                 <ListItemButton  onClick={() => {categoryClick(menuCategory.menuCategorySeq);}}>
                                        <ListItemText primary={menuCategory.menuCategoryName} />
                                                { menuOpen ? <ExpandLess/> : <ExpandMore/> }
                                 </ListItemButton>
                            </ListItem>
                            
                            {Object.values(menuList).map((menu) => (
                              <>
                                  <Collapse key={menu.menuSeq} in={openList[(String)(menuCategory.menuCategorySeq)]} timeout="auto" unmountOnExit>      
                                  {menuCategory.menuCategorySeq===menu.menuCategory.menuCategorySeq?
                                      <>
                                      <List component="div"  disablePadding >
                                          <ListItem className="categoryListBtn" disablePadding >
                                              
                                                  <ListItemButton sx={{ pl: 4 }} 
                                                    onClick={()=>{
                                                        const OrderData = {};
                                                        OrderData[menu.menuSeq]=1;
                                                        setTempOrderData(OrderData);
                                                        openDetail(menu);
                                                    }}>
                                                      <ListItemText className="nameList" sx={{ textAlign:"left" , minWidth: 30}} primary={menu.menuName} />
                                                      <ListItemText className="infoList" sx={{ textAlign:"right" , minWidth: 30}} primary={menu.menuSimpleInfo} />
                                                      <ListItemText className="priceList" sx={{ textAlign:"right" , minWidth: 30}} primary={menu.menuPrice+ " 원"} />
                                                      <ImageListItem className="menuQRImage" >
                                                      <img id="imageList" src={"/image/"+menu.menuImage } />
                                                      </ImageListItem>
                                                  </ListItemButton>
                                              
                                          </ListItem>
                                          </List>
                                      </>
                                  :""}
                                  </Collapse>      
                                  </>
                                  ))}
                            
                                  </>
                            ))}
                        </List>
                        <div id="voidSpace"></div>
                    </Paper>

                </Box>

                <ColorButton id="cartBtn" variant="contained" onClick={()=>{
                        handleCartOpen();
                    }}>
                    주문목록
                </ColorButton>
                

                {selectedMenu!==''?<>
                 
      
      <div id="menuDetailContainer">
        
        <Modal open={open} >
          
            <div className="modal" id="cartInModal">
            <Box>
            <Card sx={style} id="menuDetailCard">
              <Box>
            <CardHeader
              avatar={ 
                selectedMenu.menuTop?  
                <div><StarIcon sx={{ color: yellow[500] }} aria-label="recommended" /></div> : <div></div>
              }
              className="modal-title" align='center' 
              action={
                <div>
              <IconButton edge="end" aria-label="modal-close" onClick={handleClose} >
                <ClearIcon />
              </IconButton>
              </div>
              }
              title={
                <Typography gutterBottom variant="h5" component="div" >
                  {selectedMenu.menuName}
                </Typography>
                }
              subheader={
                <Typography variant="body2" color="text.secondary" >
                  {selectedMenu.menuCategory.menuCategoryName}
                </Typography>
                }
            />
            <div id="menuDetailWrapper">
              <Grid 
                container
                spacing={0} 
                direction="column"
                alignItems="center"
                justify="center"
                >
            <CardMedia
              component="img"
              height="194"
              image={"/image/"+selectedMenu.menuImage}
              alt="detail-image"
              
            />
            </Grid>
            <CardContent>
              
              <Typography className="subtitle2" variant="subtitle2" color="text.secondary">메뉴소개</Typography>
                <div>
                
                <Typography variant="body1" color="text.primary" >
                  <span id="menuSimpleInfoSpace" >{selectedMenu.menuSimpleInfo}</span>
                </Typography>


                </div>
                
                <div>
              <Typography className="subtitle2" variant="subtitle2" color="text.secondary">주문수량</Typography>
                <TextField sx={textFieldStyle} name="selectedMenuCount" 
                                    defaultValue="1"
                                    onChange={e=>{setCount(e,selectedMenu.menuSeq)}}
                                    // label="수량" 
                                    type="number" 
                                    size="small" 
                                    InputProps={{ inputProps: { min: 1} }}
                                    focused/>
                </div>
                
              <Typography variant="h6" color="text.primary">
                <Typography id="menuPriceGagyuk" className="subtitle2" variant="subtitle2" color="text.secondary">가격</Typography>
                <div id="menuPriceSpace" align='right'>
                  {((Number)(selectedMenu.menuPrice)).toLocaleString('ko-KR') +' 원'} 
                </div>
              </Typography>  


            </CardContent>



            <CardActions disableSpacing>
              {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}

                  <Typography sx={{ pl:1 , pt:1 }}variant="body1" color="text.secondary">상세보기</Typography>  
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    
                    <ExpandMoreIcon />
                  </ExpandMore>
                  
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                
                <Typography variant="body2" color="text.secondary">메뉴상세</Typography>
                <div>
                <TextField
                  id="menuDetailInfo-textField"
                  
                  multiline
                  fullWidth 
                  rows={4}
                  value={selectedMenu.menuDetailInfo}
                  onChange={onChange}
                  
                />
                </div>

              </CardContent>
            </Collapse>
            

            </div>
            </Box>
            
            <Box id="modalBottomWrapper">
                <Stack spacing={2} direction="row" justifyContent="center">
                    <Button variant="outlined" id="cartInButton" onClick={cartIn}>목록에 담기</Button>
                    <Button variant="outlined" id="cartCancelButton" onClick={handleClose}>취소</Button>
                </Stack>
            </Box>

            </Card>
            
           

            
            <br></br>
            </Box>

            </div>
         
          
        </Modal>
      </div>

      </>:""}

        <Modal open={cartOpen} onChange={getDetailMenu}>
            <Box sx={modalStyle} id="cartModal">

                <div id="cartTitle"><p id="titleText">메뉴목록</p> </div>
                <div id="cartContent">
                  <Box sx={{ minHeight: '200px' }}>

                  {(()=>{return(<p id="emptyAlert">{JSON.stringify(orderMenuList)==="{}"?"메뉴 목록이 비어있습니다.":""}</p>)})()}
               
                {Object.keys(orderMenuList).map((menuSeq)=>{
                    return (
                        <>
                        
                        <div key={menuSeq}>
                          {(()=>{ tempMenu= findDataByMenuSeq(menuSeq);})()}
                          
                          {/* {"메뉴번호: "+ menuSeq + ", 갯수: " + orderMenuList[menuSeq]} */}
                        
                          <ListItem className='cartInMenuList'>
                            <ListItemButton className="listButton">
                              <ListItemText sx={{ textAlign:"left" , minWidth: 30}} primary={tempMenu.menuName} />
                              <ListItemText sx={{ textAlign:"right" , minWidth: 30}} primary={tempMenu.menuPrice + "원"} />
                              <ListItemText sx={{ textAlign:"right" , minWidth: 30}} primary={orderMenuList[menuSeq] + "개"} />
                              <IconButton variant="outlined" onClick={()=>{removeCartItem(menuSeq)}}>
                                <CancelIcon />
                              </IconButton>
                            </ListItemButton>
                          </ListItem> 
                       
                        
                        
                        <br/>
                        </div>
                        
                        </>
                    );
                })}
                </Box>
          </div>
          <div>
            <MenuCouponSelector shopSeq={params.shopSeq} couponSelect={couponSelect}/>
          </div>    

                <Stack id="cartBottom" spacing={2} direction="row" justifyContent="center">
                    <Button variant="outlined" id="cartInButton" onClick={requestOrder}>주문하기</Button>
                    <Button variant="outlined" id="cartCancelButton" onClick={handleCartClose}>취소</Button>
                </Stack>
                
            </Box>
      </Modal>

            </>
        :""}
        </>
    );

}

export default MenuListQR;


