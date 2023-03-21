import React,{  useState,useEffect,useContext } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';  
import "./Register.css";
import { GlobalContext } from "components/common/GlobalProvider";

const Register = (props)=> {

    const navigate = useNavigate();
    const location = useLocation();

    const {globalAxios,backLocation} = useContext(GlobalContext);

    const [member,setMember] = useState({
        memNick : '',
        memEmail : location.state!==null?location.state.memEmail:"",
        memType : '일반회원',
        socialType : location.state!==null?location.state.socialType:""
    });

    const onChange = e => {
        const { name , value } = e.target;
        setMember({...member, [name] : value });
    }

    const emailCheck = () => {
        if(member.memEmail ==='') navigate(backLocation);
    }

    const registerResult = result => {
        alert(result);
        if(result==='가입성공') navigate(backLocation);
    }

    const onSubmit = e => {
        e.preventDefault();
        globalAxios('/member/'+member.socialType+'/','post',member,result=>{registerResult(result)});
    }

    useEffect(
        () => {
            emailCheck();
        }, [emailCheck]
      );

return (

    <div id="registerWrapper">
        <div id="register">

            <Box
                id="registerbox"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            >

            <h2 id="registertitle">{member.socialType==='naver'?'네이버':'카카오'} 계정으로 가입</h2>
            
            <hr className="registerhr"/>

                <TextField  name="memNick" 
                            label="닉네임" 
                            variant="standard" 
                            helperText="한글 2~8 자" 
                            fullWidth 
                            onChange={onChange} 
                            sx={{input:{color: 'rgb(71, 30, 30)'},
                                '& label.Mui-focused': {color: 'rgb(71, 30, 30)',fontWeight: 'bold'},
                                '& .MuiInput-underline:after': {borderBottomColor: 'rgb(71, 30, 30)'},
                                }}
                            />
                            
            <hr className="registerhr"/>
                <FormControl>
                    <FormLabel sx={{color: 'rgb(71, 30, 30)','&.Mui-focused': {color: 'rgb(71, 30, 30)',fontWeight: 'bold'}}}>회원분류</FormLabel>
                        <RadioGroup
                            row
                            defaultValue="일반회원"
                            name="memType" 
                            onChange={onChange}
                            sx={{color: 'rgb(71, 30, 30)'}}
                        >
                        <FormControlLabel value="일반회원" control={<Radio sx={{color: 'rgb(71, 30, 30)','&.Mui-checked': {color: 'rgb(71, 30, 30)',}}}/>} label="일반회원"  />
                        <FormControlLabel value="사업자회원" control={<Radio sx={{color: 'rgb(71, 30, 30)','&.Mui-checked': {color: 'rgb(71, 30, 30)',}}}/>} label="사업자회원" />
                    </RadioGroup>
                </FormControl>
            <hr className="registerhr"/>
                <Button id="registerbtn" type="submit" variant="outlined" size="medium">
                    가입하기
                </Button>

            </Box>

        </div>
    </div>
);
}
export default Register;

