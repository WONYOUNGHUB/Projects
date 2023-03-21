import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';

export default function Category({ handleChange2, categoryOriginal }) {
  const [category, setCategory] = React.useState('기타');

  const handleChange = (e) => {
    setCategory(e.target.value);
    handleChange2(e.target.value);
  };

  useEffect(() => {

    if (categoryOriginal) setCategory(categoryOriginal);
  }, []);

  return (

    <>
      <>
        < Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="CategoryLabel">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="CategorySelect"
              value={category}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem name='shopCategory' value='프랜차이즈'>프랜차이즈</MenuItem>
              <MenuItem name='shopCategory' value='치킨'>치킨</MenuItem>
              <MenuItem name='shopCategory' value='양식'>양식</MenuItem>
              <MenuItem name='shopCategory' value='피자'>피자</MenuItem>
              <MenuItem name='shopCategory' value='중국집'>중국집</MenuItem>
              <MenuItem name='shopCategory' value='한식' >한식</MenuItem>
              <MenuItem name='shopCategory' value='일식'>일식</MenuItem>
              <MenuItem name='shopCategory' value='돈까쓰'>돈까쓰</MenuItem>
              <MenuItem name='shopCategory' value='족발'>족발</MenuItem>
              <MenuItem name='shopCategory' value='보쌈'>보쌈</MenuItem>
              <MenuItem name='shopCategory' value='분식'>분식</MenuItem>
              <MenuItem name='shopCategory' value='카페디저트'>카페디저트</MenuItem>
              <MenuItem name='shopCategory' value='기타'>기타</MenuItem>

            </Select>
          </FormControl>
        </Box>
      </>
    </>
  );
}
