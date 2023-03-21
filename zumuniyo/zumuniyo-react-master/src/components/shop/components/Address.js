import React from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';

import $ from 'jquery';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Address({ handleChange3, locAddr, shopAddrDetailParam }) {
  console.log(shopAddrDetailParam);
  const { daum } = window;
  const { kakao } = window;
  const [location, setLocation] = useState({ locAddr: locAddr });
  const [shopAddrDetail, setShopAddrDetail] = useState(shopAddrDetailParam);
  const findAddr = () => {
    new daum.Postcode({
      oncomplete: data => {
        const geocoder = new daum.maps.services.Geocoder();
        const address = data.roadAddress || data.autoRoadAddress;
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {

            setLocation({ ...location, locAddr: address, locLat: result[0].y, locLon: result[0].x });

          };
        });
      }
    }).open();
  };


  useEffect(() => {
    handleChange3(location, shopAddrDetail);
  }, [location, shopAddrDetail]);


  return (
    <Box>
      <div>
        <Input id="addr" name="location" type="text" value={location.locAddr || " "} readOnly />
        <Button variant="outlined" id="findaddr" onClick={findAddr || " "} >주소검색</Button>
        <Input id="latitude" name="loc_lat" value={location.locLat || 0} type="hidden" readOnly />
        <Input id="longitude" name="loc_lon" value={location.locLon || 0} type="hidden" readOnly />

      </div>

      <div style={{ marginTop: "16.5px" }}>
        <TextField
          autoComplete="shopDetailAddress"
          name="shopAddrDetail"
          required
          fullWidth
          id="shopDetailAddress"
          label="상세주소"
          value={shopAddrDetail}
          autoFocus
          onChange={(e) => setShopAddrDetail(e.target.value)} >

        </TextField>
      </div>
    </Box>
  )
}
