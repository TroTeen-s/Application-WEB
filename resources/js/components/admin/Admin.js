import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Users from './Users';
import Scooters from './Scooters';
import TextField from "@mui/material/TextField";






function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Admin() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data)


        console.log(Object.fromEntries(data))
        try {
            let response = await axios.post('/api/scooter/create', coucou)
            if (response.data.success) {
                localStorage.setItem('apiBearerToken', response.data.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
            }
        } catch (e) {
        }
    };


    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div>
            <div className='w-full flex justify-center'>
                <Box sx={{ bgcolor: 'background.paper', width: 1000 }}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Users" {...a11yProps(0)} />
                            <Tab label="Trottinettes" {...a11yProps(1)} />
                            <Tab label="meteo" {...a11yProps(2)} />

                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x' : 'x-reverse'}
                        index={value}
                        onChangeIndex={handleChangeIndex}

                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Users />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Scooters />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <Scooters />
                        </TabPanel>

                    </SwipeableViews>
                </Box>
            </div>
            {value == 1 ? <div className='md:px-40 pt-4'>
                <p className='text-2xl text-white'>Ajouter une trottinettes</p>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <div className='flex justify-center space-x-4 items-center'>
                        <div className='w-[60%] flex items-center'>
                            <TextField
                                required
                                fullWidth
                                name="model-serie"
                                label="model-serie"
                                type="text"
                                id="text"
                            />
                        </div>

                        <div className='w-[40%] flex items-center'>
                            <Button
                                type="submit"
                                fullWidth

                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ajouter une trottinette
                            </Button>
                        </div>

                    </div>
                </Box>
            </div> : <></>}

        </div>
    );
}