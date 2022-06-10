import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import TrotMaintenance from './TrotMaintenance';
import TrotReparation from './TrotReparation';
import ListOfTrot from './ListOfTrot';

const drawerWidth = 240;


export default function Main() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '200vh',
      }}
    >
      <Toolbar />
      <Container className="h-full overflow-hidden" sx={{ mb: 1 }}>
        <Grid container spacing={3}>

        <Grid item xs={20}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
              <ListOfTrot />
            </Paper>
          </Grid>

          <Grid item xs={20}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
              <TrotMaintenance />
            </Paper>
          </Grid>

          <Grid item xs={20}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
              <TrotReparation />
            </Paper>
          </Grid>



        </Grid>

      </Container>
    </Box>

  );
}

