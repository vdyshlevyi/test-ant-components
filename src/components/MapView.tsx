import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { RouteLayer } from "./RouterLayer.tsx"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Icon fix (як у тебе вже було)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export default function MapView() {
  const from: [number, number] = [50.4501, 30.5234] // Київ
  const to: [number, number] = [50.5111, 30.7906] // Бровари

  return (
    <MapContainer
      center={from}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={from}>
        <Popup>Київ</Popup>
      </Marker>
      <Marker position={to}>
        <Popup>Бровари</Popup>
      </Marker>

      <RouteLayer from={from} to={to} />
    </MapContainer>
  )
}
