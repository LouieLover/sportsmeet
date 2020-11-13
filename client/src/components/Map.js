import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "600px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent(props) {
  console.log(props.locations);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        {" "}
        <LoadScript googleMapsApiKey="AIzaSyBVMzrG2VGR9n61ElBUaECsWbrcjZQeLB8">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            props.location
            <></>
          </GoogleMap>
        </LoadScript>
        <p className="card-text"></p>
      </div>
    </div>
  );
}

export default React.memo(MyComponent);
