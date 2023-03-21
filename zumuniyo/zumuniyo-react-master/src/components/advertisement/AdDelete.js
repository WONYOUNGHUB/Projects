import React, { useEffect,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {GlobalContext} from "components/common/GlobalProvider";



const AdDelete = () => {
  const location = useLocation();
  const adSeq = location.state.adSeq;
  const {globalAxios} = useContext(GlobalContext);
  let navigate = useNavigate();
  
  
  
 
  
  
  
  useEffect(()=>{
      
    console.log("보드 seq: " +adSeq);
    if (window.confirm("정말 삭제합니까?")) { 
    globalAxios(`/advertisement/deleteAd/${adSeq}`,"delete",{},data=>{
        console.log(data);
        alert(`성공적으로 삭제되었습니다..`);
        navigate("/zumuniyo/advertisement/AdList");
        },[]);
    }else {
         alert("취소합니다.");
           }
     },[]);


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

  export default AdDelete;