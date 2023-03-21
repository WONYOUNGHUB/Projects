import React from "react";
import Wrapper from "components/common/Wrapper";
import HeaderJ from "components/common/Header/HeaderJ"
import "./Zumuniyo.css";
import Footer from "components/common/Footer";

const Zumuniyo = ()=> {

  return (
    <>
        <div id="wallpaper">
          <div id="headerWrapper">
            <HeaderJ/>
          </div>
          <Wrapper/>
          <Footer/>
        </div>
    </>
  );
}
export default Zumuniyo;