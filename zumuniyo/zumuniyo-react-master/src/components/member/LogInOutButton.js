import React,{ useContext ,useEffect} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import "./LogInOutButton.css";

const LogInOutButton = () => {

    const {logined,setLogined,setMemNick,setMemType,globalAxios} = useContext(GlobalContext);

    const logout = () => {
        globalAxios('/member/logout','post',{},result=>{
          if(result) {
            sessionStorage.clear();
            setLogined(false);
            setMemNick('');
            setMemType('');
            alert("로그아웃 되었습니다");
          }});
    }

    useEffect(
      () => {
        globalAxios('/member/login','get',{},result=>{setLogined(result)});
        globalAxios('/member/nick','get',{},result=>{setMemNick(result)});
        globalAxios('/member/type','get',{},result=>{setMemType(result)});
      }, [logined]
    );

    return (
      <>
         { logined ?
         <IconButton onClick={logout}>
          <LogoutIcon id="logoutbutton" />
          </IconButton>
          : 
          <Link to="/zumuniyo/sociallogin"><IconButton><LoginIcon id="loginbutton"/></IconButton></Link> 
          }
      </>
    );
  }
  export default LogInOutButton;