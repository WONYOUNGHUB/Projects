import React,{  useState,createContext,useEffect } from "react";
import axios from 'axios'
import {useLocation} from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = (props)=> {

    const [logined,setLogined] = useState(false);
    const [memNick,setMemNick] = useState('');
    const [memType,setMemType] = useState('');
    const [backLocation,setBackLocation] = useState('/');
    const [beforeLocation,setBeforeLocation] = useState('/');
    const [currentLocation,setCurrentLocation] = useState('/');
    const [axiosCounter,setAxiosCounter] = useState(0);
    const plusAxiosCounter = () => setAxiosCounter(c=>c+1);
    const minusAxiosCounter = () => setAxiosCounter(c=>c-1);
    const location = useLocation();
    const path =location.pathname;
      //
    const globalAxios =   (url, method, params, callback, contentType='application/x-www-form-urlencoded') =>  {
      
      const data = new URLSearchParams();

      for(let key in params){
        data.append(key,params[key]);
      };

      plusAxiosCounter();
      
      axios(
        {
          url: url,
          method: method,
          data:(contentType==='multipart/form-data')?params:data,
          params:(contentType==='multipart/form-data')?null:(
            method==='get'||method==='delete'||method==='put'||
            method==='GET'||method==='DELETE'||method==='PUT'
            ?data:null),
          headers:{
              'Content-Type': contentType // 필요시 'multipart/form-data'
          }
        }
      ).then( response => {
       
          minusAxiosCounter();
          callback(response.data);
      }).catch(error=>{
        console.log(error);
      });

    } ;

    useEffect(
      () => {
        if(currentLocation!==beforeLocation){
          setBeforeLocation(currentLocation);
        }
        setCurrentLocation(path);
      }, [path]
    );

    return (
      <>
        {/*<p>{backLocation}</p>*/}
        {/*<p>{beforeLocation}</p>*/}
        {/*<p>{currentLocation}</p>*/}
        <GlobalContext.Provider value={{logined,setLogined,
                                        memNick,setMemNick,
                                        memType,setMemType,
                                        currentLocation,
                                        beforeLocation,
                                        backLocation,setBackLocation,
                                        axiosCounter,
                                        globalAxios}}>
            {props.children}
        </GlobalContext.Provider>
      </>
    );
  }
  export {GlobalProvider,GlobalContext};