
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React , { useContext ,useEffect,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone"
const BasicModal = () =>{
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height:800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [Ad, setAd] = useState({owner:"",endTime:"",startTime:"",image:""});
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());

    const [images, setImages] = useState({});
    // const [urlArray, setUrlArray] = useState([]);
    const {globalAxios} = useContext(GlobalContext);

    const uploadResult = result => {
        if(result){
           
            alert("이미지 업로드됨"); 
           
            getAdInsert(result);
            console.log("결과 "+result);
        }else{
            alert("업로드 실패"); 
        }
    }

    const uploadImages = () => {

        // 하나는 업로드 해야할경우
        if(Object.keys(images).length==0){
            alert("업로드할 이미지가 없습니다");
            return;
        }

        const data = new FormData();
        for (let image of images) {
            data.append("images", image);
            
        }
        
        
        globalAxios('/image/upload','post',data,result=>{
            uploadResult(result);},'multipart/form-data');

    }

    const setImagePreviews = e => {

        $("div#imagePreview").html("");
        
        for(let image of e.target.files){

            const reader = new FileReader();
            reader.onload = e => {
                const img = document.createElement("img");
                img.setAttribute("src", e.target.result);
                $("div#imagePreview").append(img);
                
            };
            reader.readAsDataURL(image);
        }
        
    }

    const openUploader = () =>{
        $("#imageUploader").trigger("click");
    }

     
   useEffect(() => {

      console.log(Ad);

   }, [Ad]); 
 
  
  const getAdInsert =(result)=> {
    console.log({...Ad, image: result[0]});
                                                      //스트링으로넣어서 백엔드에서 timestamp스트링으로 받아서 고쳐야됌
                                                      // 9시간 차이남. 
      globalAxios("/advertisement/advertisementinsert","post", {...Ad, image: result[0],startTime: moment(startDate).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss").replace("T"," "),endTime: moment(endDate).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss").replace("T"," ") } ,data=>{
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


  return (
    <div>
      <Button onClick={handleOpen}>광고등록</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          광고등록
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <h1>광고등록</h1>
          <div style= {{padding:'1em'}}>
          <TextField  label="상호명" id="outlined-basic" name="owner" variant="outlined" onChange={handlerChange} />
          </div>
          <div style= {{padding:'1em'}}>
          <label style={{marginRight:'1em'}}>시작날짜 :</label>
          {/* <input type="date" name="startTime" onChange={handlerChange} ></input> */}
         <DatePicker
          selected={startDate}
          onChange= {(date) => setStartDate(date)} 
          minDate={new Date()}
          //maxDate={addMonths(new Date(), 5)}
          showDisabledMonthNavigation
         /> 
       
          </div>
         <div style= {{padding:'1em'}}> 
         <label style={{marginRight:'1em'}}>종료날짜 :</label>
         <DatePicker
          selected={endDate}
          onChange= {(date) => setEndDate(date)} 
          minDate={new Date()}
          //maxDate={addMonths(new Date(), 5)}
          showDisabledMonthNavigation
         /> 
         {/* <input type="date" name="endTime" onChange={handlerChange}></input>  */}
         </div>
        <div>
        

        </div>
        <div id="imagePreview"/>
        <input type="file" id="imageUploader" accept="image/*" multiple onChange={(e) => {
            setImages(e.target.files);
            setImagePreviews(e);
            }} hidden/>
        {/* <button onClick={openUploader} style= {{padding:'1em',marginLeft:'1em'}}>파일선택 </button> */}
        <Button variant="outlined" onClick={openUploader}>파일선택</Button>
        {/* <button onClick={uploadImages} style= {{padding:'1em'}}>업로드</button>  */}
        <Button variant="outlined" onClick={uploadImages}>파일선택</Button>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
    

    
  );
}
export default BasicModal;