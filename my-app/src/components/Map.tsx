import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map(): React.ReactElement {
  return (
    <MapContainer
      center={[47.584401, -122.14819]}
      zoom={12}
      style={{
        height: "94vh",
        width: "100%",
        marginTop: 2.9,
        zIndex: 0,
      }}
    >
      <MapContent />
    </MapContainer>
  );
}

function MapContent(): React.ReactElement {
  return (
    <TileLayer
    attribution="© OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    detectRetina
    />
  )
}
