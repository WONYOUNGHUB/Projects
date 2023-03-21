import React,{  useState,useEffect, useContext} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { GlobalContext } from "components/common/GlobalProvider";
import "./LoadingSpinner.css"

const LoadingSpinner = (props)=> {

    const {axiosCounter} = useContext(GlobalContext);

    const [open, setOpen] = useState(false);

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        "&:focus":{ outline: 'none' },
    };

    const counterStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '15em',
      transform: 'translate(-50%, -145%)',
      color:'orange',
      fontWeight:'bold',
      textAlign:'center'

   };

    useEffect(
        () => {
          setOpen(axiosCounter>0);
        }, [axiosCounter]
      );

    return (
      <>
            <Modal open={open} id = "spinnerModal">
                <Box sx={boxStyle}>
                <CircularProgress sx={{circle:{color:'orange'}}}/>
                <p style={counterStyle}>{axiosCounter}</p>
                </Box>
            </Modal>
            {props.children}
            
      </>
    );
  }
  export default LoadingSpinner;