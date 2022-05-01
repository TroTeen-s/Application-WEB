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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
            height: '100vh',
          }}
        >
          <Toolbar />
          <Container className="overflow-hidden" sx={{ mt: 1, mb: 1 }}>
            <Grid container spacing={3}>
         
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
       
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
          
              <Grid item xs={20}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                  <TrotMaintenance />
                </Paper>
              </Grid>

              <Grid item xs={20}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column'}}>
                  <TrotReparation />
                </Paper>
              </Grid>



            </Grid>



            
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>

  );
}

