import { useEffect } from "react";
import L, { marker } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
// });

export default function Routing({
    SourceLong, 
    SourceLat, 
    longD,
    latD,
    variable,
    indexVariable
}){

  const map = useMap();
  useEffect(() => {
    
    console.log( indexVariable);

    var Camtar = L.icon({
        iconUrl:'https://www.icone-png.com/png/11/10521.png',
        iconSize: [50, 50],
    })
    if (!map) return;

    var marker = L.marker([28.2380, -15.8128],{icon:Camtar}).addTo(map);

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(SourceLong, SourceLat), L.latLng(longD, latD)],
      routeWhileDragging: true,          
      lineOptions: {
        styles: [
          { color: indexVariable % 2 == 0 ? "#FF9900" : "#ff0000", opacity: 0.8, weight: 5 },
        ]
     },
    addWaypoints: false,
    show: false  
    }).on('routesfound',async function(e) {
        if(variable == 1){
            console.log(e)
            await e.routes[0].coordinates.forEach(function(coord, index) {
                setTimeout(function() {
                    marker.setLatLng([coord.lat, coord.lng ])
    
                },40 * index);
            })
        }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
