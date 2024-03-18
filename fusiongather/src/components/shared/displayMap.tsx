"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { Ref, useEffect, useRef } from "react";
import { useState } from "react";

export default function DisplayMap(props: any) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const markerArray = useRef<google.maps.Marker[]>([]);
  console.log(props.currentCoords);
  const [viewport, setViewport] = useState({
    lat: props.currentCoords[1] == 0 ? 14.3154241771087 : props.currentCoords[1],
    lng: props.currentCoords[0] == 0 ? 108.339537475899 : props.currentCoords[0],
    zoom: props.currentCoords[0] == 0 ? 4 : 17,
  });

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "quarterly",
        id: "NEXTJS_MAP_ID",
        libraries: ["places"],
      });
      const { Map } = await loader.importLibrary("maps");
      // Create Map options
      const options: google.maps.MapOptions = {
        center: { lat: viewport.lat, lng: viewport.lng },
        zoom: viewport.zoom,
        disableDefaultUI: true,
        draggable: props.status === "INFO" ? false : true,
        mapId: "NEXTJS_MAP_ID",
      };
      // Create map
      const map = new Map(mapRef.current as HTMLDivElement, options);

      if (props.status !== "INFO") {
        // Create search box
        const input = document.createElement("input");
        input.setAttribute("placeholder", "Search for location");
        input.style.marginTop = "5px";
        input.style.padding = "5px";
        input.style.width = "300px";
        input.style.borderRadius = "5px";
        // Add search box to the map
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places == null) {
            return;
          }
          if (places.length == 0) {
            return;
          }
          const place = places[0];
          if (
            place.geometry == undefined ||
            place.geometry.location == undefined
          ) {
            return;
          }
          //clear old markers
          markerArray.current.forEach((marker) => {
            marker.setMap(null);
          });
          markerArray.current = [];

          // Search location and focus on it
          onSearchLocation({
            coords: [
              place.geometry?.location.lng(),
              place.geometry?.location.lat(),
            ],
            location: place.formatted_address,
          });
          map.fitBounds(place.geometry.viewport as google.maps.LatLngBounds);

          // Create a marker for searched location
          const newMarker = createMarker(
            map,
            place.geometry.location as google.maps.LatLng
          );
          markerArray.current.push(newMarker);
          markerArray.current[0].addListener("dragend", () => {
            // Fixed code
            const position =
              markerArray.current[0].getPosition() as google.maps.LatLng;
            onDragMarker(position);
            console.log(position.lat(), position.lng());
          });
        });
        // Create a marker for current location
        if (props.currentCoords[0] !== 0 && props.currentCoords[1] !== 0) {
          const currentLocation = new google.maps.LatLng(
            props.currentCoords[1],
            props.currentCoords[0]
          );
          const currentMarker = createMarker(map, currentLocation);
          markerArray.current.push(currentMarker);
          currentMarker.addListener("dragend", () => {
            // Fixed code
            const position = currentMarker.getPosition() as google.maps.LatLng;
            onDragMarker(position);
            console.log(position.lat(), position.lng());
          });
        }
      }
      else {
        if (props.currentCoords[0] !== 0 && props.currentCoords[1] !== 0) {
          const currentLocation = new google.maps.LatLng(
            props.currentCoords[1],
            props.currentCoords[0]
          );
          const currentMarker = createMarker(map, currentLocation);
          currentMarker.setDraggable(false);
          markerArray.current.push(currentMarker);
        }
      }
    };
    initMap();
  }, []);

  function onSearchLocation(result: any) {
    console.log(result.coords);
    console.log(result.location);
    props.setLocation(result.location, result.coords[0], result.coords[1]);
  }

  function onDragMarker(position: google.maps.LatLng) {
    props.setLocation("", position.lng(), position.lat());
  }

  function createMarker(map: google.maps.Map, position: google.maps.LatLng) {
    const marker = new google.maps.Marker({
      position,
      map,
      draggable: true,
    });
    return marker;
  }

  return (
    <div
      className="flex justify-center items-center h-[50vh]"
      ref={mapRef}
    ></div>
  );
}
