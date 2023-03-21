
import Slider from "react-slick";
import React,{ Component, useContext,useEffect,useState} from "react";
import {GlobalContext} from "components/common/GlobalProvider";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const SimpleSlider = ()=> {
 

    const {globalAxios} = useContext(GlobalContext);
    const [Adlist,setAdlist] = useState([]);
    const getAdList = () => {
      globalAxios("/advertisement/adlist","get",{},data=>{
        console.log(data);
        setAdlist(data);
      });
    }
    useEffect(() => {

      getAdList();
  
    }, []); 
    const imgURL =[]
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows : true,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          
          
          {Adlist.map((ad,index)=>(
            
            <img key={index} src={`/image/${ad.image}`}/>
          
          ))}
        
          
          
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
 
}
export default SimpleSlider;