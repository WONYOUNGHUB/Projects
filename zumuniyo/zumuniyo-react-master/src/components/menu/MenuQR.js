import React,{ useContext,useEffect, useState } from 'react';
import { GlobalContext } from "components/common/GlobalProvider";
import { useParams,useNavigate } from "react-router-dom";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Paper 
    ,TableCell,TableRow,TableContainer,Table,TableHead,TableBody,Button
    ,Modal,Stack,IconButton,TextField} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import "./MenuQR.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const MenuQR = () => {

    const {globalAxios} = useContext(GlobalContext);
    const params = useParams();
    const navigate = useNavigate();

    const [menuList,setMenuList] = useState('');
    const [menuCategoryList,setMenuCategoryList] = useState('');
    const [menuTopList,setMenuTopList] = useState('');
    const [selectedMenu,setSelectedMenu] = useState('');
    const [tempOrderData,setTempOrderData] = useState({});
    const [orderMenuList,setOrderMenuList] = useState({});

    const [requestData,setRequestData] = useState({
            tableNum: params.tableNum ,
            shopSeq: params.shopSeq,
            orderList : JSON.stringify(orderMenuList),
            couponSeq: 0
    });


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        width: "85%",
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
    const requestOrderResult = result => {
        if(((String)(result)).indexOf(":")!==-1 &&
            ((String)(result)).split(":")[0]==="주문성공"){
            alert("주문성공");
            navigate("/MJH/orderlist/"+((String)(result)).split(":")[1]);
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
        setRequestData({...requestData,"orderList" : JSON.stringify(orderMenuList)})
    }

    useEffect(
        () => {
            getMenuList(params.shopSeq);
            getMenuCategoryList(params.shopSeq)
            getMenuTopList(params.shopSeq)
        }, []
      );

      useEffect(
        () => {
            setRequestData({...requestData,"orderList" : JSON.stringify(orderMenuList)})
        }, [orderMenuList]
      );

      

    return (
        <>
        {/* {JSON.stringify(menuList)}
        <hr/>
        {JSON.stringify(menuCategoryList)}
        <hr/>
        {JSON.stringify(menuTopList)} */}
        <hr/>
        {JSON.stringify(tempOrderData)}
        <hr/>
        {JSON.stringify(orderMenuList)}
        <hr/>
        {JSON.stringify(requestData)}
        <hr/>
        
        {menuList&&menuCategoryList&&menuTopList?
            <>
                <Box    id="MenuTableBox"
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius:'1em',maxWidth:'70em'}}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                            <TableRow >
                            <TableCell colSpan='10' key='title' sx={tableTopStyle}>메뉴리스트</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell sx={tableHeadStyle}>카테고리</TableCell>
                                <TableCell sx={tableHeadStyle}>메뉴이름</TableCell>
                                <TableCell sx={tableHeadStyle}>가격</TableCell>
                                <TableCell sx={tableHeadStyle}>메뉴소개</TableCell>
                                <TableCell sx={tableHeadStyle}>이미지</TableCell>
                                <TableCell sx={tableHeadStyle}>상세 및 담기</TableCell>
                            </TableRow>
                                {menuList .map((menuListRow) => {
                                    return (
                                    <TableRow hover key={menuListRow.menuSeq}>
                                        <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {menuListRow.menuCategory.menuCategoryName}</TableCell>
                                            <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {menuListRow.menuName}</TableCell>
                                            <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> {((Number)(menuListRow.menuPrice)).toLocaleString('ko-KR') +' 원'}</TableCell>
                                            <TableCell sx={{ textAlign:"center" ,minWidth: 90}}> {menuListRow.menuSimpleInfo}</TableCell>
                                            <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> <img src={"/image/"+menuListRow.menuImage} alt={menuListRow.menuImage}/></TableCell>
                                            <TableCell sx={{ textAlign:"center" ,minWidth: 70}}> 
                                                <IconButton edge ="end" onClick={()=>{
                                                        const OrderData = {};
                                                        OrderData[menuListRow.menuSeq]=1;
                                                        setTempOrderData(OrderData);
                                                        openDetail(menuListRow);
                                                    }}>
                                                    <AddShoppingCartIcon/>
                                                </IconButton>
                                            </TableCell>
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        
                    </Paper>
                </Box>

                <Button edge ="end" onClick={()=>{
                        handleCartOpen();
                    }}>
                    카트보기
                </Button>

        {selectedMenu!==''?
        <Modal open={open}>
            <Box sx={modalStyle} id="cartInModal">

                <div id="modalHead"> 상세보기</div>

                <hr/>
                카테고리이름: {selectedMenu.menuCategory.menuCategoryName}
                <hr/>
                메뉴이름: {selectedMenu.menuName}
                <hr/>
                메뉴정보: {selectedMenu.menuSimpleInfo}
                <hr/>
                상세정보: {selectedMenu.menuDetailInfo}
                <hr/>
                갯수 : <TextField sx={textFieldStyle} name="selectedMenuCount" 
                                    defaultValue="1"
                                    onChange={e=>{setCount(e,selectedMenu.menuSeq)}}
                                    label="수량" 
                                    type="number" 
                                    size="small" 
                                    InputProps={{ inputProps: { min: 1} }}
                                    focused/>
                <hr/>
                가격 : {((Number)(selectedMenu.menuPrice)).toLocaleString('ko-KR') +' 원'}
                <hr/>
            
                <Stack spacing={2} direction="row" justifyContent="center">
                    <Button variant="outlined" id="cartInButton" onClick={cartIn}>카트담기</Button>
                    <Button variant="outlined" id="cartCancelButton" onClick={handleClose}>취소</Button>
                </Stack>
                
            </Box>
      </Modal>
        :""}

        <Modal open={cartOpen}>
            <Box sx={modalStyle} id="cartModal">

                <div id="modalHead"> 카트정보</div>

                {Object.keys(orderMenuList).map(menuSeq=>{
                    return (
                        <>
                        <hr/>
                        <div key={menuSeq}>{"메뉴번호: "+menuSeq+" : 갯수: "+orderMenuList[menuSeq]}
                        <Button variant="outlined" onClick={()=>{removeCartItem(menuSeq)}}>x</Button>
                        <br/></div>
                        </>
                    );
                })}
                <Stack spacing={2} direction="row" justifyContent="center">
                    <Button variant="outlined" id="cartInButton" onClick={requestOrder}>주문</Button>
                    <Button variant="outlined" id="cartCancelButton" onClick={handleCartClose}>취소</Button>
                </Stack>
                
            </Box>
      </Modal>

            </>
        :""}
        </>
    );

}

export default MenuQR;


