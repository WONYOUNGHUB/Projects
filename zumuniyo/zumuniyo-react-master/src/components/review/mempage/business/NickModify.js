import React, { useState, useEffect, useContext } from "react";

import { GlobalContext } from "components/common/GlobalProvider";
import { Button, Divider, Input, Box, TextField, Grid, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';
import { maxWidth } from "@mui/system";

export default function NickModify() {

  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);

  const [newNick, setNewNick] = useState(memNick);

  const shopMemInfo = () => {
    globalAxios(`/review/nickchange/${newNick}`, 'post', {}, response => {
      if (response) {
        console.log(response);
        window.location.reload();
      } else {
        alert("failed to ");
      }
    });
  }

  const handleChange = (e) => {
    // console.log(e);
    setNewNick(e.target.value)
    // console.log(newNick);

  }

  useEffect(() => {

  }, [newNick]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E0E0E0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <>    

      <Box
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">



        <Box style={{ margin: "0 auto" }}
          sx={{ 
            // width: "30%" 
            minWidth: 200,
            maxWidth: 300
            }}>
        

            <Grid2 xs={6} lg={3} sx={{ mt: "30%" }} >
              <Item>
                <Box
                  id="category-a"
                  sx={{ fontSize: '12px', textTransform: 'uppercase'}}
                >
                  <h1>닉네임 변경</h1>
                </Box>
                <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                  <h4>  회원분류 : {memType}</h4>
                  <TextField id="outlined-basic" name="nick" label="닉네임" variant="filled"

                    defaultValue={newNick}
                    // onChange={handleChange}  
                    onBlur={handleChange}
                  />
                </Box>
              </Item>
            </Grid2>

            <br />
      
        </Box>

        <Box style={{ margin: "0 auto", textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={shopMemInfo} >수정하기</Button>
        </Box>
      </Box>

    </>
  )
}
