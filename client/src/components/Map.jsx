import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYW1tYWQtZXNhbSIsImEiOiJjbDBxaGF2NmUyNXhvM2JwdzNna21uaGdsIn0.TMOSvAJwB_yOd1PhcSENMw";

const Map = ({ width, height }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState(14);

  const handleMarkerDarg = (marker) => {
    const lngLat = marker.getLngLat();
    setLng(lngLat.lng);
    setLat(lngLat.lat);
    console.log(center, lngLat);
  };

  const error = () => {
    console.log("error");
  };

  useEffect(() => {
    if (map.current) {
      return;
    } // initialize map only once

    const success = (position) => {
      setCenter([position.coords.longitude, position.coords.latitude]);
      // map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [position.coords.longitude, position.coords.latitude],
        zoom: zoom,
      });

      // marker
      const marker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true,
      })
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map.current);

      marker.on("dragend", () => handleMarkerDarg(marker));

      // controls
      map.current.addControl(new mapboxgl.NavigationControl());
    };

    //get current position and init the map
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width, height }}
      />
    </div>
  );
};

export default Map;
