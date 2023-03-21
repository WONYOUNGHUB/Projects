import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// function preventDefault(event) {
//   event.preventDefault();
// }




export default function Orders() {


  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);
  const [shoplist, setShoplist] = useState([]);
  const navigate = useNavigate();

  const shopSelect = () => {
    globalAxios('/shop/shopListByMem', 'get', {}, res => {
      if (res) {
        console.log(res);
        setShoplist(res);
      } else {
        alert("failed to");
      }
    });
  }

  const shopdelete = (e) => {
    console.log("매장비활성화 요청");




    globalAxios(`/shop/shopdelete/${e.target.value}`, 'put', {}, res => {
      if (res === '성공') {
        console.log(res);
        alert("삭제에 성공했습니다.");
        shopSelect();

      } else {
        alert("failed to");
      }
    });
  }





  useEffect(shopSelect, []);

  useEffect(() => { }, [shopSelect]);


  return (
    <React.Fragment>
      <Title>매장 목록</Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>매장명</TableCell>
            <TableCell>매장주소</TableCell>
            <TableCell>상세주소</TableCell>
            <TableCell>매장상태</TableCell>
            <TableCell align="right">매장 수정</TableCell>
            {/* <TableCell>Ship To</TableCell> */}
            {/* <TableCell>Payment Method</TableCell> */}
            <TableCell align="right">매장 삭제</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {shoplist.map((shop, index) => (
            <TableRow key={index}>
              <TableCell>{shop.shopName}</TableCell>
              <TableCell>{shop.location ? shop.location.locAddr : ""}</TableCell>
              <TableCell>{shop.shopAddrDetail}</TableCell>
              <TableCell>{shop.shopStatus}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell> */}
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              <TableCell align="right">
                <Button color="primary" onClick={() => { navigate(`/zumuniyo/shopupdate/${shop.shopSeq}`) }} >
                  매장 수정
                </Button>
                {/* <Link to={`/LJW/shopupdate/${shop.shopSeq}`} state={{ shop: shop }} >수정</Link> */}

              </TableCell>

              <TableCell align="right">
                <Button value={shop.shopSeq} onClick={shopdelete}>매장 삭제</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" onClick={() => { navigate("/zumuniyo/shopinsert") }} sx={{ mt: 3 }}>
        {/* <Link to={`/LJW/shopinsert`} sx={{ mt: 3 }}> */}

        매장 추가
      </Button>
    </React.Fragment >
  );
}