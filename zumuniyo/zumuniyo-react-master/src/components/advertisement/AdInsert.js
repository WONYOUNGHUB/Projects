
import TextField from '@mui/material/TextField';
import React,{ useContext ,useEffect,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AdInsert2 = () =>{ 
    //{new Date(emp.hire_date).toJSON().split("T")[0] }
    const navigate = useNavigate();
    const {globalAxios} = useContext(GlobalContext);  
                                                      
    const [Ad, setAd] = useState({owner:"",endTime:"",startTime:"",image:""});
    const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {

        console.log(Ad);

    }, [Ad]); 
   
    
    const getAdInsert =()=> {
        globalAxios("/advertisement/advertisementinsert","post", Ad ,data=>{
            console.log(data);
            alert(` 성공적으로 입력 되었습니다.`);
            navigate("/zumuniyo/advertisement/AdList");
        })
    
    };
    const handlerChange = (e)=>{
        console.log(e);
       //const [name,value]=e.target;
        setAd({ ...Ad, [e.target.name]:e.target.value });
       
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getAdInsert();
    };



return(

    <>
    
       <Box
          /* component="form"
          sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
          noValidate
          autoComplete="off"
          id="adfrm"
          onSubmit={handleSubmit} */
        >
        
          <div>
          <label>상호명</label>
          <TextField  id="outlined-basic" name="owner" variant="outlined" onChange={handlerChange} />
          </div>
          <label>시작날짜</label>
         <input type="date" name="startTime" onChange={handlerChange}></input>
          <label>종료날짜</label>
         <input type="date" name="endTime" onChange={handlerChange}></input> 
         <label>데이트피커스타트</label>
         /<DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          //maxDate={addMonths(new Date(), 5)}
          showDisabledMonthNavigation
         /> 
       {/* <div className="calender-container">
                    <div className="calender-box">
                      <div className="date">시작날짜</div>
                    	 <div>
                            <DatePicker 
                              selected={startDate} 
                              dateFormat="yyyy-MM-dd" // 날짜 형식
                              />
                           </div>
                          </div>
                    <div className="calender-box">
                        <div className="date">종료날짜</div>
                         	<div>
                              <DatePicker 
                              selected={endDate} 
                              dateFormat="yyyy-MM-dd"  // 날짜 형식
                               /> 
                    </div>
                    <input name ="startTime" value={endDate} type="hidden" ></input>
                    <input name ="endTime" value={startDate} type="hidden" ></input>
                  </div>
       </div> */}
        <label>광고기한</label>
        
          <input type="file" ></input>
          
    
    <div>
        <button onClick={getAdInsert}>보내기</button>

        {/* <input className="btn btn-primary" type="submit" value="입력하기" /> */}
    </div>
    </Box>

     </>




);

};

export default AdInsert2;