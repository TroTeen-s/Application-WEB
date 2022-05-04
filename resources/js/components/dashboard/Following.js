import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useLoadScript } from '@react-google-maps/api'

import { Map, TileLayer } from 'react-leaflet';

const DEFAULT_LANGITUDE =- 123;
const DEFAULT_LATITUDE = 48;

export default function Following() {

  return (
        <Box 
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '120vh',
          }}
        >
        <Toolbar />
        <Container style={{width: '300vh', height: '100vh'}} className="container overflow-hidden" sx={{ mt: 0, mb: 1 }}>

          {/* <Map center={[DEFAULT_LATITUDE, DEFAULT_LANGITUDE]}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{s}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm/org/copyright">OpenStreetMap</a> contributors'
            ></TileLayer>
          </Map> */}

        </Container>
        </Box>

  );
}

