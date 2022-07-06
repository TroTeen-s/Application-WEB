import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
  } from '@mui/material';
  
  export const HistoricalListToolBar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Historique
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button
            className="bg-color-300"
            variant="contained"
          >
            Ajouter des trotinettes
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
  