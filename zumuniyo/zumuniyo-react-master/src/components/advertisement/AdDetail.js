import {GlobalContext} from "components/common/GlobalProvider";
import React,{ useCallback, useContext ,useEffect,useState} from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
;



const AdDetail =() =>{

  const { adSeq } = useParams();
  const [adDetail, setAdDetail] = useState({});
  const navigate = useNavigate();
  const {globalAxios} = useContext(GlobalContext);
  const timestamp = adDetail.startTime
  const etimestamp = adDetail.endTime
  const edate = new Date(etimestamp);
  const date = new Date(timestamp);
 console.log(date.getTime())
 console.log(date)
 
//  const onChange =useCallback(e=>{
//     setValue(e.target.value);
//   },[]);
  
  useEffect(()=>{
      
    console.log("광고 seq: " +adSeq);
    globalAxios(`/advertisement/advertisementDetail/${adSeq}`,"get",{},data=>{
      console.log(data);
      setAdDetail(data);
      });
      
    },[])

  
  
   return (

    <Box
    component="form"
    sx={{ backgroundColor: 'grey',
            width: 300,
            height: 300,
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
        <h1>광고정보</h1>
    <div>
    <TextField label="번호"  value={adDetail.adSeq||''} color="secondary" onChange={onchange} />
    </div>
    <div>
    <TextField label="광고주" value={adDetail.owner||''} color="secondary" />
    </div>
    <div>
    <TextField label="시작일" value={date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()||''} color="secondary" />~
             <TextField label="종료일" value={edate.getDate()+
          "/"+(edate.getMonth()+1)+
          "/"+edate.getFullYear()||''} color="secondary" />
    </div>      
         <Link to="/zumuniyo/advertisement/AdUpdate" state={{ adSeq:adDetail.adSeq }}>
         <button>뒤로가기</button>
        </Link> 
    </Box>
    


    
    
  );
};
export default AdDetail;