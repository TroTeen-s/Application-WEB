import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import MapIcon from "@mui/icons-material/Map";
import BugReportIcon from "@mui/icons-material/BugReport";

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

        <NavLink className="no-underline text-black-trot" to="subscriptions">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Abonnements" />
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

    <NavLink className="no-underline text-black-trot" to="partenaireAdmin">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Partenaires" />
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
  </React.Fragment>
);
