import React, {useContext,useEffect, useState} from 'react';
import {GlobalContext} from "components/common/GlobalProvider";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, IconButton, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';




const MenuCategory = (props) => {

    const {logined,globalAxios,beforeLocation,currentLocation} = useContext(GlobalContext);

    const [categoryData, setCategoryData] = useState('');

    const [shopSeq, setShopSeq] = useState(props.shopSeq);

    const [open, setOpen] = useState(true);

    const [reRender,setReRender]=useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    

    const getParentMenuListByMenuCategory = cno => {

      props.getMenuListByMenuCategory(cno);
    }

    const whoami = entrie => {
      alert(entrie.menuCategorySeq);
    }

    const categoryResult = result =>{

      if(result==='성공'){
        setReRender(reRender+1);
        props.doReRender();
      }else{
        alert(result);
      }

    }

    const deleteResult = (result) => {
      
      if(result==="카테고리를 삭제했습니다."){
        props.doReRender();

        alert(result);
      }else{
        alert(result);
      }

    }



    const categoryDeleteClick = entrie => {

      globalAxios('/menu/menuCategoryDelete', 'put', {menuCategorySeq:entrie.menuCategorySeq} , result=>{deleteResult(result)} );
    }


    const categoryOrderUp = entrie => {

      globalAxios('/menu/menuCategoryUp', 'put', {menuCategorySeq:entrie.menuCategorySeq}, data=>{categoryResult(data)} );
    };

    const categoryOrderDown = entrie => {

      globalAxios('/menu/menuCategoryDown', 'put', {menuCategorySeq:entrie.menuCategorySeq}, data=>{categoryResult(data)} );
    };

  


    const getMenuCategoryList = shopSeq => {

        globalAxios('/menu/menucategory/'+shopSeq, 'get', {}, data=>{setCategoryData(data)});
    };

    



    useEffect (
        () => {
            const addrParts = location.pathname.split("/");
            if(addrParts.length<4||addrParts.length[3]==="") navigate(beforeLocation);
            setShopSeq(addrParts[3]);

            if(addrParts[3]!==''){
                getMenuCategoryList(addrParts[3]);
                
            }

        }, [location.pathname,reRender,props.reRender]
        
    );

    useEffect (
      () => {

      }
      
  );
    


    return (
        <>
        

    <div>
      

      <List
        sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            등록된 카테고리
          </ListSubheader>
        }
      >
     {Object.values(categoryData).map((entrie) => (
        <ListItem disablePadding 
          key={entrie.menuCategorySeq}
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="category-up" onClick={() => {categoryOrderUp(entrie)}} >
                <KeyboardArrowUp />
              </IconButton>
              <IconButton edge="end" aria-label="category-down" onClick={() => {categoryOrderDown(entrie)}} >
                <KeyboardArrowDown />
              </IconButton>
              <IconButton edge="end" aria-label="category-delete" onClick={() => {categoryDeleteClick(entrie)}} >
                <ClearIcon />
              </IconButton>
            </>
          }
          >

          
      
        <ListItemButton onClick= {() => {getParentMenuListByMenuCategory(entrie.menuCategorySeq);}}  >
        <ListItemIcon><ListItemText primary={entrie.menuCategoryOrder}/></ListItemIcon>
        
        <ListItemText primary={entrie.menuCategoryName} />
        
        </ListItemButton>              
        
        </ListItem>
    
    ))}
        
    
      </List>
     
    </div>

      </>
    );
}

export default MenuCategory;

        