import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import BoltIcon from '@mui/icons-material/Bolt';
import MapIcon from '@mui/icons-material/Map';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BugReportIcon from '@mui/icons-material/BugReport';

import { NavLink } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ElectricScooterIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="trot">
        <ListItemText primary="Trotinettes" />
      </NavLink>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AddLocationAltIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="following">
        <ListItemText primary="Ajouter des Trotinettes" />
      </NavLink>
    </ListItemButton>


    <ListItemButton>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="following">
        <ListItemText primary="Suivi des Trotinettes" />
      </NavLink>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="customers">
        <ListItemText primary="Customers" />
      </NavLink>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="API" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BugReportIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="ticket">
        <ListItemText primary="Ticket" />
      </NavLink>
    </ListItemButton>


    <ListItemButton>
      <ListItemIcon>
        <LocalGroceryStoreIcon />
      </ListItemIcon>
      <NavLink className="no-underline text-black-trot" to="shopAdmin">
        <ListItemText primary="Boutique" />
      </NavLink>
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>  */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
