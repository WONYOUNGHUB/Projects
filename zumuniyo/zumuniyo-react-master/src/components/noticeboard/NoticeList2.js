import React,{ useContext ,useEffect,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";

import {Link} from  "react-router-dom";
import Pagination from './Pagination';

const NoticeList2 = () => {

    const {globalAxios} = useContext(GlobalContext);
    const [noticelist,setNoticelist] = useState([]);
    const [limit,setLimit] = useState(5);
    const [page,setPage] = useState(1);
    const offset = (page-1 )*limit;
    const imgURL = "/images/red_icon03.png"
   
    const getNoticeList = () => {

        globalAxios("/noticeboard/Noticelist.go","get",{},data=>{
            console.log(data);
            setNoticelist(data);
        })
    }

    useEffect(() => {

        getNoticeList();

    }, []); 
    
    return ( 
            
            
                <div> 
                <h2 className="text-center">공지사항</h2>
                <Link to="/SWY/NoticeBoard/CkNoticeInsert">
                <button className="insertNotice2">CK글쓰기</button>
                </Link>
                <Link to="/SWY/advertisement/AdList">
                <button className="ad">광고</button>
                </Link>
                <Link to="/SWY/advertisement/ImgSlider">
                <button className="Imgslider">슬라이더</button>
                </Link>  
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목 </th>
                                <th>작성일 </th>
                                <th>조회수 </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                noticelist.slice(offset, offset+limit).map((
                                    list, index) => 
                                    <tr key = {index}>
                                    {/* <tr key = {list.noticeBoardSeq}> */}
                                        <td>{list.noticeBoardSeq}</td> 
                                        <td> 
                                        <Link to={`/zumuniyo/Noticeboard/NoticeDetail/${list.noticeBoardSeq}`}>{list.title} </Link>  
                                        {list.boardTop==1?<img src={imgURL} alt={list.noticeBoardSeq} width="20px" height="20px"/>:<div/>}
                                        </td>
                                       
                                        <td> { new Date(list.regdate).toJSON().split("T")[0]} </td>
                                         <td>{list.hitCount} </td>   
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
               
                <Pagination total={noticelist.length} limit={limit} page={page} setPage={setPage}/>
            </div>   
        );
        
    };

export default NoticeList2;

 