import React, { useState } from "react";
import './Drawer.css';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils/UserContext";


const items = [{text :"Accueil", clic:"/dashboard"},{text :"Portefeuille", clic:"/investments"},{text :"Calcul intèrêts", clic:"/calculator"}];
const DrawerComp = () => {
const [openDrawer, setOpenDrawer] = useState(false);
const username = localStorage.getItem('username');
const { logOut } = useUserContext();
const navigate = useNavigate();

const connexion = () => {

  if(username)
  {
    logOut();
  }
  navigate("/");
  setOpenDrawer(false);
}

const setOpenDrawerToFalse = () => {
  setOpenDrawer(false);
}

const titlechange = () => {
  if(username)
  {
      return "Deconnexion";
  }

  else return "Connexion";
}

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose = {() => setOpenDrawer(!openDrawer)}
      >
        <List         
        sx={{
          bgcolor: '#111827',
          height: "100%",
        }}>
          <div className="list">
          {items.map((items, index) => (
            <ListItemButton key={index} sx={{ borderBottom:" 1px solid #1976D2" }}>
              <ListItemIcon>
                <ListItemText sx={{color: "white"}}><Link className="itemsMobileHeader" onClick={() => setOpenDrawer(!openDrawer)}  to={items.clic}>{items.text}</Link></ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          </div>
        </List>
        <Button sx={{ width:"100%", borderRadius:"1px" }} variant="contained" onClick={connexion} >{titlechange()}</Button>
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