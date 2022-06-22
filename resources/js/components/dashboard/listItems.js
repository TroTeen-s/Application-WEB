import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import MapIcon from '@mui/icons-material/Map';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BugReportIcon from '@mui/icons-material/BugReport';

import { NavLink } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <NavLink className="no-underline text-black-trot" to="trot">
    <ListItemButton>
      <ListItemIcon>
        <ElectricScooterIcon />
      </ListItemIcon>
        <ListItemText primary="Trotinettes" />
    </ListItemButton>
    </NavLink>

    <NavLink className="no-underline text-black-trot" to="following">
    <ListItemButton>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
        <ListItemText primary="Suivi des Trotinettes" />
    </ListItemButton>
    </NavLink>

    <NavLink className="no-underline text-black-trot" to="customers">
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
        <ListItemText primary="Customers" />
    </ListItemButton>
    </NavLink>

    <NavLink className="no-underline text-black-trot" to="api">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="API" />
    </ListItemButton>
    </NavLink>

    <NavLink className="no-underline text-black-trot" to="ticket">
    <ListItemButton>
      <ListItemIcon>
        <BugReportIcon />
      </ListItemIcon>
        <ListItemText primary="Ticket" />
    </ListItemButton>
    </NavLink>


      <NavLink className="no-underline text-black-trot" to="shopAdmin">
          <ListItemButton>
              <ListItemIcon>
                  <LocalGroceryStoreIcon />
              </ListItemIcon>
              <ListItemText primary="Boutique" />
          </ListItemButton>
      </NavLink>
      <NavLink className="no-underline text-black-trot" to="refunds">
          <ListItemButton>
              <ListItemIcon>
                  <CurrencyExchangeIcon />
              </ListItemIcon>
              <ListItemText primary="Retours" />
          </ListItemButton>
      </NavLink>
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
