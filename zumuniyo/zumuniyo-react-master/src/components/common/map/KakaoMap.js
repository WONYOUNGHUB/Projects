import React,{ useState,useEffect, useContext } from "react";
import $ from 'jquery';
import { GlobalContext } from "components/common/GlobalProvider";
import icon from "components/../images/kakaomap/icon.png"
import "./KakaoMap.css";
import { Button } from "@mui/material";

const KakaoMap = () => {

    const [mapVisibility,setMapVisibility] = useState(false);

    const {globalAxios} = useContext(GlobalContext);

    const openMap = () => {
        
        if(!window.navigator.geolocation){
            alert('지원하지 않는 브라우져입니다');    
            return;
        }

        window.navigator.geolocation.getCurrentPosition(data=>{
            if(data) setMapVisibility(true)
        },error=>{
            alert('위치 권한 요청을 허용하셔야 사용할 수 있습니다');
        })
    }

    const setMap = () => {

        if(mapVisibility){

            const getLocation = () => {

                const { kakao } = window;
                const container = document.getElementById('map');
                const options = {
                    center: new kakao.maps.LatLng(35.23103408483914,129.0822385815375), level: 3
                };
                const map = new kakao.maps.Map(container, options);

                if (window.navigator.geolocation) {
                    window.navigator.geolocation.getCurrentPosition(pos => {
            
                        /* 위도 경도 받기 */
                        const latitude = pos.coords.latitude;
                        const longitude = pos.coords.longitude;
                        const geocoder = new kakao.maps.services.Geocoder();
                        
                        /* 지도 위치 변경 */
                        const location = new kakao.maps.LatLng(latitude, longitude);
                        map.setCenter(location);
                        
                        const setlocationName = (inputlat,inputlon) => {
                            
                            const coord = new kakao.maps.LatLng(inputlat, inputlon);
                            const callback = (result, status) => {
                                if (status === kakao.maps.services.Status.OK) {
                                    $("#locationSearchbox").val(result[0].address.address_name);
                                }
                            };
                            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
                            
                        }
                        
                        const infowindow = new kakao.maps.InfoWindow({zIndex:1});
                        const ps = new kakao.maps.services.Places(map); 

                        const placesSearchCB = (data, status, pagination) => {
                            if (status === kakao.maps.services.Status.OK) {
                                for (let i=0; i<data.length; i++) {
                                    displayMarker(data[i]);    
                                }       
                            }
                        }

                        ps.categorySearch('FD6', placesSearchCB, {
                            //검색조건
                            useMapCenter:true,
                            useMapBounds:true,
                            page:45
                        }); 
            
                        const displayMarker = (place) => {
                                // 마커를 생성하고 지도에 표시
                                const marker = new kakao.maps.Marker({
                                    map: map,
                                    position: new kakao.maps.LatLng(place.y, place.x) 
                            });
                
                            // 마커에 클릭이벤트를 등록
                            kakao.maps.event.addListener(marker, 'click', () => {
                                    // 마커를 클릭하면 장소명이 인포윈도우에 표출
                                    infowindow.setContent('<div style="padding:5px;font-size:20px;">' + place.place_name + '</div>');
                                    infowindow.open(map, marker);
                            });
                        }		
                        
                        /* 위도 경도에 대한 위치명 받기 */
                        setlocationName(latitude,longitude);
                        
                        /* 지도 변경시 동작 */
                        kakao.maps.event.addListener(map, 'dragend', () => {  
                            
                            const latlng = map.getCenter(); 

                            setlocationName(latlng.getLat(),latlng.getLng());
                            
                            const infowindow = new kakao.maps.InfoWindow({zIndex:1});
                            const ps = new kakao.maps.services.Places(map); 
                            ps.categorySearch('FD6', placesSearchCB, {
                                useMapCenter:true,
                                useMapBounds:true,
                                page:45
                            }); 
                            
                        });
            
                        kakao.maps.event.addListener(map, 'zoom_changed', () => {  
                            
                            const latlng = map.getCenter(); 
            
                            setlocationName(latlng.getLat(),latlng.getLng());
                            
                            const infowindow = new kakao.maps.InfoWindow({zIndex:1});
                            const ps = new kakao.maps.services.Places(map); 
                            ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true}); 
                            
                        });
                    
                        
            
                        $("#locationSearchbtn").on("click",()=>{
                            
                            const keyword = $("#locationSearchbox").val();
                            
                            const ps = new kakao.maps.services.Places(); 
            
                            const placesSearchCB = (data, status, pagination) => {
                                if (status === kakao.maps.services.Status.OK) {
                                    
                                    const moveLatLon = new kakao.maps.LatLng(data[0].y, data[0].x);
                                    
                                    map.setCenter(moveLatLon);
                                }
                            }	
                            ps.keywordSearch(keyword, placesSearchCB); 
                        });
                        
                        globalAxios('/main/shopmapdata','get',{},data=>{
                            
                            if ( typeof(data) == "undefined" ) {return;}
                                
                            for(let shopdata of data){
                                
                                    const latval = JSON.stringify(shopdata.LOC_LAT).replaceAll("\"", ""); 
                                    const lonval = JSON.stringify(shopdata.LOC_LON).replaceAll("\"", "");
                                    const nameval = JSON.stringify(shopdata.SHOP_NAME).replaceAll("\"", "");
                                    const shopseqval = JSON.stringify(shopdata.SHOP_SEQ).replaceAll("\"", "");
                        
                                    const imageSrc = icon; // 마커이미지의 주소
                                    const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기
                                    const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션
                                    
                                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
                                    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                                        markerPosition = new kakao.maps.LatLng(latval, lonval); // 마커가 표시될 위치
            
                                    // 마커 생성
                                    const marker = new kakao.maps.Marker({
                                        position: markerPosition, 
                                        image: markerImage, // 마커이미지 설정
                                        zIndex:500
                                    });
                                        
                                        
                                    const content = '<div class="markerbox">' +
                                    '  <a href="/zumuniyo/shop/'+shopseqval+'">' +
                                    '    '+nameval +
                                    '  </a>' +
                                    '</div>';

                                    // 커스텀 오버레이가 표시
                                    const position = new kakao.maps.LatLng(latval, lonval);  
            
                                    // 커스텀 오버레이를 생성
                                    const customOverlay = new kakao.maps.CustomOverlay({
                                        map: map,
                                        position: position,
                                        content: content,
                                        yAnchor: 1 ,
                                        zIndex:900
                                    });
                                    
                                    marker.setMap(map);
                                
                            } 

                        });
                        });
                } else {
                    alert("지원하지않는 브라우져입니다");
                }
            }

            getLocation();

            $("#getMyLocation").on('click',()=>{
                $("#locationSearchbox").val("");
                getLocation();
            })
            
            $("#locationSearchbox").on('keydown',key=> {
                    if( key.keyCode === 13 ){
                        $("#locationSearchbtn").trigger("click");
                    }
            });
        }
        
    }

    useEffect(() => {
        setMap();
    }, [mapVisibility]);


  return (
    <>
        {mapVisibility?
        <>
            <div id= "mapWrapper">
                <div id="locationSearchdiv">
                    <button id="getMyLocation">내위치찾기</button>
                    <input id="locationSearchbox" type="text" placeholder="검색어를 입력하세요"/>
                    <button id="locationSearchbtn"> 검색</button>
                </div>
                <div id='map'/>
            </div>
        </>
        :
        <div id= "mapWrapper">
            <Button id="mapbutton" variant="outlined" onClick={openMap}>주변 매장 지도 검색</Button>
        </div>
        }
    </>
    );
};

export default KakaoMap;