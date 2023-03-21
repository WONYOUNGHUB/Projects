// import * as React from 'react';
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Box, Container, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

// const fabStyle = {
//   position: 'absolute',
//   bottom: 16,
//   right: 16,
// };

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function AdminFloatingAction() {
  const { globalAxios } = useContext(GlobalContext);

  const [review, setReview] = useState([]);
  const [reviewc, setReviewc] = useState([]);

  const [members, setMembers] = useState([]);
  const [shops, setShops] = useState([]);





  const reviewList = () => {
    globalAxios('/review/reviewList', 'get', {}, response => {
      if (response) {
        setReview(response);
      } else {
        alert("failed to ");
      }
    });
  }

  const reviewCList = () => {
    globalAxios('/review/reviewDayCount', 'get', {}, response => {
      if (response) {
        setReviewc(response);
      } else {
        alert("failed to ");
      }
    });
  }
  const memList = () => {
    globalAxios('/review/memList', 'post', {}, res => {
      if (res) {
        console.log(res);
        setMembers(res);
      } else {
        alert("failed to ");
      }
    });
  }


  const shopList = () => {
    globalAxios('/review/shopList', 'post', {}, res => {
      if (res) {
        console.log(res);
        setShops(res);
      } else {
        alert("failed to ");
      }
    });
  }
  
  
  const 사업자회원 = members.filter(item => item.memType === '사업자회원');
  const 일반회원 = members.filter(item => item.memType === '일반회원');
  const 전체회원 = members.filter(item => item.memType != '관리자');
  
  const 영업 = shops.filter(item => item.shopStatus === '활성');
  const 폐업 = shops.filter(item => item.shopStatus === '비활성');  
  
  const dataAll = [{ name: '전체회원', uv: 전체회원.length },{ name: '전체매장', uv: shops.length },{ name: '리뷰', uv: review.length }]
  const dataMember = [{ name: '전체회원', uv: 전체회원.length }, { name: '사업자회원', uv: 사업자회원.length }, { name: '일반회원', uv: 일반회원.length}];
  const dataShop = [{ name: '전체매장', uv: shops.length }, { name: '영업중', uv: 영업.length }, { name: '폐업', uv: 폐업.length}];  

  useEffect(memList, []);
  useEffect(shopList, []);
  useEffect(reviewList, []);
  useEffect(reviewCList, []);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box style={{ margin: "0 auto" }}
      sx={{
        bgcolor: 'background.paper',
        width: "80%",
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="회원" {...a11yProps(1)} />
          <Tab label="매장" {...a11yProps(2)} />
          <Tab label="리뷰" {...a11yProps(3)} />
        </Tabs>
      </AppBar>


      <SwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={value} index={0} dir={theme.direction}>
        <Box sx={{ width: "100%" }} style={{ margin: "0 auto" }}>
        <Grid>
            <BarChart width={750} height={400} data={dataAll}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          
          <Box sx={{ width: "100%" }} style={{ margin: "0 auto" }}>
          <Grid>
            <BarChart width={750} height={400} data={dataMember}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
        <Box sx={{ width: "100%" }} style={{ margin: "0 auto" }}>
          <Grid>
            <BarChart width={750} height={400} data={dataShop}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>            
          </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
        <Box sx={{ width: "100%" }} style={{ margin: "0 auto" }}>
          <Grid>
            <BarChart width={750} height={400} data={reviewc}>
              <XAxis dataKey="REVIEW_REGDATE" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="CNT" fill="#8884d8" barSize={30} />
            </BarChart>
          </Grid>
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
