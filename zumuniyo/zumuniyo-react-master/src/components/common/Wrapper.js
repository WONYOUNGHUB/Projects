import React from "react";
import BodyHome from "components/common/BodyHome";
import TestPage from 'components/common/TestPage';
import NotFound from "components/common/NotFound";
import { Route, Routes,Navigate } from "react-router-dom";
import "./Wrapper.css";

const Wrapper = ()=> {

  return (
    <>
        <div id="wrapper">
            <Routes>
                <Route path="/" element={<Navigate to="/zumuniyo"/>} />
                <Route path="/zumuniyo/*" element={<BodyHome/>} />
                <Route path="/test/*" element={<TestPage/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    </>
  );
}
export default Wrapper;