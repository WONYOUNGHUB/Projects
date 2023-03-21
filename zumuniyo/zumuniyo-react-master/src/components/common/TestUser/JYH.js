
import React from "react";

import Menu from "components/menu/Menu";
import MenuQR from "components/menu/MenuQR";
import MenuListQR from "components/menu/MenuListQR";

import { Route, Routes,Link } from "react-router-dom";

import AuthChecker from "components/common/auth/AuthChecker";




const JYH = ()=> {
    return (
      <>
      <div>
      
          <Link to="/"><button>홈으로</button></Link>
          <Link to="menu"><button>메뉴</button></Link>
          <Link to="menuQR/4883/1"><button>QR메뉴 - 4883</button></Link>
          <Link to="menuQRnew/4882/1"><button>QR메뉴collaps형태 - 4882</button></Link>
          <Link to="menuQRnew/664/1"><button> *****벚꽃식당***** </button></Link>
          <Link to="menu/4882"><button>메뉴4882</button></Link>
          <Link to="menu/4883"><button>메뉴4883</button></Link>
            <hr/>
          
            <Routes>
              <Route path="/" element={<><h1>정영훈 테스트 페이지</h1></>} />
              <Route path="/menu/*" element={<Menu/>} />
              {/* <Route path="/menuQR/:shopSeq/:tableNum" element={<AuthChecker><MenuQR /></AuthChecker>} /> */}
              <Route path="/menuQRnew/:shopSeq/:tableNum" element={<AuthChecker><MenuListQR /></AuthChecker>} />
              <Route path="*" element={<><h1>주소값 이상</h1></>} />
            </Routes>
          </div>
      </>

    );
  }


  export default JYH;