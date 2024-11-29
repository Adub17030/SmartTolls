import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import polyline from "@mapbox/polyline";

const MapView = ({
  showPath,
  showTolls, // This now controls toll details, not visibility
  blueTollCost,
  blueTime,
  redTollCost,
  redTime,
}) => {
  const [bluePath, setBluePath] = useState([]);
  const [redPath, setRedPath] = useState([]);

  const pointA = [-122.3321, 47.6062]; // Seattle, WA
  const pointB = [-122.2, 47.61]; // Blue path endpoint
  const pointC = [-122.2, 47.6008]; // Red path endpoint

  const spanStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background
    color: "white", // White text
    padding: "5px 10px", // Add padding for better spacing
    borderRadius: "5px", // Rounded corners
    fontSize: "14px", // Font size for readability
    fontWeight: "bold", // Bold text for emphasis
    border: "1px solid white", // Optional white border
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // Subtle shadow effect
    textAlign: "center", // Center the text
  };

  const fetchRoute = async (start, end, setPathCallback) => {
    const apiKey = "HERE"; // Replace with your OpenRouteService API key
    const profile = "driving-car"; // Specify the profile for routing
    const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}`;

    const data = {
      coordinates: [start, end],
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Accept:
            "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          "Content-Type": "application/json",
        },
      });

      const encodedGeometry = response.data.routes[0].geometry;
      const decodedPath = polyline.decode(encodedGeometry);
      const leafletPath = decodedPath.map(([lat, lng]) => [lat, lng]);

      setPathCallback(leafletPath);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (showPath) {
      fetchRoute(pointA, pointB, setBluePath);
      fetchRoute(pointA, pointC, setRedPath); 
    }
  }, [showPath]);

  return (
    <MapContainer
      center={[47.6062, -122.28]}
      zoom={11}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Blue path */}
      {showPath && bluePath.length > 0 && (
        <>
          <Polyline positions={bluePath} color="blue">
            <Tooltip permanent direction="top">
              <span style={spanStyle}>
                {showTolls
                  ? `(A) Time: ${blueTime} min, Toll: $${blueTollCost}`
                  : `(A) Time: ${blueTime} min`}
              </span>
            </Tooltip>
          </Polyline>
          <Marker position={pointA}>
            <Popup>Start Point A</Popup>
          </Marker>
          <Marker position={pointB}>
            <Popup>End Point B</Popup>
          </Marker>
        </>
      )}

      {/* Red path */}
      {showPath && redPath.length > 0 && (
        <>
          <Polyline positions={redPath} color="red">
            <Tooltip permanent direction="top">
              <span style={spanStyle}>
                {showTolls
                  ? `(B) Time: ${redTime} min, Toll: $${redTollCost}`
                  : `(B) Time: ${redTime} min`}
              </span>
            </Tooltip>
          </Polyline>
          <Marker position={pointA}>
            <Popup>Start Point A</Popup>
          </Marker>
          <Marker position={pointC}>
            <Popup>End Point C</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default MapView;
