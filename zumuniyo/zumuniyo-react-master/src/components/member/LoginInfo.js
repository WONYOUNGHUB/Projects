import React,{ useContext ,useEffect} from "react";
import {GlobalContext} from "components/common/GlobalProvider";

const LoginInfo = ()=> {

    // GlobalContext 에서 필요한 요소만 선택
    const {logined,memNick,memType,axiosCounter} = useContext(GlobalContext);

    // 해당요소가 바뀌었을경우 다시 랜더링
    useEffect(
      () => {
      }, [logined,memNick,memType,axiosCounter]
    );

    return (
      <>
        참조용 샘플파일입니다
        <br/>
        로그인상태 : {logined?"로그인됨":"로그인안됨"}
        <br/>
        로그인닉네임 : {memNick}
        <br/>
        로그인타입 : {memType}
        <br/>
        비동기요청카운터 : {axiosCounter}
      </>
    );
  }
  export default LoginInfo;