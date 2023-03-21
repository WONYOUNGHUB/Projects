import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "components/common/GlobalProvider";
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Title from '../pages/Title';
// import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import './ShopTopMenu.css';

export default function ShopMenu({ shopseq }) {


  const { logined, memNick, memType, globalAxios } = useContext(GlobalContext);
  const [menulist, setMenulist] = useState([]);
  const navigate = useNavigate();

  const menuSelect = () => {
    globalAxios(`/menu/menutopview/${shopseq}`, 'get', {}, res => {
      if (res) {
        console.log(res);
        setMenulist(res);
      } else {
        alert("failed to");
      }
    });
  }


  useEffect(menuSelect, []);

  return (
    <React.Fragment>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>메뉴 이름</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>설명</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {menulist.map((menu, index) => (
            <TableRow key={index}>
              <TableCell>{menu.menuName}</TableCell>
              <TableCell>{menu.menuPrice}</TableCell>
              {/* <TableCell>{menu.menuImage}</TableCell> */}
              <TableCell><img src={`/image/${menu.menuImage}`}></img></TableCell>
              <TableCell>{menu.menuSimpleInfo}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment >
  );
}