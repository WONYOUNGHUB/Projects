import React,{ useEffect,useContext,useState} from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import $ from "jquery";


const ImageUploaderTest = () => {

    const [images, setImages] = useState({});
    const [urlArray, setUrlArray] = useState([]);
    const {globalAxios} = useContext(GlobalContext);

    const uploadResult = result => {

        if(result){
            setUrlArray(result);
            alert("이미지 업로드됨"); 
        }else{
            alert("업로드 실패"); 
        }
    }

    const uploadImages = () => {

        // 하나는 업로드 해야할경우
        if(Object.keys(images).length===0){
            alert("업로드할 이미지가 없습니다");
            return;
        }

        const data = new FormData();
        for (let image of images) {
            data.append("images", image);
        }

        globalAxios('/image/upload','post',data,result=>{uploadResult(result);},'multipart/form-data');

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

    useEffect(
        () => { 

           
  
        },[urlArray]
      );

  return (
    <>
      <h1>이미지 업로드 테스트</h1>
        

        <div id="imagePreview"/>
        <input type="file" id="imageUploader" accept="image/*" multiple onChange={(e) => {
            setImages(e.target.files);
            setImagePreviews(e);
            }} hidden/>
        <button onClick={openUploader}>파일선택</button>
        <button onClick={uploadImages}>업로드</button>
        <br/><br/>
        업로드결과

        {urlArray.map((fileName)=>{
            return (
            <>
                <h3>파일이름:{fileName}</h3>
                <img src={"/image/"+fileName} alt={fileName}/>
            </>
            )
        })}
    </>
  );
};

export default ImageUploaderTest;