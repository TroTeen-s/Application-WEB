import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLoadScript } from '@react-google-maps/api'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import * as L from "leaflet";
import { LinearProgress } from '@mui/material';
import './style.css'
import { AuthLoadingContext } from '../context/AuthContext';

import tt from '@tomtom-international/web-sdk-maps';

export default function Following() {

  let { loaded } = useContext(AuthLoadingContext)

  const [infos, setInfos] = useState();
  const [infosBis, setInfosBis] = useState();
  const [infosTris, setInfosTris] = useState();

  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const OrangeIcon = new LeafIcon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    MaintenanceIcon = new LeafIcon({
      iconUrl:
        'https://cdn-icons-png.flaticon.com/512/81/81714.png',
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    ReparationIcon = new LeafIcon({
      iconUrl:
        'https://accueil.osuris.fr/voy_content/uploads/2018/07/maintenance.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    ;

  const retrieveInfos = async () => {
    try {
      let response = await axios.get('/api/dashboard/scooters/list', {
        headers: {
          'Accept': 'application/json'
        }
      })
  
      if (response.data.data) {
        setInfos(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }


  const retrieveInfosMaintenanceCenter = async () => {
    try {
      let response = await axios.get('/api/dashboard/MaintenanceCenter/list', {
        headers: {
          'Accept': 'application/json'
        }
      })
  
      if (response.data.data) {
        setInfosBis(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const retrieveInfosFixingCenter = async () => {
    try {
      let response = await axios.get('/api/dashboard/FixingCenter/list', {
        headers: {
          'Accept': 'application/json'
        }
      })
  
      if (response.data.data) {
        setInfosTris(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }




  useEffect(() => {

    if (loaded) {
      retrieveInfosFixingCenter()
      retrieveInfosMaintenanceCenter();
      retrieveInfos()
    }
  }, [loaded])

  if (infos) {

  return (
        <Box className="bg-primary"
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
          }}
        >

        <MapContainer center={[45.764043, 4.835659]} zoom={14} scrollWheelZoom={true}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {infos.filter(obj => obj.fixing !== 1 && obj.maintenance !== 1).map(({ id, last_position_long, last_position_lat, model_serie }) => (  
          
          <Marker position={[last_position_long, last_position_lat]} icon={OrangeIcon}>
              <Popup>
                ID : {[id]} <br /> {[model_serie]}
              </Popup>
            </Marker>
             
          ))}


        {infosBis.map(({ id, last_position_long, last_position_lat }) => (  
          
          <Marker position={[last_position_long, last_position_lat]} icon={MaintenanceIcon}>
              <Popup> 
                Centre de maintenance, ID : {[id]} <br />  
               
              {infos.filter(obj => obj.maintenance_center_id == [id]).map(({id, model_serie}) => (
                <p>+
                  ID : {[id]} / {[model_serie]}
                </p>
              ))
              }
                    
              </Popup>
            </Marker>
             
          ))}

        {infosTris.map(({ id, last_position_long, last_position_lat }) => (  
          
          <Marker position={[last_position_long, last_position_lat]} icon={ReparationIcon}>
              <Popup> 
                Centre de réparation, ID : {[id]} <br />  
               
              {infos.filter(obj => obj.fixing_center_id == [id]).map(({id, model_serie}) => (
                <p>+
                  ID : {[id]} / {[model_serie]}
                </p>
              ))
              }
                    
              </Popup>
            </Marker>
             
          ))}

        </MapContainer>

        </Box>

  );
} else {
  return (

      <div className='h-screen'></div>
  );
}
}

