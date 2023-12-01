

import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

export default function Map() {
    const mapStyles = {
        height: "400px",
        width: "100%",
    };

    // Define the type for userLocation
    const initialUserLocation = { lat: 0, lng: 0 };
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(initialUserLocation);

    useEffect(() => {
        // Use the Geolocation API to get the user's current location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    return (
        <div>
            
            <div style={mapStyles}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyDpq2dnOVnsEeUdBPvQufmvDNF6Znm8_eM" // Replace with your Google Maps API key
                    }}
                    center={userLocation}
                    defaultZoom={15} // You can adjust the zoom level as needed
                >
                    {/* Add map markers, polygons, or other map components here */}
                </GoogleMapReact>
            </div>
            
        </div>
    );
}














