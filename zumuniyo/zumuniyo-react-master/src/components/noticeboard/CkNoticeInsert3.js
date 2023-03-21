import "./CKcss.css";
import { useNavigate } from "react-router-dom";
import { useContext ,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import  ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
import TextField from '@mui/material/TextField';
const CkNoticeInsert = () => {
       
    const {globalAxios} = useContext(GlobalContext);
    const [board, setBoard] = useState({title:"", content:"", boardTop:0,writer:"관리자"});
    //const [content,setContent] = useState();
    const[show,setShow ] = useState(false);
    const[image,setImage] = useState();
    const[flag,setFlag] = useState(false);
    const imgURL = "/img/red_icon03.png"
    const imgLink = `${process.env.PUBLIC_URL}/images`
    
    const getNoticeInsert =()=> {
        globalAxios("/noticeboard/NoticeInsert.go","post",board ,data=>{
            console.log(data);
            alert(` 성공적으로 입력 되었습니다.`);
            navigate("/zumuniyo/NoticeList");
        },'multipart/form-data')
    };

    const customUploadAdapter = (loader)=>{
    return {
        upload(){
            return new Promise((resolve,reject)=> {
                const data = new FormData();
                loader.file.then((file)=>{
                    data.append("name",file.name);
                    data.append("file",file);
                    
                    const uploadCallback = ()=>{
                        if(!flag){
                            setFlag(true);
                            setImage(`${imgLink}/${file.name}`);
                        }
                        resolve({
                            default:`${imgLink}/${file.name}`
                        })
                    };
    
                    
                    //키밸류형식 key:value
                    globalAxios("/noticeboard/NoticeUpload.do","post",data,uploadCallback, 'multipart/form-data' );//, 'multipart/form-data'


                    
                })
            })
        }
    }
}
function uploadPlugin(editor){
    editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
        return customUploadAdapter(loader);
    }
}
const navigate = useNavigate();

const handleCkeditorState = (event,editor) =>{
const data = editor.getData();
    //setContent(data);
    //console.log(data);
    setBoard({ ...board, content:data});
}

const handleChange = (e) => {
    console.log(e);
    if(e.target.name === "boardTop")
        setBoard({ ...board, boardTop: e.target.checked?1:0 });
    else 
    setBoard({ ...board, [e.target.name]: e.target.value });

    console.log(board);
};

const handleSubmit = (e) => {
    e.preventDefault();
    getNoticeInsert();
};

return (
    <form id="empfrm" onSubmit={handleSubmit}>
    <div className="App">
    <div style={{padding:'1em'}}><label> <img src={imgURL} width="20px" height="20px"/ > 공지사항상단고정</label>
    <input
    // className="form-control"
    type="checkbox"
    name="boardTop"
    id="boardTop"
    onChange={handleChange}
    /></div>

    <div className="form-group">
    <TextField placeholder="제목을 입력하세요" id="outlined-basic" name="owner" variant="outlined" onChange={handleChange} />
    </div>
    <div className="form-group">
        <CKEditor

        editor={ ClassicEditor  }
        // data={board.content}
        config={{
            extraPlugins:[uploadPlugin],
            placeholder: "내용을 입력하세요.",
        }}
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
        // ( event, editor ) => {
        //     const data = editor.getData();
        //     console.log( { event, editor, data } );
        // }
        onChange={handleCkeditorState }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
    />
    </div>

<div><input className="btn btn-primary" type="submit" value="입력하기" /></div>
</div>

</form>
);

};

export default CkNoticeInsert;