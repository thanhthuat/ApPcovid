import axios from "axios";
import React, { useState ,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { getMapDataByCountryId } from "../../../api/apiConfig";
import { getDetailCountry } from "../../../redux/actions";
import HighMaps from "../../dashboard/HighMaps";
import LoadingFullScreen from "./LoadingFullScreen";

export default function Modal({show ,handleClose,data}) {
  const dispath = useDispatch() ;
  const dataDetailCountry = useSelector((state)=>state.detailCountry.detailCountry) ;
  console.log("🚀 ~ file: Modal.jsx:14 ~ Modal ~ dataDetailCountry", dataDetailCountry)
  const loading = useSelector((state) => state.main?.loadingFullscreen) || false;
  const [mapData,setMapData]= useState({}) ;
 
useEffect(() => {
    // axios.get(`https://restcountries.com/v3.1/name/${data?.Country}`).then((res)=>{
    //     console.log("res",res)
    // })
dispath(getDetailCountry({params:data?.Country},(status,res)=>{

}))
    if(data?.CountryCode){
        getMapDataByCountryId(`${data?.CountryCode?.toLowerCase()}`)
    .then((res) => {
      setMapData(res);
    })
    .catch((err) => console.log({ err }));
    }
    

}, [])

  return (
    <>
    {loading ?<LoadingFullScreen/>:null}
      {show  && (
        <div className="modalcustomer">
          <div onClick={handleClose} className="overlay"></div>
          <div className="modalcustomer-content">
            <div className="content-item">
              <div className="item-map">
              <HighMaps mapData={mapData} />
              </div>
            
            <div className="item-national">
              <h5>Description</h5>
              <ul className="item-national__content">
                <li>Name</li>
                <li>{dataDetailCountry?.name?.common || '-'}</li>
              </ul>

              <ul className="item-national__content">
                <li>Capital</li>
                <li>{dataDetailCountry?.capital ? dataDetailCountry?.capital[0] : '-'}</li>
              </ul>
              <ul className="item-national__content">
                <li>Population</li>
                <li>{dataDetailCountry?.population || '-'}</li>
              </ul>
              <ul className="item-national__content">
                <li>region</li>
                <li>{dataDetailCountry?.region || '-'}</li>
              </ul>
              <ul className="item-national__content">
                <li>
                  <img src={dataDetailCountry?.flags?.png || dataDetailCountry?.flags?.svg} className='flags' alt="flags"/></li>
              </ul>
            </div>

            </div>
             
            <button className="close-modalcustomer" onClick={handleClose}>
            <i className="fas fa-times-circle"></i>
            </button>
           
          </div>
        </div>
      )}
     
    </>
  );
}