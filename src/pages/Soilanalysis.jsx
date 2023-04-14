import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VzaGF2c2hhcm1hMDEwMyIsImEiOiJjbGdnNG9ncTcwODIzM2VycnFzeXR6amZwIn0.CXYpx8GEO0JRa18exxV4XA";

function Soilanalysis() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [72.8777, 19.0760], // set the initial center to Mumbai
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    // Add geocoder to the map
    map.addControl(geocoder);

    // Listen for the 'result' event from the geocoder
    geocoder.on("result", (event) => {
      const location = event.result.center;
      setLocation({ lat: location[1], lng: location[0] });

      axios
        .get("https://api.ambeedata.com/latest/by-lat-lng", {
          headers: {
            "x-api-key":
              "2097460c51aa72fd6a1533987c4fe003bca083e68980bdb1c724aaa2b37b7222",
          },
          params: {
            lat: location[1],
            lng: location[0],
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", paddingTop: "120px", margin: "0 auto", maxWidth: "90vw" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75%", height: "70vh", borderRight: "1px solid #ccc", padding: "10px" }}>
          <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </div>
    <div style={{ marginLeft: "2rem" }}>
      <h3>Selected Location:</h3><br/>
      <p><b>Latitude:</b> {location?.lat}</p>
      <p><b>Longitude:</b> {location?.lng}</p><br/>
      <hr />
      <h3>Air Quality Data:</h3><br/>
      <p>
        <b>NO<sub>2</sub>:</b> {data?.stations?.[0]?.NO2?.toFixed(2)} µg/m<sup>3</sup>
      </p>
      <p>
        <b>CO:</b> {data?.stations?.[0]?.CO?.toFixed(2)} mg/m<sup>3</sup>
      </p>
      <p>
        <b>Current Ozone:</b> {data?.stations?.[0]?.OZONE?.toFixed(2)} µg/m<sup>3</sup>
      </p>
      <p>
        <b>Current SO<sub>2</sub>:</b> {data?.stations?.[0]?.SO2?.toFixed(2)} µg/m
        <sup>3</sup>
      </p>
      <p>
        <b>Current AQI:</b> {data?.stations?.[0]?.AQI?.toFixed(2)}
      </p>
    </div>
  </div>
</div>

    );
  }
  
  export default Soilanalysis;