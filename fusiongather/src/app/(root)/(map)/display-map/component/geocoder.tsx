'use client'

import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Map, Popup, useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function Geocoder (props: any) {
    const ctrl = new MapboxGeocoder({
        accessToken:
          "pk.eyJ1IjoidGhhbmdnYTNxM3EzcSIsImEiOiJjbHI4bHlwZm8yZDkzMmp0YWhjZHE3bDR3In0.KfeyM_Nn0qYA7NxqC3PC5A",
          marker: false,
          collapsed: false,
      });
    
      useControl(() => ctrl)
      ctrl.on('result', function(e) {
        console.log(e.result.place_name)
        const coords = e.result.geometry.coordinates;
        props.onSearchLocation(coords);
      });
      return (
        null
      );
}