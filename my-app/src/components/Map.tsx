import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

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
      <MyComponent />
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
  );
}

function MyComponent() {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return null;
}
