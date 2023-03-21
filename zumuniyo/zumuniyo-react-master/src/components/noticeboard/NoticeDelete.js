import React, { useEffect,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {GlobalContext} from "components/common/GlobalProvider";



const NoticeDelete = () => {
  const location = useLocation();
  const noticeBoardSeq = location.state.noticeBoardSeq;
  const {globalAxios} = useContext(GlobalContext);
  let navigate = useNavigate();
  
  
  
 
  
  
  
  useEffect(()=>{
      
    console.log("보드 seq: " +noticeBoardSeq);
      globalAxios(`/noticeboard/NoticeDelete.do/${noticeBoardSeq}`,"delete",{},data=>{
        console.log(data);
        alert(`성공적으로 삭제되었습니다..`);
        navigate("/zumuniyo/noticeboard/NoticeList");
        })
      },[])
    
      // axios({
      //   method: "delete",
      //   url: `/noticeboard/NoticeDelete.do/${noticeBoardSeq}`,
      // })
      //   .then((res) => {
      //     console.log(res);
      //     alert(`성공적으로 삭제 되었습니다.`);
      //     navigate("/SWY");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     throw new Error(error);
      //   });

      // },[])
    
    
    
  return <div></div>;
  }

export default NoticeDelete;

