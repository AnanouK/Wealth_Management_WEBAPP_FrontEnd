import React, { useState, useNavigate } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";


const items = [{text :"Dashboard", clic:"/dashboard"},{text :"Portefeuille", clic:"/investments"}];
const DrawerComp = () => {
const [openDrawer, setOpenDrawer] = useState(false);
  

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        color="black"
      >
        <List>
          <div className="list">
          {items.map((items, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText><Link to={items.clic}>{items.text}</Link></ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          </div>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;