
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react"; 
/*import Marker from "google-map-react"; */
import {fromLatLng } from "react-geocode";
  

const Marker = ({ lat, lng } : { lat: number, lng: number }) => (
    <div
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "50%",
        border: "2px solid white",
      }}
    />
  );


export default function Map() {
    const mapStyles = {
        height: "400px",
        width: "400px",
        "paddingTop": "20px",
        "paddingBottom": "60px",
       
    };

    const initialUserLocation = { lat: 0, lng: 0 };
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(initialUserLocation);
    const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number } | null>(null);


    const [address, setAddress] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
   



    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    const handleMapClick = ({ lat, lng, event }: { lat: number, lng: number, event: any }) => {
        // Update the markerLocation state with the clicked coordinates
        console.log(`handleMapClick(): (${lat}, ${lng})`);
        setMarkerLocation({ lat, lng });


        const myAPIKey = "d6b32867b992488091820bcca116a039";
        const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&&apiKey=${myAPIKey}`;
  
       // call Reverse Geocoding API - https://www.geoapify.com/reverse-geocoding-api/
       fetch(reverseGeocodingUrl)
       .then((response) => {
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         return response.json();
       })
       .then((featureCollection) => {
         
        console.log("feature collection:")
        //console.log(featureCollection);
        //const foundAddress = featureCollection.features[0];
        const selectedJSON = featureCollection.results[0];

        console.log("selectedJSON:")
        console.log(selectedJSON);

        setAddress(selectedJSON.formatted);
        console.log(`address: ${address}`)


        setCountry(selectedJSON.country);
        console.log(`country: ${country}`)

        setState(selectedJSON.state);
        console.log(`state: ${state}`)


        setCity(selectedJSON.city);
        console.log(`city: ${city}`)
     
         
       });
     
     
     
     
     

        const element = document.getElementById("selectedAddress");
        if (element) {
            element.innerHTML = `Selected Address: (${address})`;
        }




    };

    return (
        <div>
            <h4>See Map2 Below</h4>
            <div style={mapStyles}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyDpq2dnOVnsEeUdBPvQufmvDNF6Znm8_eM"
                    }}
                    center={userLocation}
                    defaultZoom={17}  
                    onClick={handleMapClick}
                >
                    {/* Display the marker if markerLocation is set */}
                    {markerLocation && (
                        <Marker lat={markerLocation.lat} lng={markerLocation.lng} />
                    )}
                </GoogleMapReact>

            <h6 id = 'selectedAddress'> Click on map to select an address </h6>

            </div>
        </div>
    );
}



