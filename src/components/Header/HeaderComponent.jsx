import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DrawerComp from "./Drawer";
import { UserContext } from "../../utils/UserContext";
import { useUserContext } from "../../utils/UserContext";



const HeaderComponent = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const {username} = useUserContext();
  const { logOut } = useUserContext();

  const titlechange = () => {
    if(username)
    {
        return "Deconnexion";
    }

    else return "Connexion";
}

const hideonlogin = () => {
  if(!username)
  {
      return ;
  }

  else return "Connexion";
}

  const connexion = () => {

    if(username)
    {
      logOut();
    }
    navigate("/");
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#111827 " }}>
        <Toolbar>
          <AutoGraphIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", paddingLeft: "10%" }}>
                Patrimoine Tracker
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="white"
                value={value}
                onChange={(e, value) => setValue(value)}
                
              >
                <Tab onClick={() => navigate("/dashboard")} label="Dashboard" value={0} defaultChecked disabled={!username}/>
                <Tab onClick={() => navigate("/investments")} label="Portefeuille" value={1} disabled={!username} />
                <Tab onClick={() => navigate("/dashboard")} label="Simulateur (En construction)" value={2} disabled="true"/>
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={connexion}>
              {titlechange()}
              </Button>

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HeaderComponent;
