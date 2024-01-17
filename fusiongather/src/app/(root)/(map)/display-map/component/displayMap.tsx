'use client'

import React, { Ref, useEffect, useRef } from 'react';
import { useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Map, Popup, NavigationControl, GeolocateControl, MapRef } from "react-map-gl";
import Geocoder from './geocoder';

export default function DisplayMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhhbmdnYTNxM3EzcSIsImEiOiJjbHI4bHlwZm8yZDkzMmp0YWhjZHE3bDR3In0.KfeyM_Nn0qYA7NxqC3PC5A';
  const [viewport, setViewport] = useState({
    latitude: 14.3154241771087,//0,
    longitude: 108.339537475899, //0,
    zoom: 4
  });

  function onSearchLocation(location: any) {
    console.log(location)
    setViewport({
      latitude: location[1],
      longitude: location[0],
      zoom: viewport.zoom
    })
  }

  function onDragMarker(event: any) {
    setViewport({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
      zoom: viewport.zoom
    })
    console.log(viewport)
  }

  const mapRef: Ref<MapRef> = useRef({} as MapRef);

  useEffect(() => {
    // if ((viewport.latitude = 0 ) && (viewport.latitude = 0)) {
    //   fetch('https://api.ipify.org/?format=json')
    //     .then((res) => {
    //       return res.json()
    //     })
    //     .then((data) => {
    //       fetch(`https://ipapi.co/${data.ip}/json/`)
    //         .then((res) => {
    //           return res.json()
    //         })
    //         .then((data) => {
    //           mapRef.current.setCenter([data.longitude, data.latitude])
    //           setViewport({
    //             latitude: data.latitude,
    //             longitude: data.longitude,
    //             zoom: 16
    //           })
    //         })
    //     })     
    // }
  }, []);  
  

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <Map
        ref={mapRef}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/standard"
        mapboxAccessToken={mapboxgl.accessToken}
      
      >
        <Marker longitude={viewport.longitude} 
                latitude={viewport.latitude}
                draggable={true}
                onDragEnd={onDragMarker}
                >         
        </Marker>
        <NavigationControl position='bottom-right' />
        <GeolocateControl 
          position='top-left'
          trackUserLocation={true}
          onGeolocate={(event) => {
            setViewport({
              longitude: event.coords.longitude,
              latitude: event.coords.latitude,
              zoom: viewport.zoom
            });
          }}
        />
        <Geocoder onSearchLocation={onSearchLocation} />
      </Map>
    </div>
  );
}

