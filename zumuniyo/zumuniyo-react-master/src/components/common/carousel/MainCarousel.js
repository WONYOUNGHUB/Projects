import React from "react";
import "./MainCarousel.css";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import sample1 from 'images/sliderCarousel/sample1.jpg'
import sample2 from 'images/sliderCarousel/sample2.jpg'
import sample3 from 'images/sliderCarousel/sample3.jpg'

const MainCarousel = () => {

    var items=[
        <img src={sample1} className="cimg"/>,
        <img src={sample2} className="cimg"/>,
        <img src={sample3} className="cimg"/>
        ];
  return (
    <>
         <Carousel animation="slide" id="MainCarousel"
                    duration="500"
         >
            {
                items.map( item => 
                    <div key={item} className="cbox">
                        {
                            item
                        }
                    </div>)
            }
        </Carousel>
    </>
    );
};

export default MainCarousel;
