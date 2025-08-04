import { useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"

type Props = {
  from: [number, number] // [lat, lon]
  to: [number, number] // [lat, lon]
}

export function RouteLayer({ from, to }: Props) {
  const map = useMap()

  useEffect(() => {
    const fetchRoute = async () => {
      const fromStr = `${from[1]},${from[0]}` // lon,lat
      const toStr = `${to[1]},${to[0]}`
      const url = `http://localhost:8000/route/v1/driving/${fromStr};${toStr}?overview=full&geometries=geojson`

      const res = await fetch(url)
      const data = await res.json()

      const routeGeo = data.routes?.[0]?.geometry
      if (routeGeo) {
        const geoJson = L.geoJSON(routeGeo, {
          style: { color: "blue", weight: 4 },
        })
        geoJson.addTo(map)
        map.fitBounds(geoJson.getBounds())
      }
    }

    fetchRoute()
  }, [from, to, map])

  return null
}
