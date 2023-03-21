import React,{ useEffect,useContext } from "react";
import NaverLoginButton from 'images/naverlogin/btnW_완성형.png';
import KaKaoLoginButton from 'images/kakaologin/kakaologin.png';
import { Route, Routes,useNavigate} from "react-router-dom";
import NotFound from "components/common/NotFound";
import NaverLogin from "components/member/NaverLogin";
import KakaoLogin from "components/member/KakaoLogin";
import {GlobalContext} from "components/common/GlobalProvider";
import "./SocialLogin.css";
import mark from 'images/mark/mark.png'

const SocialLogin = (props)=> {

    const {logined,setLogined,beforeLocation,backLocation,setBackLocation} = useContext(GlobalContext);

    const { naver } = window;
    const navigate = useNavigate();

    const clickNaverLogin = () => document.getElementById("naverIdLogin").firstChild.click();

    const naverLoginButton = <img id='naverLoginButton' 
                                  src={NaverLoginButton} 
                                  alt='네이버로그인버튼' 
                                  onClick={clickNaverLogin} />;

    const kakaoLoginButton = <img id='kakaoLoginButton' 
                                  src={KaKaoLoginButton} 
                                  alt='카카오로그인버튼' />;


    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'BR7MTDuiJVo2gsGBsL57',
      callbackUrl: 'http://localhost:3000/zumuniyo/sociallogin/naver',
      isPopup: true,
      loginButton: { color: 'white', type: 1, height: '1' },
    });

    const initNaverLogin = () => naverLogin.init();       

    const loginButton = <> 
      <div id="socialLoginWrapper">
        <hr className="hiddenhr"/>
          <div id="markwrapper">
            <img src={mark} id="mark"/>
          </div>
        <hr className="hiddenhr"/>
        {naverLoginButton}
        <hr className="hiddenhr"/>
      </div>
    </>;

    const getLoginResultMessage = () => {

      window.addEventListener("message",m=>{

        if(m.origin!==window.origin) return;

        if(m.data==="loginSuccess"){
          setLogined(true);
          navigate(backLocation);
        }

        if(String(m.data).substr(0,9)==="register:"){
          navigate(m.data.split(":")[2]+"/register",
            {
              state:{memEmail:m.data.split(":")[1],
              socialType:m.data.split(":")[2]}
            });
          }
        }
      );
    }

    useEffect(
      () => {
          initNaverLogin();

          if(backLocation!==beforeLocation&&String(beforeLocation).indexOf("sociallogin")<0){
            setBackLocation(beforeLocation);
          }

          if(logined) navigate(backLocation);
        
      }, [beforeLocation,logined]
    );

    useEffect(      
      () => {
        getLoginResultMessage();
      }, [backLocation]
    );

    return (
      <>
        <Routes>
          <Route path="/" element={loginButton} />
          <Route path="/naver/*" element={<NaverLogin naverLogin={naverLogin} />} />
          <Route path="/kakao/*" element={<KakaoLogin />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <div id='naverIdLogin' />
      </>
    );
  }
  export default SocialLogin;