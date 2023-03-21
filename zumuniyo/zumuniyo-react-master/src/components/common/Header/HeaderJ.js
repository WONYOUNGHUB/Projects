
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SideBar from "components/common/Header/SideBar"
import React , { useState,useContext} from "react";
import LogInOutButton from "components/member/LogInOutButton"
import {GlobalContext} from "components/common/GlobalProvider";
import { useNavigate } from 'react-router';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import "./HeaderJ.css";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() { 
  const [word, setWord] = useState("");
  const [Shoplist,setShoplist] =useState([]);
  const {globalAxios} = useContext(GlobalContext);
  // const onSubmit = async () => {
  //   window.location.href = "/search/" + word;
  // };
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    globalAxios("/shopsearch","get",{keyword:word},data=>{
      console.log(data);
      setShoplist(data); //{} [] 
      navigate("/zumuniyo/search/SearchResult",{state: {shoplist: data}});
    })
  };


  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#471e1e" }}>
          <Toolbar>
            <IconButton style={{ color: "white" }} onClick={()=>{navigate('/zumuniyo')}}>
              ZUMUNIYO
            </IconButton>

            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
             
              <StyledInputBase
                placeholder="매장, 음식..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                  setWord(e.target.value);
                  console.log(word);
                  }}
              />
            

              <IconButton id="searchButton" onClick={handleSubmit}>
                <ManageSearchIcon id="searchIcon"/>
              </IconButton>

            </Search>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              {/* <IconButton> */}
                {/* LOGIN */}
                
                <LogInOutButton/>
              {/* </IconButton> */}
            </Box>            
             <SideBar />            
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
