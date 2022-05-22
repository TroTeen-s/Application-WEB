import * as React from 'react';
import { useEffect , useRef, useState} from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLoadScript } from '@react-google-maps/api'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './style.css'

import tt from '@tomtom-international/web-sdk-maps';


export default function Following() {

  return (
        <Box className="bg-primary"
          component="main"
          sx={{
            flexGrow: 1,
            height: '120vh',
          }}
        >

        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>

          
        </MapContainer>

        </Box>

  );
}

