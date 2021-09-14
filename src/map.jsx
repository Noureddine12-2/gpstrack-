import {useState,useEffect} from 'react'
import ReactMapGL,{Marker} from "react-map-gl"
import './map.css'
import axios from "axios"


function Map() {


  const [pins, setPins] = useState([]);

  
    
    const [viewPort,setViewPort]=useState({
        width: "100vw",
        height: "100vh",
        latitude: 35.203049,
        longitude: -0.650135,
        zoom: 8
    })



    useEffect(() => {
        const getPins = async () => {
          try {
            const allPins = await axios.get("/pin");
            setPins(allPins.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
      }, []);

     
    return (
        <div className="mapcontainer">
            <div>
                <button className="start" >START TRACKING</button>
            </div>
            <ReactMapGL {...viewPort}
             mapboxApiAccessToken="pk.eyJ1Ijoibm91cmVkZGluZTEzMDIiLCJhIjoiY2t0OHdrbnluMTZjazJ1bGFwdHNtOHBhZCJ9.eqCpTzCh2dOEWxBdG_BUnA"
            
             mapStyle='mapbox://styles/mapbox/streets-v9'>



    {pins.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offsetLeft={-3.5 * viewPort.zoom}
              offsetTop={-7 * viewPort.zoom}
            >
                </Marker>
                </>))}
             </ReactMapGL>
             
            
            



        </div>
    );    
}

export default Map
