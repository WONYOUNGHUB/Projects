import React,{useContext, useEffect, useState} from 'react';

import "./MenuCategoryModal.css";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { GlobalContext } from 'components/common/GlobalProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 18,
    p: 4,
  
    borderRadius: 2,
    
  };
  

const MenuCategoryModal = (props) => {

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { logined, memType, globalAxios, backLocation} = useContext(GlobalContext);

    const [disabled, setDisabled] = useState(false);

    const [ menuCategoryInsert, setMenuCategoryInsert ] = useState({

        menuCategoryName : "카테고리없음",
        menuCategoryOrder : 0
    });

    const onChange = event => {
        const { name , value } = event.target;
        setMenuCategoryInsert({ ...menuCategoryInsert, [name] : value });
    };

    const categoryInsertResult = result => {
        props.getMenuList(props.shopSeq);
        props.doReRender();
        closeModal();
        alert(result);
    }

    const [shopSeq, setShopSeq] = useState(props.shopSeq);

    const onSubmit = async(event) => {
        setDisabled(true);
        console.log(menuCategoryInsert);
        
        console.log(shopSeq);
        event.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));
        
        globalAxios(`/menu/menucategory/${shopSeq}`, 'post', 
        {
            menuCategoryName:menuCategoryInsert.menuCategoryName,
            //menuCategoryOrder:menuCategoryInsert.menuCategoryOrder
        }, 
        result=>{categoryInsertResult(result)});
        setDisabled(false);
    };




    return (
    <>
    <div id="menuCategoryContainer">
        <Button onClick={openModal}>새 카테고리 추가</Button>

        <Modal open={showModal}>
            <Box sx={style}
                id="menuCategoryBox"
                component="form"
                noValidate
                autoComplete='off'
                onSubmit={onSubmit}
            >
            <div className="modal" id="menuCategoryModal">
            <div className="modal-dialog">
            <div className="modal-content">
        
            <div className="modal-header">
            <button className='modal-close' onClick={closeModal}> X </button>
            <h4 className="modal-title" align='center'>카테고리 추가</h4>            
            </div>      
            <hr></hr>    

            <div className="modal-body form-group" >

            <TextField sx={{ m: 1, width: '25ch' }} variant='standard' 
                    name="menuCategoryName"
                    label="카테고리 이름"
                    value={menuCategoryInsert.menuName}
                    helperText="한글 2~16자 이내 입력"
                    onChange={onChange}
            />
            <br></br>

            <button type='submit' disabled={disabled}>등록하기</button>
            <button type='reset' onClick={closeModal}>취소</button>
            </div>
            </div>
            </div>
        </div>

            </Box>


        </Modal>

    </div>

    </>
    );

}

export default MenuCategoryModal;




