import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLoadScript } from '@react-google-maps/api'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LinearProgress } from '@mui/material';
import './style.css'
import { AuthLoadingContext } from '../context/AuthContext';

import tt from '@tomtom-international/web-sdk-maps';

export default function Following() {

  const [infos, setInfos] = useState();
  let { loaded } = useContext(AuthLoadingContext)

  const retrieveInfos = async () => {
    try {
      let response = await axios.get('/api/scooters', {
        headers: {
          'Accept': 'application/json'
        }
      })
  
      if (response.data.data) {
        console.log(response.data.data)
        setInfos(response.data.data)
      }
    } catch (e) {
    }
  }

  useEffect(() => {

    if (loaded) {
      retrieveInfos()
    }
  }, [loaded])

  console.log(infos)
  
  if (infos) {
  return (
        <Box className="bg-primary"
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
          }}
        >

        <MapContainer center={[45.764043, 4.835659]} zoom={15} scrollWheelZoom={false}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {infos.map(({ id, last_position_long, last_position_lat }) => (  
          
          <Marker position={[last_position_long, last_position_lat]}>
              <Popup>
                A pretty CSS1 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
             
          ))}

            {/* <Marker position={[45.76502, 4.82003]}>
              <Popup>
                A pretty CSS1 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

            <Marker position={[45.7568, 4.8511]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}


          
        </MapContainer>

        </Box>

  );
} else {
  return (

      <div className='h-screen'></div>
  );
}
}

