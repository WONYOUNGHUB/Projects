import React,{ useEffect,useContext,useState} from "react";
import { GlobalContext } from "components/common/GlobalProvider";

const CRUDTest = ()=> {

    const {globalAxios} = useContext(GlobalContext);
    const [responseData,setResponseData] = useState('');

    const requestGetTest = () => {
      globalAxios('/main/','get',{id:'gettest',pw:'456'},result=>{setResponseData(result)});
    }
    const requestPostTest = () => {
        globalAxios('/main/','post',{id:'posttest',pw:'123'},result=>{setResponseData(result)});
    }
    const requestPutTest = () => {
        globalAxios('/main/','put',{id:'puttest',pw:'789'},result=>{setResponseData(result)});
    }
    const requestDeleteTest = () => {
        globalAxios('/main/','delete',{id:'deletetest',pw:'012'},result=>{setResponseData(result)});
    }

    
    useEffect(
        () => { 
          
        },[]
      );

    return (
      <>
        오더테스트<br/>

        <button onClick={requestPostTest}>post 보내기</button><br/>
        <button onClick={requestGetTest}>get 보내기</button><br/>
        <button onClick={requestPutTest}>put 보내기</button><br/>
        <button onClick={requestDeleteTest}>delete 보내기</button><br/>

        전달받은값 : {responseData}<br/>
        
      </>
    );
  }
  export default CRUDTest;