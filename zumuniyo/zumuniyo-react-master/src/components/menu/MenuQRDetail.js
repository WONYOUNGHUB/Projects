import React,{useContext,useEffect, useState, useRef} from 'react';
import {GlobalContext} from "components/common/GlobalProvider";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardActionArea, List, ListItem, ListItemText, TableBody, TableCell, TableRow, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import "./MenuQRDetail.css";




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

const style = {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    height:'35em',
    width: '24em',
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 18,
    p: 1,
  
    borderRadius: 2,
    
  };




const MenuQRDetail = (props) => {

  const [menuData,setMenuData] = useState('');
  const [menuDetail,setMenuDetail] = useState('');
  
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState('Controlled');

  const onChange = (event) => {
    setValue(event.target.value);
  };
  
  useEffect(() => {
    setMenuData(props.menuData);
  },[props.menuData]);


    return (
    
      <>
      {menuData?<>
      
      
      <div id="menuDetailQRContainer">
        
        <Modal open={props.detailQRModalOpen} >
          
            <div className="modal" id="detailModal">
            
            <Card sx={style} id="menuDetailCard">
            <CardHeader
              avatar={ 
                menuData.menuTop?  
                <div><StarIcon sx={{ color: yellow[500] }} aria-label="recommended" /></div> : <div></div>
              }
              className="modal-title" align='center' 
              action={
                <div>
              <IconButton edge="end" aria-label="modal-close" onClick={props.handleModalClose} >
                <ClearIcon />
              </IconButton>
              </div>
              }
              title={
                <Typography gutterBottom variant="h5" component="div" >
                  {menuData.menuName}
                </Typography>
                }
              subheader={
                <Typography variant="body2" color="text.secondary" >
                  {menuData.menuCategory.menuCategoryName}
                </Typography>
                }
            />
            <div id="menuDetailQRWrapper">
            <CardMedia
              component="img"
              height="194"
              image={"/image/"+menuData.menuImage}
              alt="detail-image"
            />
            <CardContent>
              
              <Typography variant="subtitle2" color="text.secondary">메뉴소개</Typography>
                <div>
                {/* <TextField
                  id="menuDetailInfo-textField"  
                  multiline
                  fullWidth 
                  maxRows={1}
                  value={menuData.menuSimpleInfo}
                  onChange={onChange}
                /> */}

                <Typography variant="body1" color="text.primary" >
                  <span id="menuSimpleInfoSpace" >{menuData.menuSimpleInfo}</span>
                </Typography>


                </div>
              <br></br>
              <Typography variant="h6" color="text.primary" align='right'>
                
                <div>
                  {menuData.menuPrice} 원
                </div>
                
              </Typography>  
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                
                <Typography variant="body2" color="text.secondary">메뉴상세</Typography>
                <div>
                <TextField
                  id="menuDetailInfo-textField"
                  
                  multiline
                  fullWidth 
                  rows={4}
                  value={menuData.menuDetailInfo}
                  onChange={onChange}
                  
                />
                </div>

              </CardContent>
            </Collapse>
            

            </div>
            
            
           <div id="modalBottomWrapper">
          
              
              <Button variant="contained" onClick={props.handleModalClose}>닫기</Button>
             
            </div>

            </Card>
            
            <br></br>
            

            </div>
          {/* </Box> */}
          
        </Modal>
      </div>

      </>:""}
      </>
      
    );




    
}

export default MenuQRDetail;

