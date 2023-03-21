import NotFound from "components/common/NotFound";
import React,{  useEffect, useContext } from "react";
import { Route, Routes,useNavigate} from "react-router-dom";
import Register from 'components/member/Register'
import { GlobalContext } from "components/common/GlobalProvider";
import "./NaverLogin.css";

const NaverLogin = (props)=> {
  
    const {globalAxios,logined,backLocation,currentLocation} = useContext(GlobalContext);
    const navigate = useNavigate();

    const loginResult = (result,email)=>{
      if (result === '아이디없음'){
        window.opener.postMessage("register:"+email+":naver",window.origin);
        window.self.close();
      }
      else if(result === '로그인성공'){
        window.opener.postMessage("loginSuccess",window.origin);
        window.self.close();
      }else if(result === '토큰이상'){
        window.location.reload();
      }
      else{
        alert(result);
        window.self.close();
      }
    };

    const login = () => {
        props.naverLogin.getLoginStatus((status)=>{
        if(status){
            const memEmail = JSON.stringify(props.naverLogin.user.email).replaceAll('"','');
            const memToken = JSON.stringify(props.naverLogin.accessToken.accessToken).replaceAll('"','');

            globalAxios('/member/login/naver/','post',{memEmail:memEmail,memToken:memToken},result=>{loginResult(result,memEmail)});
            
        }
      })
    };

    useEffect(() => {
      if(logined)navigate(backLocation);
      if(window.opener===null)return;
      login();
    }, [logined,currentLocation]);

    return (
        <>
        {window.opener!==null?<div id="hider"/>:""}
        <Routes>
          <Route path="/" element={<><div id="hider"/></>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </>
    );
  }
  export default NaverLogin;