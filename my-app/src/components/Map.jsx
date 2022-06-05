import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";

export default class MapComponent extends React.Component {
  render() {
    const prov = OpenStreetMapProvider();

    return (
      <MapContainer
        center={[47.584401, -122.14819]}
        zoom={12}
        style={{ height: "94vh", width: "100%", marginTop: 2.9, zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <SearchControl
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={"Enter address, please"}
          keepResult={true}
        />
      </MapContainer>
    );
  }
}

const SearchControl = (props) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [props]);

  return null;
};
