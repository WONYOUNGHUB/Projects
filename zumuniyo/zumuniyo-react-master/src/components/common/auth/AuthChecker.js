import React,{ useEffect,useContext} from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import {useNavigate,useLocation} from "react-router-dom";

const AuthChecker = (props) => {

    const {logined,memType,globalAxios} = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(
        () => { 
            if(!logined) {
                globalAxios('/member/login','get',{},result=>{
                if(!result) {
                  navigate('/zumuniyo/sociallogin');
                return;
              }});
            }

            if(memType==='') return;

            if((props.memType)&&[props.memType,'관리자'].indexOf(memType)===-1){
                alert('권한이 없습니다');
                navigate('/');
            }
        },[location.pathname,logined,memType]
      );

    return (
      <>
        {
          logined?
            (props.memType?
              ([props.memType,'관리자'].indexOf(memType)===-1?
              '':props.children)
              :props.children)
          :''
        }
      </>
    );

  }
  export default AuthChecker;