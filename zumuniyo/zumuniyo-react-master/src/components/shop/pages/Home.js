import React from 'react'
import { useParams } from 'react-router-dom';
import Header2 from '../components/ShopHeader.js';
// import Button from '@mui/material/Button';
// import Mylike from '../components/Mylike.js';
import ShopHome from '../components/ShopHome';

export default function Home(props) {

  const params = useParams();

  return (
    <div>

      {/* <Button variant="contained" color="success" href="/Shop">
        매장 관리
      </Button> */}
      <h1 align="center"><ShopHome shopSeq={params.shopSeq} /></h1>

      {/* <Mylike /> */}

      <Header2 shopSeq={params.shopSeq} />
    </div>
  )
}
